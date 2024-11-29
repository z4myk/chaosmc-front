
import { configureStore } from "@reduxjs/toolkit";
import {authSlice} from '../store/auth/authSlice';
import {productSlice} from '../store/products/productSlice';

export const store = configureStore({
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  
    reducer: {
     
      auth: authSlice.reducer,
      product: productSlice.reducer,
     
    }
  }) 