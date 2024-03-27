import { StyleSheet } from 'react-native'
import { COLORS } from '../../theme/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  image: {
    width: 150,
    height: 100,
  },

  titleContainer: {
    alignItems: 'center',
  },

  titleText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 12,
    color: COLORS.darkBlue,
  },

  inputsContainer: {
    marginTop: 100,
    gap: 30,
  },

  inputActionTextContainer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 70,
  },

  keepMeText: {
    color: COLORS.black,
  },

  forgotPasswordText: {
    color: COLORS.linkBlue,
    fontWeight: '500',
  },

  footerContainer: {
    gap: 15,
  },

  singInButtonContainer: {
    width: 200,
    backgroundColor: COLORS.orange,
    borderRadius: 6,
    alignSelf: 'center',
    padding: 15,
  },

  signUpButtonTitle: {
    textAlign: 'center',
    color: COLORS.systemWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },

  signInText: {
    textAlign: 'center',
    color: COLORS.gray,
    fontSize: 16,
  },
})
