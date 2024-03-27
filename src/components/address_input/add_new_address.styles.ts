import { StyleSheet } from 'react-native'
import { COLORS } from '../../theme/theme'

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },

  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.black,
  },

  input: {
    padding: 10,
    borderColor: COLORS.white,
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
  },
})
