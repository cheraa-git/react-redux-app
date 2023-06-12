import { applyMiddleware, compose, createStore } from 'redux'
import taskReducer from './task'
import { logger } from './middleware/logger'
import { thunk } from './middleware/thunk'

const middleWareEnhancer = applyMiddleware(logger, thunk)

export function configureStore() {
  return createStore(
    taskReducer,
    compose(middleWareEnhancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  )
}

export default configureStore
