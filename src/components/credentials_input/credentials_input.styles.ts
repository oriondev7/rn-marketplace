import { StyleSheet } from 'react-native'
import { COLORS } from '../../theme/theme'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.white,
    paddingVertical: 5,
    borderRadius: 5,
    paddingLeft: 8,
  },

  input: {
    color: COLORS.gray,
    marginVertical: 10,
    width: 300,
    padding: 0,
    fontSize: 16,
  },
})
