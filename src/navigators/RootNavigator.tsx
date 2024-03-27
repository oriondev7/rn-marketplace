import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './AuthNavigator';
import { HomeNavigator } from './HomeNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASKey } from '../constants';
import { UserContext } from '../UserContext';

export const RootNavigator: React.FC = () => {
  const { userId } = useContext(UserContext)
  const [user, setUser] = useState(false)

  const checkSingInSatus = async () => {
    try {
      const token = await AsyncStorage.getItem(ASKey.authToken)
      
      setUser(token ? true : false)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkSingInSatus()
  }, [userId])
  
  return (
    <NavigationContainer>
      {user || userId ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
