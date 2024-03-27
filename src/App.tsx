import React from 'react'
import { RootNavigator } from './navigators/RootNavigator'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ModalPortal } from 'react-native-modals'
import { UserProvider } from './contexts/user-context/UserContext'

/*
  The 'jwt-decode' library relies on atob(), 
  which is a global function available on all modern browsers 
  as well as every supported node environment.

  In order to use jwt-decode in an environment 
  that has no access to atob() (e.g. React Native),
  ensure to provide the corresponding polyfill in your application 
  by using base-64 to polyfill global.atob yourself.
  https://github.com/auth0/jwt-decode?tab=readme-ov-file#polyfilling-atob
*/
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
