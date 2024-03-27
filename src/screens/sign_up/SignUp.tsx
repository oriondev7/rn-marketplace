import React, { useState } from 'react'
import { Alert, Image, Pressable, SafeAreaView, Text, View } from 'react-native'
import { styles } from './sign_up.styles'
import axios from 'axios'
import { SignUpProps } from '../../navigators/types'
import { CredentialsInput } from '../../components'
import { APIDomain, CIType } from '../../constants'

export const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSignUp = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    }

    axios
      .post(`${APIDomain.local}/sign_up`, user)
      .then(() => {
        Alert.alert('Signing Up Successful', 'You have signed up successfully')

        setName('')
        setEmail('')
        setPassword('')
      })
      .catch((error) => {
        Alert.alert('Sign Up Error', `${error.request._response}`)
      })
  }

  const onSignIn = () => {
    navigation.goBack()
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
          <Text style={styles.titleText}>Sing Up your new Account</Text>
        </View>

        <View style={styles.inputsContainer}>
          <CredentialsInput
            type={CIType.person}
            value={name}
            onChangeText={setName}
            placeholder={'Enter your name'}
          />

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
          <Pressable onPress={onSignUp} style={styles.singInButtonContainer}>
            <Text style={styles.signUpButtonTitle}>Sing Up</Text>
          </Pressable>

          <Pressable onPress={onSignIn}>
            <Text style={styles.signInText}>
              Already have an account? Sign In
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}
