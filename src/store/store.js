import taskReducer from './task'
import { logger } from './middleware/logger'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import errorReducer from './errors'


const rootReducer = combineReducers({
  errors: errorReducer,
  task: taskReducer
})

export function createStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
      devTools: process.env.NODE !== 'production'
    },
  )
}

export default createStore
