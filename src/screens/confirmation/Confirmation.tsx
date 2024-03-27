import { SafeAreaView, Text } from 'react-native'
import { styles } from './confirmation.styles'
import LottieView from 'lottie-react-native'
import { ConfirmationProps } from '../../navigators/types'
import { useEffect } from 'react'

export const Confirmation: React.FC<ConfirmationProps> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.popToTop()
    }, 2000)
  })

  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={require('../../assets/animations/thumbs.json')}
        style={styles.thumbs}
        autoPlay
        loop={false}
        speed={0.7}
      />

      <Text style={styles.title}>Your Order Has been Received</Text>

      <LottieView
        source={require('../../assets/animations/sparkle.json')}
        style={styles.sparkle}
        autoPlay
        loop={false}
        speed={0.7}
      />
    </SafeAreaView>
  )
}
