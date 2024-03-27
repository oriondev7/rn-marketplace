import { createSlice } from "@reduxjs/toolkit";


export interface CartState {
  products: any[]
}

const initialState: CartState = {
  products: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product: any = state.products.find(
        (product: any) => product.id === action.payload.id
      )

      if (product) {
        product.quantity++
      } else {
        state.products.push({ ...action.payload, quantity: 1 })
      }
    },

    removeFromCart: (state, action) => {
      // Filter out the product to delete and assign to the state a new array without the product
      state.products = state.products.filter((product: any) => product.id !== action.payload.id)
    },

    incrementQuantity: (state, action) => {
      state.products.find((product: any) => product.id === action.payload.id).quantity++
    },

    decrementQuantity: (state, action) => {
      const productToDecrement = state.products.find(
        (product: any) => product.id === action.payload.id
      )

      if (productToDecrement.quantity === 1) {
        productToDecrement.quantity = 0
        state.products = state.products.filter((product: any) => product.id !== productToDecrement.id)
      } else {
        productToDecrement.quantity--
      }
    },

    clearCart: (state) => {
      state.products = []
    }
  }
})

export const { 
  addToCart, 
  removeFromCart, 
  incrementQuantity, 
  decrementQuantity, 
  clearCart 
} = cartSlice.actions

export default cartSlice.reducer