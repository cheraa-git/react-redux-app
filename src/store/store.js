import taskReducer from './task'
import { logger } from './middleware/logger'
import { configureStore } from '@reduxjs/toolkit'


export function createStore() {
  return configureStore({
      reducer: taskReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
      devTools: process.env.NODE !== 'production'
    },
  )
}

export default createStore
