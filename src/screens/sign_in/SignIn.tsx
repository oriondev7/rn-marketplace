import React, { useContext, useState } from 'react'
import { Alert, Image, KeyboardAvoidingView, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native'
import { styles } from './sign_in.styles'
import Email from '../../assets/icons/email.svg'
import Lock from '../../assets/icons/lock.svg'
import { COLORS } from '../../theme/theme'
import { ASKey, ScreenName } from '../../constants'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'
import { UserContext } from '../../UserContext'

export const SignIn = ({ navigation }: any) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUserId } = useContext(UserContext)

  const fetchUser = async () => {
    const token = await AsyncStorage.getItem(ASKey.authToken)

    if (!token) return

    const decodedToken: any = jwtDecode(token)

    const userId = decodedToken.userId

    setUserId(userId)
  }
  
  const onSignIn = () => {
    const user = {
      email: email,
      password: password
    }

    axios.post('http://localhost:8000/sign_in', user)
      .then(async (response) => {
        const token = response.data.token
        
        AsyncStorage.setItem(ASKey.authToken, token)

        await fetchUser()

        setEmail('')
        setPassword('')
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
          source={{ uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png' }}
          style={styles.image}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Sing In to your Account</Text>
        </View>

        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <Email
              width={25} 
              height={25}
              fill={COLORS.gray}
            />

            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
              placeholder='Enter your Email'
              autoCapitalize='none'
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock
              width={25} 
              height={25}
              fill={COLORS.gray}
            />

            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry
              style={styles.input}
              placeholder='Enter your Password'
            />
          </View>
        </View>

        <View style={styles.inputActionTextContainer}>
          <Text style={styles.keepMeText}>Keep me logged in</Text>

          <Text style={styles.forgotPasswordText}>Forgot Password</Text>
        </View>

        <View style={styles.footerContainer}>
          <Pressable 
            onPress={onSignIn}
            style={styles.singInButtonContainer}
          >
            <Text style={styles.signInButtonTitle}>Sing In</Text>
          </Pressable>

          <Pressable onPress={onSignUp}>
            <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
          </Pressable>
        </View> 
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
