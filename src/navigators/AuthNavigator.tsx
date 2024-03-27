import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ScreenName } from '../constants'
import { SignIn, SignUp } from '../screens'
import { AuthStackParamList } from './types'

const Stack = createNativeStackNavigator<AuthStackParamList>()

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ScreenName.signIn} component={SignIn} />
      <Stack.Screen name={ScreenName.signUp} component={SignUp} />
    </Stack.Navigator>
  )
}
