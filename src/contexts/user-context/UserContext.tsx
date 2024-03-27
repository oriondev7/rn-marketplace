import { createContext, useState } from 'react'

interface UserContextProps {
  userId: string
  setUserId: React.Dispatch<React.SetStateAction<string>>
}

interface UserProviderProps {
  children?: React.ReactNode
}

const UserContext = createContext<UserContextProps>({
  userId: '',
  setUserId: () => '',
})

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState('')

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
