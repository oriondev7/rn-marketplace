import React, { useCallback, useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthNavigator } from './AuthNavigator'
import { HomeNavigator } from './HomeNavigator'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ASKey } from '../constants'
import { UserContext } from '../contexts/user-context/UserContext'
import { JwtPayload, jwtDecode } from 'jwt-decode'
import { JwtModel } from '../models'
import { ActivityIndicator } from 'react-native'

export const RootNavigator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { userId, setUserId } = useContext(UserContext)

  const updateUserSignInStatus = useCallback(() => {
    const setUserIdWithJWT = (jwt: string | null) => {
      if (jwt === null) {
        setUserId('')
        return
      }

      const decodedToken: JwtPayload = jwtDecode(jwt)
      const userId = (decodedToken as JwtModel).userId

      setUserId(userId)
    }

    const setUserJWT = async () => {
      try {
        const jwt = await AsyncStorage.getItem(ASKey.userJWT)

        setUserIdWithJWT(jwt)
      } catch (error) {
        setUserId('')
      } finally {
        setIsLoading(false)
      }
    }

    setUserJWT()
  }, [setUserId])

  useEffect(updateUserSignInStatus, [updateUserSignInStatus])

  return (
    <NavigationContainer>
      {isLoading ? (
        <ActivityIndicator style={{ flex: 1, alignSelf: 'center' }} /> // TODO: Use a splash screen instead
      ) : userId ? (
        <HomeNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  )
}
