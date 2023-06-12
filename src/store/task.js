import { createSlice } from '@reduxjs/toolkit'
import todosService from '../services/todos.service'

const initialState = {
  entities: [],
  isLoading: true,
  error: null
}


const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    received(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(el => el.id === action.payload.id)
      state.entities[elementIndex] = { ...state.entities[elementIndex], ...action.payload }
    },
    remove(state, action) {
      state.entities = state.entities.filter(el => el.id !== action.payload.id)
    },
    taskRequested(state) {
      state.isLoading = true
    },
    taskRequestFailed(state, action) {
      state.error = action.payload
      state.isLoading = false
    }

  }
})


const { remove, update, received, taskRequestFailed, taskRequested } = taskSlice.actions
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
