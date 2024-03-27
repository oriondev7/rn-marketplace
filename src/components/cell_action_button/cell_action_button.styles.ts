import { StyleSheet } from 'react-native'
import { COLORS } from '../../theme/theme'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.edit,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    borderWidth: 0.9,
    borderColor: COLORS.white,
  },

  title: {
    color: COLORS.black,
  },
})
