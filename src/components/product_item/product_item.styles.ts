import { Dimensions, StyleSheet } from 'react-native'
import { COLORS } from '../../theme/theme'

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 25,
    width: Dimensions.get('window').width / 2.6,
  },

  image: {
    aspectRatio: 1,
    resizeMode: 'contain',
  },

  title: {
    marginTop: 10,
    color: COLORS.black,
  },

  itemInfo: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.black,
  },

  rate: {
    fontWeight: 'bold',
    color: COLORS.yellow,
  },

  addToCartButton: {
    backgroundColor: COLORS.yellow,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },

  divider: {
    height: 3,
    backgroundColor: COLORS.divider,
    marginTop: 15,
  },
})
