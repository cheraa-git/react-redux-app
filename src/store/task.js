import { createSlice } from '@reduxjs/toolkit'
import todosService from '../services/todos.service'
import { setError } from './errors'

const initialState = {
  entities: [],
  isLoading: true,
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
    addTask(state, action) {
      state.entities.unshift(action.payload)
    },
    removeTask(state, action) {
      state.entities = state.entities.filter(el => el.id !== action.payload)
    },
    taskRequested(state) {
      state.isLoading = true
    },
    taskRequestFailed(state) {
      state.isLoading = false
    },
    setLoading(state, action) {
      state.isLoading = action.payload
    }

  }
})


export const { removeTask, update, received, taskRequestFailed, taskRequested, addTask, setLoading } = taskSlice.actions
const taskReducer = taskSlice.reducer

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todosService.fetch()
    dispatch(received(data))
  } catch (error) {
    dispatch(taskRequestFailed())
    dispatch(setError(error.message))
  }
}

export const createTask = () => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todosService.create({
      title: `Random task № ${Math.floor(Math.random() * 100)}`,
      completed: false,
    })
    dispatch(addTask(data))
    dispatch(setLoading(false))
  } catch (error) {
    dispatch(taskRequestFailed())
    dispatch(setError(error.message))
  }
}

export const completeTask = (id) => (dispatch) => {
  dispatch(update({ id, completed: true }))
}

export const changeTitle = (id) => (dispatch) => {
  dispatch(update({ id, title: `New Title for ${id}` }))
}

export const getTasks = () => state => state.task.entities
export const getTasksLoadingStatus = () => state => state.task.isLoading
export default taskReducer
