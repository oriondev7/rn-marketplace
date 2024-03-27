import { StyleSheet } from 'react-native'
import { COLORS } from '../../theme/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.systemWhite,
  },

  addressesContainer: {
    padding: 10,
    flex: 1,
  },

  searchContainer: {
    backgroundColor: COLORS.cyan,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  search: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: COLORS.systemWhite,
    borderRadius: 3,
    height: 38,
    flex: 1,
    paddingLeft: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },

  addAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    borderColor: COLORS.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 7,
    paddingHorizontal: 5,
  },

  addressContainer: {
    borderWidth: 1,
    borderColor: COLORS.white,
    padding: 10,
    gap: 5,
    marginVertical: 10,
  },

  addressTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },

  addressTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.black,
  },

  addressSubitem: {
    fontSize: 15,
    color: COLORS.addressBlack,
  },

  editButton: {
    backgroundColor: COLORS.edit,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    borderWidth: 0.9,
    borderColor: COLORS.white,
  },

  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 7,
  },

  buttonTitle: {
    color: COLORS.black,
  },
})
