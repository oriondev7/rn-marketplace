import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ProductModel } from '../models'
import { ScreenName } from '../constants'
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
/*
  The type containing the mappings must be a type alias (e.g. type RootStackParamList = { ... }).
  It cannot be an interface (e.g. interface RootStackParamList { ... }).
  It also shouldn't extend ParamListBase (e.g. interface RootStackParamList extends ParamListBase { ... }).
  Doing so will result in incorrect type checking where it allows you to pass incorrect route names,
  thus have to disable the '@typescript-eslint/consistent-type-definitions' rule
  https://reactnavigation.org/docs/typescript/
*/
/* eslint-disable @typescript-eslint/consistent-type-definitions */

// HOME NAVIGATOR SCREEN TYPES

export type HomeStackParamList = {
  TabNavigator: NavigatorScreenParams<TabParamList>
  ProductInfo: { product: ProductModel }
  YourAddresses: undefined
  AddNewAddress: undefined
  Order: undefined
  Confirmation: undefined
}

export type ProductInfoProps = NativeStackScreenProps<
  HomeStackParamList,
  ScreenName.productInfo
>

export type YourAddressesProps = NativeStackScreenProps<
  HomeStackParamList,
  ScreenName.yourAddresses
>

export type AddNewAddressProps = NativeStackScreenProps<
  HomeStackParamList,
  ScreenName.addNewAddress
>

export type OrderProps = NativeStackScreenProps<
  HomeStackParamList,
  ScreenName.order
>

export type ConfirmationProps = NativeStackScreenProps<
  HomeStackParamList,
  ScreenName.confirmation
>

// AUTH NAVIGATOR SCREEN TYPES

export type AuthStackParamList = {
  SignIn: undefined
  SignUp: undefined
}

export type SignInProps = NativeStackScreenProps<
  AuthStackParamList,
  ScreenName.signIn
>

export type SignUpProps = NativeStackScreenProps<
  AuthStackParamList,
  ScreenName.signUp
>

// TAB NAVIGATOR SCREEN TYPES

export type TabParamList = {
  Home: undefined
  Cart: undefined
  Profile: undefined
}

export type HomeProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, ScreenName.home>,
  NativeStackScreenProps<HomeStackParamList>
>

export type CartProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, ScreenName.cart>,
  NativeStackScreenProps<HomeStackParamList>
>

export type ProfileProps = NativeStackScreenProps<
  TabParamList,
  ScreenName.profile
>
