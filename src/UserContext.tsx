import { createContext, useState } from 'react'

const UserContext = createContext<any>(null)

const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [userId, setUserId] = useState('')

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
