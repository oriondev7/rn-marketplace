import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { UserModel } from '../models'
import { APIDomain } from '../constants'

export const useFetchProfile = (userId?: string) => {
  const [user, setUser] = useState<UserModel | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const [userError, setUserError] = useState('')

  const fetchUserProfile = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await axios.get(
        `${APIDomain.local}/profile/${userId ?? ''}`
      )

      const { user } = response.data

      setUser(user)
      setUserError('')
    } catch (error) {
      setUserError('USERNAME')
    } finally {
      setIsLoading(false)
    }
  }, [userId])

  const refetchUserProfile = useCallback(() => {
    fetchUserProfile()
  }, [fetchUserProfile])

  useEffect(() => {
    fetchUserProfile()
  }, [fetchUserProfile])

  return { user, isLoading, userError, refetchUserProfile }
}
