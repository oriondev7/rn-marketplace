import { StyleSheet } from 'react-native'
import { COLORS } from '../../theme/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  thumbs: {
    height: 260,
    width: 300,
    alignSelf: 'center',
    marginTop: 40,
    justifyContent: 'center',
  },

  title: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    textAlign: 'center',
    color: COLORS.black,
  },

  sparkle: {
    height: 300,
    position: 'absolute',
    top: 100,
    width: 300,
    alignSelf: 'center',
  },
})
