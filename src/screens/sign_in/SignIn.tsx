import React, { useContext, useState } from 'react'
import { Alert, Image, Pressable, SafeAreaView, Text, View } from 'react-native'
import { styles } from './sign_in.styles'
import { APIDomain, ASKey, CIType, ScreenName } from '../../constants'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { JwtPayload, jwtDecode } from 'jwt-decode'
import { UserContext } from '../../contexts/user-context/UserContext'
import { JwtModel } from '../../models'
import { SignInProps } from '../../navigators/types'
import { CredentialsInput } from '../../components'

export const SignIn: React.FC<SignInProps> = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUserId } = useContext(UserContext)

  const setUserIdWithJWT = (jwt: string) => {
    const decodedToken: JwtPayload = jwtDecode(jwt)
    const userId = (decodedToken as JwtModel).userId

    setUserId(userId)
  }

  const clearUserInput = () => {
    setEmail('')
    setPassword('')
  }

  const onSignIn = () => {
    const userCredentials = {
      email: email,
      password: password,
    }

    axios
      .post(`${APIDomain.local}/sign_in`, userCredentials)
      .then(async (response) => {
        const jwt = response.data.token

        try {
          await AsyncStorage.setItem(ASKey.userJWT, jwt)

          setUserIdWithJWT(jwt)
          clearUserInput()
        } catch {
          Alert.alert('Sign In Error', 'Unable to save user ID')
        }
      })
      .catch((error) => {
        Alert.alert('Sign In Error', `${error.request._response}`)
      })
  }

  const onSignUp = () => {
    navigation.navigate(ScreenName.signUp)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={{
            uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png',
          }}
          style={styles.image}
        />
      </View>

      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Sing In to your Account</Text>
        </View>

        <View style={styles.inputsContainer}>
          <CredentialsInput
            type={CIType.email}
            value={email}
            onChangeText={setEmail}
            placeholder={'Enter your email'}
          />

          <CredentialsInput
            type={CIType.password}
            value={password}
            onChangeText={setPassword}
            placeholder={'Enter your password'}
          />
        </View>

        <View style={styles.inputActionTextContainer}>
          <Text style={styles.keepMeText}>Keep me logged in</Text>

          <Text style={styles.forgotPasswordText}>Forgot Password</Text>
        </View>

        <View style={styles.footerContainer}>
          <Pressable onPress={onSignIn} style={styles.singInButtonContainer}>
            <Text style={styles.signInButtonTitle}>Sing In</Text>
          </Pressable>

          <Pressable onPress={onSignUp}>
            <Text style={styles.signUpText}>
              {"Don't have an account? Sign Up"}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}
