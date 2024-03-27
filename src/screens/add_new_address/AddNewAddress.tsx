import React, { useContext, useState } from 'react'
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { styles } from './add_new_address.styles'
import { UserContext } from '../../contexts/'
import axios from 'axios'
import { AddressInput } from '../../components'
import { AddNewAddressProps } from '../../navigators/types'
import { APIDomain } from '../../constants'

export const AddNewAddress: React.FC<AddNewAddressProps> = ({ navigation }) => {
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [name, setName] = useState('')
  const [mobileNumber, setMobileNo] = useState('')
  const [houseNumber, setHouseNo] = useState('')
  const [street, setStreet] = useState('')
  const [landmark, setLandmark] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const { userId } = useContext(UserContext)

  const onAddAddress = async () => {
    const address = {
      country,
      city,
      name,
      mobileNumber,
      houseNumber,
      street,
      landmark,
      postalCode,
    }

    for (const addressPart of Object.values(address)) {
      if (addressPart.length === 0) {
        Alert.alert('Data error', 'Please complete all the fields')
        return
      }
    }

    try {
      await axios.post(`${APIDomain.local}/addresses`, { userId, address })

      Alert.alert('Success', 'Addresses added successfully')

      setCountry('')
      setName('')
      setMobileNo('')
      setHouseNo('')
      setStreet('')
      setLandmark('')
      setPostalCode('')

      setTimeout(() => {
        navigation.pop()
      }, 500)
    } catch (error) {
      Alert.alert('Error', 'Failed to add address')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets
      >
        <View style={styles.topDivider} />

        <View style={{ padding: 10 }}>
          <Text style={styles.title}>Add a new Address</Text>

          <AddressInput
            title="Country"
            value={country}
            onChangeText={setCountry}
            placeholder="USA"
          />

          <AddressInput
            title="City"
            value={city}
            onChangeText={setCity}
            placeholder="Miami, FL"
          />

          <AddressInput
            title="Area, Street, Sector, Village"
            value={street}
            onChangeText={setStreet}
            placeholder="Monte St"
          />

          <AddressInput
            title="Flat, House No, Building, Company"
            value={houseNumber}
            onChangeText={setHouseNo}
            placeholder="53"
          />

          <AddressInput
            title="Landmark"
            value={landmark}
            onChangeText={setLandmark}
            placeholder="E.g. next to Apollo Hospital"
          />

          <AddressInput
            title="ZIP Code"
            value={postalCode}
            onChangeText={setPostalCode}
            placeholder="Enter ZIP Code"
          />

          <AddressInput
            title="Full Name (First and Last)"
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />

          <AddressInput
            title="Mobile Number"
            value={mobileNumber}
            onChangeText={setMobileNo}
            placeholder="Mobile No"
          />

          <Pressable onPress={onAddAddress} style={styles.addAddressContainer}>
            <Text style={styles.addAddressTitle}>Add Address</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
