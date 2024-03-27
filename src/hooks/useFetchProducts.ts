import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { ProductModel } from '../models'
import { APIDomain } from '../constants'

export const useFetchProducts = () => {
  const [products, setProducts] = useState<ProductModel[] | undefined>([])
  const [isLoading, setIsLoading] = useState(true)
  const [productsError, setProductsError] = useState('')

  const fetchProducts = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await axios.get(`${APIDomain.fake}/products`)

      setProducts(response.data)
      setProductsError('')
    } catch (error) {
      setProductsError('Have No Products')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const refetchProducts = useCallback(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, isLoading, productsError, refetchProducts }
}
