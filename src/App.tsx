import React from 'react'
import { RootNavigator } from './navigators/RootNavigator'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ModalPortal } from 'react-native-modals'
import { UserProvider } from './UserContext'
import { decode } from 'base-64'
global.atob = decode

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <RootNavigator />
        <ModalPortal />
      </UserProvider>
    </Provider>
  )
}

export default App
