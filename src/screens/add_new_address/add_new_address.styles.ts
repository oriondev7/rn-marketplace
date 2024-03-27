import { StyleSheet } from 'react-native'
import { COLORS } from '../../theme/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topDivider: {
    backgroundColor: COLORS.cyan,
    height: 50,
  },

  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.black,
    paddingBottom: 10,
  },

  addAddressContainer: {
    backgroundColor: COLORS.yellow,
    padding: 19,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  addAddressTitle: {
    fontWeight: 'bold',
    color: COLORS.black,
  },
})
