import { StyleSheet } from 'react-native'
import { COLORS } from '../../theme/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: COLORS.divider,
    padding: 10,
    marginTop: 7,
  },

  children: {
    flex: 1,
  },

  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  circleContainer: {
    height: 20,
    width: 20,
    borderRadius: 40,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  circle: {
    height: 8,
    width: 8,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
  },

  circleWidth: {
    width: 20,
  },
})
