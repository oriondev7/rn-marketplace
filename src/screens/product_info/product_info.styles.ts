import { Dimensions, StyleSheet } from 'react-native'
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

  image: {
    width: Dimensions.get('window').width,
    aspectRatio: 1,
    marginTop: 25,
  },

  offerContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  offerTitleContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.productOffer,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  offerTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.systemWhite,
    textAlign: 'center',
  },

  heart: {
    backgroundColor: COLORS.lightGray,
    marginTop: 'auto',
    marginLeft: 20,
    marginBottom: 20,
  },

  title: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.black,
  },

  price: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
    marginTop: 6,
  },

  divider: {
    height: 3,
    backgroundColor: COLORS.divider,
  },

  subInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },

  subInfoTitle: {
    color: COLORS.black,
  },

  subInfoValue: {
    color: COLORS.black,
    fontSize: 15,
    fontWeight: 'bold',
  },

  total: {
    color: COLORS.black,
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 5,
  },

  locationContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    gap: 5,
  },

  location: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.black,
  },

  inStock: {
    color: COLORS.green,
    marginHorizontal: 10,
    fontWeight: '500',
  },

  buyButtonContainer: {
    backgroundColor: COLORS.yellow,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },

  buyButtonTitle: {
    color: COLORS.black,
  },
})
