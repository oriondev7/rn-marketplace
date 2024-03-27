import { Platform, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/theme';

export const styles = StyleSheet.create({
  container: {
    flex: Platform.OS === 'ios' ? 0 : 1,
  },

  topDivider: {
    backgroundColor: COLORS.cyan,
    height: 50
  },

  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.black,
    paddingBottom: 10
  },

  input: {
    padding: 10,
    borderColor: COLORS.white,
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5
  },

  subcontainer: {
    paddingVertical: 10
  },

  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.black
  },
  
  addAddressContainer: {
    backgroundColor: COLORS.yellow,
    padding: 19,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  
  addAddressTitle: {
    fontWeight: 'bold',
    color: COLORS.black
  },
})
