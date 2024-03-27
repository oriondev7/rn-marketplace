import React from 'react'
import { ScreenName } from '../constants'
import { Cart, Home, Profile } from '../screens'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS } from '../theme/theme'
import HomeFilled from '../assets/icons/home.svg'
import HomeOutline from '../assets/icons/home_outline.svg'
import ProfileIcon from '../assets/icons/profile.svg'
import ProfileOutline from '../assets/icons/profile_outline.svg'
import CartIcon from '../assets/icons/cart.svg'
import CartOutline from '../assets/icons/cart_outline.svg'
import { TabItemTitle } from '../components'
import { TabParamList } from './types'

const Tab = createBottomTabNavigator<TabParamList>()

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={ScreenName.home}
        component={Home}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabItemTitle focused={focused} title="Home" />
          ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <HomeFilled width={24} height={24} fill={COLORS.primary} />
            ) : (
              <HomeOutline width={24} height={24} color={COLORS.gray} />
            ),
        }}
      />
      <Tab.Screen
        name={ScreenName.cart}
        component={Cart}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabItemTitle focused={focused} title="Cart" />
          ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <CartIcon width={24} height={24} fill={COLORS.primary} />
            ) : (
              <CartOutline width={24} height={24} color={COLORS.gray} />
            ),
        }}
      />
      <Tab.Screen
        name={ScreenName.profile}
        component={Profile}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabItemTitle focused={focused} title="Profile" />
          ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <ProfileIcon width={24} height={24} fill={COLORS.primary} />
            ) : (
              <ProfileOutline width={24} height={24} color={COLORS.gray} />
            ),
        }}
      />
    </Tab.Navigator>
  )
}
