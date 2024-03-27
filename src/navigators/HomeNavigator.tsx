import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenName } from '../constants';
import { YourAddressesScreen, AddNewAddressScreen, ProductInfo, ConfirmationScreen, OrderScreen } from '../screens';
import { TabNavigator } from './TabNavigator';

const Stack = createNativeStackNavigator();

export const HomeNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name={ScreenName.tabNavigator}
        component={TabNavigator}
      />
      <Stack.Screen 
        name={ScreenName.productInfo} 
        component={ProductInfo}
      />
      <Stack.Screen 
        name={ScreenName.yourAddresses} 
        component={YourAddressesScreen}
      />
      <Stack.Screen 
        name={ScreenName.addNewAddress} 
        component={AddNewAddressScreen}
      />
      <Stack.Screen 
        name={ScreenName.confirmation} 
        component={ConfirmationScreen}
      />
      <Stack.Screen 
        name={ScreenName.order} 
        component={OrderScreen}
      />
    </Stack.Navigator>
  );
};
