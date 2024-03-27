import React, { useContext, useLayoutEffect } from 'react'
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { styles } from './profile.styles'
import { UserContext } from '../../contexts/user-context/UserContext'
import { COLORS } from '../../theme/theme'
import Search from '../../assets/icons/magnify.svg'
import Notification from '../../assets/icons/notifications_outline.svg'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ASKey } from '../../constants'
import { OrderProductModel } from '../../models'
import { ProfileProps } from '../../navigators/types'
import { useFocusEffect } from '@react-navigation/native'
import { useFetchOrders, useFetchProfile } from '../../hooks'

export const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const { userId, setUserId } = useContext(UserContext)
  const { user, userError, refetchUserProfile } = useFetchProfile(userId)
  const { orders, isLoading, ordersError, refetchOrders } =
    useFetchOrders(userId)

  const signOut = async () => {
    await AsyncStorage.removeItem(ASKey.userJWT)
    setUserId('')
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerStyle: { backgroundColor: COLORS.cyan },
      headerLeft: () => (
        <Image
          source={{
            uri: 'https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png',
          }}
          style={styles.image}
        />
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <Notification width={24} height={24} color={COLORS.black} />
          <Search width={24} height={24} fill={COLORS.black} />
        </View>
      ),
    })
  })

  // Fetch user profile on focus
  useFocusEffect(refetchUserProfile)

  // Fetch orders on focus
  useFocusEffect(refetchOrders)

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Welcome, {userError ? userError : user?.name}
      </Text>

      <View style={styles.subContainer}>
        <Pressable style={styles.yourOrdersContainer}>
          <Text style={{ color: COLORS.black }}>Your Orders</Text>
        </Pressable>

        <Pressable style={styles.yourOrdersContainer}>
          <Text style={{ color: COLORS.black }}>Your Account</Text>
        </Pressable>
      </View>

      <View style={styles.subContainer}>
        <Pressable
          style={styles.yourOrdersContainer}
          disabled={ordersError.length > 0}
        >
          <Text style={{ color: COLORS.black }}>Repeat Last Order</Text>
        </Pressable>
        <Pressable style={styles.yourOrdersContainer} onPress={signOut}>
          <Text style={{ color: COLORS.black }}>Sign Out</Text>
        </Pressable>
      </View>

      <View>
        <Text style={styles.title}>Last Orders</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {isLoading ? (
            <Text style={{ color: COLORS.black }}>Loading...</Text>
          ) : ordersError ? (
            <Text style={{ color: COLORS.black }}>{ordersError}</Text>
          ) : orders !== undefined && orders?.length > 0 ? (
            orders?.map((order) => (
              <Pressable key={order._id} style={styles.ordersContainer}>
                {order?.products
                  .slice(0, 1)
                  ?.map((product: OrderProductModel) => (
                    <View style={{ marginVertical: 10 }} key={product?._id}>
                      <Image
                        source={{ uri: product?.image }}
                        style={styles.productImage}
                      />
                    </View>
                  ))}
              </Pressable>
            ))
          ) : (
            <Text style={{ color: COLORS.black }}>No Orders</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
