import { createAction, createSlice } from '@reduxjs/toolkit'
import todosService from '../services/todos.service'

const initialState = []


const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    received(state, action) {
      return action.payload
    },
    update(state, action) {
      const elementIndex = state.findIndex(el => el.id === action.payload.id)
      state[elementIndex] = { ...state[elementIndex], ...action.payload }
    },
    remove(state, action) {
      return state.filter(el => el.id !== action.payload.id)
    }
  }
})

const taskRequested = createAction('task/requested')
const taskRequestFailed = createAction('task/requestFailed')

const { remove, update, received } = taskSlice.actions
const taskReducer = taskSlice.reducer

export const getTasks = () => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todosService.fetch()
    dispatch(received(data))
  } catch (error) {
    dispatch(taskRequestFailed('Network Error'))
  }
}

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({ id, completed: true }))
}

export const titleChanged = (id) => {
  return update({ id, title: `New Title for ${id}` })
}

export const taskDeleted = (id) => {
  return remove({ id })
}

export default taskReducer
