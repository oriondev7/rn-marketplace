import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/CartReducer'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {cart: CartState}
export type AppDispatch = typeof store.dispatch
