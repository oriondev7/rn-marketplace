import React, { useEffect } from 'react'
import { SafeAreaView, Text } from 'react-native'
import { styles } from './order.styles'
import LottieView from 'lottie-react-native'

export const OrderScreen: React.FC = ({ navigation }: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Main");
    }, 1300);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={require('../../assets/animations/thumbs.json')}
        style={styles.thumbs}
        autoPlay
        loop={false}
        speed={0.7}
      />
      
      <Text style={styles.title}>Your Order Has been Recieved</Text>
      
      <LottieView
        source={require("../../assets/animations/sparkle.json")}
        style={styles.sparkle}
        autoPlay
        loop={false}
        speed={0.7}
      />
    </SafeAreaView>
  )
}
