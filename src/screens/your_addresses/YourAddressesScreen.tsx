import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native'
import { styles } from './your_addresses.styles'
import Search from '../../assets/icons/magnify.svg'
import Mic from '../../assets/icons/mic_outline.svg'
import Chevron from '../../assets/icons/chevron_forward.svg'
import Location from '../../assets/icons/location.svg'
import { COLORS } from '../../theme/theme'
import { ScreenName } from '../../constants'
import { UserContext } from '../../UserContext'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'

export const YourAddressesScreen: React.FC = ({ navigation }: any) => {
  const showAddNewAddressScreen = () => navigation.push(ScreenName.addNewAddress)
  const [addresses, setAddresses] = useState([])
  const { userId } = useContext(UserContext)
  const isFocused = useIsFocused()

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/addresses/${userId}`)
      const { addresses } = response.data

      setAddresses(addresses)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAddresses()
  }, [isFocused])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
          <View style={styles.search}>
            <Pressable>
              <Search width={22} height={22} color={COLORS.black} />
            </Pressable>

            <TextInput
              placeholder='Search'
            />
          </View>

          <Mic width={24} height={24} color={COLORS.black} />
        </View>

        <View style={styles.addressesContainer}>
          <Text style={styles.title}>Your Addresses</Text>

          <Pressable
            onPress={showAddNewAddressScreen}
            style={styles.addAddressContainer}
          >
            <Text style={{ color: COLORS.black }}>Add a new Address</Text>

            <Chevron width={24} height={24} color={COLORS.black} />
          </Pressable>

          <FlatList
            data={addresses}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: any) => 
              <Pressable style={styles.addressConrainer}>
                <View style={styles.addressTitleContainer}>
                  <Text style={styles.addressTitle}>{item?.name}</Text>
                  <Location width={24} height={24} fill={COLORS.red} />
                </View>

                <Text style={styles.addressSubitem}>{item?.country}, {item?.city}</Text>
                
                <Text style={styles.addressSubitem}>{item?.street}</Text>
                
                <Text style={styles.addressSubitem}>{item?.houseNumber}</Text>
                
                <Text style={styles.addressSubitem}>{item?.landmark}</Text>
                
                <Text style={styles.addressSubitem}>Postal Code: {item?.postalCode}</Text>

                <Text style={styles.addressSubitem}>Phone No: {item?.mobileNumber}</Text>

                <View style={styles.buttonsContainer}>
                  <Pressable style={styles.editButton}>
                    <Text style={styles.buttonTitle}>Edit</Text>
                  </Pressable>

                  <Pressable style={styles.editButton}>
                    <Text style={styles.buttonTitle}>Remove</Text>
                  </Pressable>

                  <Pressable style={styles.editButton}>
                    <Text style={styles.buttonTitle}>Set as Default</Text>
                  </Pressable>
                </View>
              </Pressable>
            }
          />
        </View>
    </SafeAreaView>
  )
}
