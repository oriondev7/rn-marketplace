import { StyleSheet } from 'react-native'
import { COLORS } from '../../theme/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },

  image: {
    width: 140,
    height: 120,
    resizeMode: 'contain',
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginRight: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    paddingTop: 14,
  },

  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
  },

  yourOrdersContainer: {
    padding: 10,
    backgroundColor: COLORS.lightGray,
    borderRadius: 25,
    flex: 1,
    alignItems: 'center',
  },

  ordersContainer: {
    marginTop: 14,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.divider,
    marginHorizontal: 10,
    alignItems: 'center',
  },

  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
})
