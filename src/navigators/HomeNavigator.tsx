import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ScreenName } from '../constants'
import { TabNavigator } from './TabNavigator'
import {
  YourAddresses,
  AddNewAddress,
  ProductInfo,
  Order,
  Confirmation,
} from '../screens'
import { HomeStackParamList } from './types'

const Stack = createNativeStackNavigator<HomeStackParamList>()

export const HomeNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ScreenName.tabNavigator} component={TabNavigator} />
      <Stack.Screen name={ScreenName.productInfo} component={ProductInfo} />
      <Stack.Screen name={ScreenName.yourAddresses} component={YourAddresses} />
      <Stack.Screen name={ScreenName.addNewAddress} component={AddNewAddress} />
      <Stack.Screen name={ScreenName.order} component={Order} />
      <Stack.Screen name={ScreenName.confirmation} component={Confirmation} />
    </Stack.Navigator>
  )
}
