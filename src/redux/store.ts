import { Environments } from '@/constants/enums'
import {configureStore} from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
export const store = configureStore({
    reducer:{
        cart:cartReducer
    },
    devTools:process.env.NODE_ENV === Environments.DEV // pour en peux utilisé devtol de redux only en dev mode
});

//pour exporté le type de state 'RootState' et dispatch 'AppDispatch' de notre store 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;