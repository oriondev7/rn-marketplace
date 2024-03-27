import { createSlice } from '@reduxjs/toolkit'
import { ProductModel } from '../../models'

export interface CartState {
  products: ProductModel[]
}

const initialState: CartState = {
  products: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload.id
      )

      if (product) {
        product.quantity++
      } else {
        state.products.push({ ...action.payload, quantity: 1 })
      }
    },

    removeFromCart: (state, action) => {
      // Filter out the product to delete and assign to the state a new array without the product
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      )
    },

    incrementQuantity: (state, action) => {
      const productToIncrement = state.products.find(
        (product) => product.id === action.payload.id
      )

      if (!productToIncrement) return

      productToIncrement.quantity++
    },

    decrementQuantity: (state, action) => {
      const productToDecrement = state.products.find(
        (product) => product.id === action.payload.id
      )

      if (!productToDecrement) return

      if (productToDecrement.quantity === 1) {
        productToDecrement.quantity = 0
        state.products = state.products.filter(
          (product) => product.id !== productToDecrement.id
        )
      } else {
        productToDecrement.quantity--
      }
    },

    clearCart: (state) => {
      state.products = []
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer
