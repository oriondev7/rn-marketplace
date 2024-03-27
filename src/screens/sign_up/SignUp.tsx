import React, { useState } from 'react'
import { Alert, Image, KeyboardAvoidingView, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native'
import { styles } from './sign_up.styles'
import Person from '../../assets/icons/person.svg'
import Email from '../../assets/icons/email.svg'
import Lock from '../../assets/icons/lock.svg'
import { COLORS } from '../../theme/theme'
import axios from 'axios'

export const SignUp = ({ navigation }: any) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSignUp = () => {
    const user = {
      name: name,
      email: email,
      password: password
    }

    // send A post request to the backend API
    axios.post('http://localhost:8000/sign_up', user)
      .then(() => {        
        Alert.alert('Signing Up Successfull', 'You have signed up successfully')

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
          source={{ uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png' }}
          style={styles.image}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Sing Up your new Account</Text>
        </View>

        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <Person
              width={25} 
              height={25}
              fill={COLORS.gray}
            />

            <TextInput
              value={name}
              onChangeText={text => setName(text)}
              style={styles.input}
              placeholder='Enter your name'
            />
          </View>

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
            onPress={onSignUp}
            style={styles.singInButtonContainer}
          >
            <Text style={styles.signUpButtonTitle}>Sing Up</Text>
          </Pressable>

          <Pressable onPress={onSignIn}>
            <Text style={styles.signInText}>Already have an account? Sign In</Text>
          </Pressable>
        </View> 
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
