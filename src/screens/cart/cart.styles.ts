import { StyleSheet } from 'react-native'
import { COLORS } from '../../theme/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.systemWhite,
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

  totalContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  totalTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: COLORS.black,
  },

  totalValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.black,
  },

  emi: {
    marginHorizontal: 10,
    color: COLORS.black,
  },

  proceedButton: {
    backgroundColor: COLORS.yellow,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },

  divider: {
    height: 3,
    backgroundColor: COLORS.divider,
    marginTop: 16,
  },

  productContainer: {
    backgroundColor: COLORS.systemWhite,
    marginVertical: 10,
    borderBottomColor: COLORS.borderBottom,
    borderBottomWidth: 2,
  },

  productSubcontainer: {
    marginVertical: 10,
    flexDirection: 'row',
    gap: 15,
  },

  image: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },

  productTitle: {
    width: 150,
    marginTop: 10,
    color: COLORS.black,
  },

  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 6,
  },

  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  buttonsContainer: {
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  buttonsSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  decrementButton: {
    backgroundColor: COLORS.quantityButton,
    padding: 7,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },

  incrementButton: {
    backgroundColor: COLORS.quantityButton,
    padding: 7,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },

  quantity: {
    backgroundColor: COLORS.systemWhite,
    paddingHorizontal: 18,
  },

  actionButton: {
    padding: 10,
    borderRadius: 5,
    borderColor: COLORS.secondaryGray,
    borderWidth: 0.6,
  },

  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
})
