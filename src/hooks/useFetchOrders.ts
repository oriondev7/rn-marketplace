import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { OrderModel } from '../models'
import { APIDomain } from '../constants'

export const useFetchOrders = (userId?: string) => {
  const [orders, setOrders] = useState<OrderModel[] | undefined>([])
  const [isLoading, setIsLoading] = useState(true)
  const [ordersError, setOrdersError] = useState('')

  const fetchOrders = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await axios.get(
        `${APIDomain.local}/orders/${userId ?? ''}`
      )

      const { orders } = response.data

      setOrders(orders)
      setOrdersError('')
    } catch (error) {
      setOrdersError('No Orders Found')
    } finally {
      setIsLoading(false)
    }
  }, [userId])

  const refetchOrders = useCallback(() => {
    fetchOrders()
  }, [fetchOrders])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  return { orders, isLoading, ordersError, refetchOrders }
}
