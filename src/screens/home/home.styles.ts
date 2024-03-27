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

  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 17,
    paddingVertical: 10,
    backgroundColor: COLORS.cyanLight,
  },

  delivery: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.black,
  },

  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },

  category: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoryTitle: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 5,
  },

  trendingTitle: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },

  weekDealContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  weekDealImage: {
    width: Dimensions.get('window').width / 2,
    aspectRatio: 1,
    resizeMode: 'contain',
    marginVertical: 10,
  },

  divider: {
    height: 3,
    backgroundColor: COLORS.divider,
    marginTop: 15,
  },

  todayDealsTitle: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },

  todayDealsImage: {
    width: 150,
    aspectRatio: 1,
    resizeMode: 'contain',
  },

  offerTitleContainer: {
    backgroundColor: COLORS.todayOffer,
    paddingVertical: 5,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 4,
  },

  offerTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.systemWhite,
    textAlign: 'center',
  },

  pickerContainer: {
    marginHorizontal: 10,
    marginTop: 20,
    width: '45%',
  },

  picker: {
    borderColor: '#B7B7B7',
    height: 30,
  },

  modalContent: {
    width: '100%',
    height: 400,
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  },

  modalSubtitle: {
    marginTop: 5,
    fontSize: 16,
    color: COLORS.gray,
  },

  addAddressContainer: {
    width: 140,
    height: 140,
    borderColor: COLORS.white,
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addAddressTitle: {
    textAlign: 'center',
    color: COLORS.blue,
    fontWeight: '500',
  },

  modalSubContainer: {
    marginBottom: 30,
    gap: 7,
  },

  modalExtraActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  modalExtraActionTitle: {
    color: COLORS.blue,
    fontWeight: '400',
  },

  footerProducts: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  locationTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },

  locationTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.black,
  },

  locationSubitem: {
    fontSize: 13,
    color: COLORS.black,
    textAlign: 'center',
  },
})
