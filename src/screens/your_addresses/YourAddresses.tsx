import React, { useContext } from 'react'
import {
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { styles } from './your_addresses.styles'
import Search from '../../assets/icons/magnify.svg'
import Mic from '../../assets/icons/mic_outline.svg'
import Chevron from '../../assets/icons/chevron_forward.svg'
import Location from '../../assets/icons/location.svg'
import { COLORS } from '../../theme/theme'
import { ScreenName } from '../../constants'
import { UserContext } from '../../contexts/user-context/UserContext'
import { YourAddressesProps } from '../../navigators/types'
import { useFetchAddresses } from '../../hooks'
import { useFocusEffect } from '@react-navigation/native'

export const YourAddresses: React.FC<YourAddressesProps> = ({ navigation }) => {
  const { userId } = useContext(UserContext)
  const { addresses, addressesError, refetchAddresses } =
    useFetchAddresses(userId)

  const showAddNewAddressScreen = () =>
    navigation.push(ScreenName.addNewAddress)

  // Fetch addresses on focus
  useFocusEffect(refetchAddresses)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.search}>
          <Pressable>
            <Search width={22} height={22} color={COLORS.black} />
          </Pressable>

          <TextInput placeholder="Search" />
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

        {addressesError ? (
          <Text style={{ color: COLORS.black }}>{addressesError}</Text>
        ) : (
          <FlatList
            data={addresses}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable style={styles.addressContainer}>
                <View style={styles.addressTitleContainer}>
                  <Text style={styles.addressTitle}>{item?.name}</Text>
                  <Location width={24} height={24} fill={COLORS.red} />
                </View>

                <Text style={styles.addressSubitem}>
                  {item?.country}, {item?.city}
                </Text>

                <Text style={styles.addressSubitem}>{item?.street}</Text>

                <Text style={styles.addressSubitem}>{item?.houseNumber}</Text>

                <Text style={styles.addressSubitem}>{item?.landmark}</Text>

                <Text style={styles.addressSubitem}>
                  Postal Code: {item?.postalCode}
                </Text>

                <Text style={styles.addressSubitem}>
                  Phone No: {item?.mobileNumber}
                </Text>

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
            )}
          />
        )}
      </View>
    </SafeAreaView>
  )
}
