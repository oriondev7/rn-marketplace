import React, { useContext, useState } from 'react'
import { Alert, Keyboard, Platform, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native'
import { styles } from './add_new_address.styles'
import { COLORS } from '../../theme/theme'
import { UserContext } from '../../UserContext'
import axios from 'axios'

export const AddNewAddressScreen: React.FC = ({ navigation }: any) => {
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [name, setName] = useState("")
  const [mobileNumber, setMobileNo] = useState("")
  const [houseNumber, setHouseNo] = useState("")
  const [street, setStreet] = useState("")
  const [landmark, setLandmark] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const { userId } = useContext(UserContext)

  const onAddAddress = () => {
    const address = {
      country,
      city,
      name,
      mobileNumber,
      houseNumber,
      street,
      landmark,
      postalCode
    }

    for (const addressPart of Object.values(address)) {
      if (addressPart.length === 0) {
        Alert.alert('Data error', 'Please complete all the fields')
        return
      }
    }

    axios.post('http://localhost:8000/addresses', { userId, address })
      .then((_) => {
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
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to add address')
        console.log('Error', error);
      })
  }



  // Keyboard handling
  const [height, setHeight] = useState(0)
  Keyboard.addListener('keyboardWillShow', () => {
    setHeight(450)
    // console.log(height);
  })

  Keyboard.addListener('keyboardWillHide', () => {
    setHeight(0)
    // console.log(height);
  })

  const [coordinate, setCoordinate] = useState(0)
  const ref = React.useRef(0);
  const openItem = () => {
    if (Platform.OS === 'ios') {
      ref.current.scrollTo({x: 0, y: coordinate / 3})
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{flex: Platform.OS === 'ios' ? 0 : 1}}
        showsVerticalScrollIndicator={false}
        ref={ref}
      >
        <View style={styles.topDivider} />

        <View style={{ padding: 10 }}>
          <Text style={styles.title}>Add a new Address</Text>

          <View style={styles.subcontainer}>
            <Text style={styles.subtitle}>Country</Text>
            
            <TextInput
              value={country}
              onChangeText={(text) => setCountry(text)}
              style={styles.input}
              placeholderTextColor={COLORS.black}
              placeholder='USA'
            />
          </View>

          <View style={styles.subcontainer}>
            <Text style={styles.subtitle}>City</Text>
            
            <TextInput
              value={city}
              onChangeText={(text) => setCity(text)}
              style={styles.input}
              placeholderTextColor={COLORS.black}
              placeholder='Miami, FL'
            />
          </View>

          <View style={styles.subcontainer}>
            <Text style={styles.subtitle}>Area, Street, Sector, Village</Text>

            <TextInput
              value={street}
              onChangeText={(text) => setStreet(text)}
              placeholderTextColor={COLORS.black}
              style={styles.input}
            />
          </View>

          <View style={styles.subcontainer}>
            <Text style={styles.subtitle}>Flat, House No, Building, Company</Text>

            <TextInput
              value={houseNumber}
              onChangeText={(text) => setHouseNo(text)}
              placeholderTextColor={COLORS.black}
              style={styles.input}
            />
          </View>

          <View style={styles.subcontainer}>
            <Text style={styles.subtitle}>Landmark</Text>

            <TextInput
              value={landmark}
              onChangeText={(text) => setLandmark(text)}
              placeholderTextColor={COLORS.black}
              style={styles.input}
              placeholder='E.g. next to appollo hospital'
              onPressOut={openItem}
            />
          </View>

          <View style={styles.subcontainer}>
            <Text style={styles.subtitle}>Postal Code</Text>

            <TextInput
              value={postalCode}
              onChangeText={(text) => setPostalCode(text)}
              placeholderTextColor={COLORS.black}
              style={styles.input}
              placeholder='Enter pincode'
              onPressOut={openItem}
            />
          </View>

           <View style={styles.subcontainer}>
            <Text style={styles.subtitle}>Full Name (First and Last)</Text>

            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder='Enter your name'
              placeholderTextColor={COLORS.black}
              style={styles.input}
              onPressOut={openItem}
            />
          </View>

          <View style={styles.subcontainer}>
            <Text style={styles.subtitle}>Mobile Number</Text>

            <TextInput
              value={mobileNumber}
              onChangeText={(text) => setMobileNo(text)}
              placeholder='Mobile No'
              placeholderTextColor={COLORS.black}
              style={styles.input}
              onPressOut={openItem}
            />
          </View>

          <Pressable
            onPress={onAddAddress}
            style={styles.addAddressContainer}
          >
            <Text style={styles.addAddressTitle}>Add Address</Text>
          </Pressable>
        </View>

        <View
          style={{height: height}}
          onLayout={(event) => {
            const layoutY = event.nativeEvent.layout.y;
            // console.log(coordinate);
            // console.log(layoutY);
            
            if (layoutY !== coordinate) {
              setCoordinate(layoutY)
              // console.log(layoutY);
            }
          }}
        />
      </ScrollView>
    </SafeAreaView>
  )
}
