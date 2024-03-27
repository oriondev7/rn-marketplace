import { StyleSheet } from 'react-native'
import { COLORS } from '../../theme/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.systemWhite,
  },

  subContainer: {
    flex: 1,
    paddingTop: 40,
  },

  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },

  stepsSubContainer: {
    alignItems: 'center',
    gap: 5,
  },

  divider: {
    height: 2,
    backgroundColor: COLORS.stepNumber,
  },

  stepNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.stepNumber,
    justifyContent: 'center',
    alignItems: 'center',
  },

  stepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.systemWhite,
  },

  stepNumberTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },

  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
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

  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 7,
  },

  deliveryOptionTitle: {
    color: COLORS.green,
    fontWeight: '500',
  },

  autoDeliveriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 7,
    borderColor: COLORS.divider,
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 10,
    justifyContent: 'space-between',
  },

  autoDeliveriesText: {
    fontSize: 15,
    color: COLORS.gray,
    marginTop: 5,
  },

  shippingItemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  shippingItemsText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.gray,
  },

  totalText: {
    fontSize: 16,
    color: COLORS.gray,
  },

  orderTotalTitle: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: 'bold',
  },

  orderTotalValue: {
    color: COLORS.productOffer,
    fontSize: 17,
    fontWeight: 'bold',
  },

  paymentMethodContainer: {
    padding: 10,
    borderColor: COLORS.divider,
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 10,
  },

  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 7,
    color: COLORS.black,
  },
})
