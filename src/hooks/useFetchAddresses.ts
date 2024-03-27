import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { AddressModel } from '../models'
import { APIDomain } from '../constants'

export const useFetchAddresses = (userId?: string) => {
  const [addresses, setAddresses] = useState<AddressModel[] | undefined>([])
  const [isLoading, setIsLoading] = useState(true)
  const [addressesError, setAddressesError] = useState('')

  const fetchAddresses = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await axios.get(
        `${APIDomain.local}/addresses/${userId ?? ''}`
      )

      const { addresses } = response.data

      setAddresses(addresses)
      setAddressesError('')
    } catch (error) {
      setAddressesError('No Addresses Found')
    } finally {
      setIsLoading(false)
    }
  }, [userId])

  const refetchAddresses = useCallback(() => {
    fetchAddresses()
  }, [fetchAddresses])

  useEffect(() => {
    fetchAddresses()
  }, [fetchAddresses])

  return { addresses, isLoading, addressesError, refetchAddresses }
}
