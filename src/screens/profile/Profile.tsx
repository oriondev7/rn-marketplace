import React, { useContext, useEffect, useId, useLayoutEffect, useState } from 'react'
import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { styles } from './profile.styles'
import { UserContext } from '../../UserContext'
import { COLORS } from '../../theme/theme'
import Search from '../../assets/icons/magnify.svg'
import Notification from '../../assets/icons/notifications_outline.svg'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ASKey } from '../../constants'

export const Profile: React.FC = ({ navigation }: any) => {
  const { userId, setUserId } = useContext(UserContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>()

  const signOut = async () => {
    await AsyncStorage.removeItem(ASKey.authToken)
    setUserId(null)
  }

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/profile/${userId}`)
      const { user } = response.data

      setUser(user)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/orders/${userId}`
      )
      const orders = response.data.orders

      setOrders(orders)
      setLoading(false)
    } catch (error) {
      console.log(error);
      
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerStyle: { backgroundColor: COLORS.cyan },
      headerLeft: () => (
        <Image
          source={{ uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png" }}
          style={styles.image}
        />
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <Notification width={24} height={24} color={COLORS.black} />
          <Search width={24} height={24} fill={COLORS.black} />
        </View>
      )
    })
  }, [])

  useEffect(() => {
    fetchUserProfile()
    fetchOrders()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome {user?.name}</Text>

      <View style={styles.subcontainer}>
        <Pressable style={styles.yourOrdersContainer}>
          <Text style={{ color: COLORS.black }}>Your Orders</Text>
        </Pressable>

        <Pressable style={styles.yourOrdersContainer}>
          <Text style={{ color: COLORS.black }}>Your Account</Text>
        </Pressable>
      </View>

      <View style={styles.subcontainer}>
        <Pressable style={styles.yourOrdersContainer}>
          <Text style={{ color: COLORS.black }}>Repeat Last Order</Text>
        </Pressable>

        <Pressable 
          style={styles.yourOrdersContainer}
          onPress={signOut}
        >
          <Text style={{ color: COLORS.black }}>Sign Out</Text>
        </Pressable>
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {loading
            ? <Text style={{ color: COLORS.black }}>Loading...</Text>
            : orders?.length > 0
              ? orders?.map((order: any) =>
                <Pressable
                  key={order._id}
                  style={styles.ordersContainer}
                >
                  {order?.products.slice(0, 1)?.map((product: any) =>
                    <View
                      style={{ marginVertical: 10 }}
                      key={product?._id}
                    >
                      <Image
                        source={{ uri: product?.image }}
                        style={styles.productImage}
                      />
                    </View>
                  )}
                </Pressable>
              )
              : <Text style={{ color: COLORS.black }}>No Orders</Text>
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
