import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: false }
]


const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    update(state, action) {
      const elementIndex = state.findIndex(el => el.id === action.payload.id)
      state[elementIndex] = { ...state[elementIndex], ...action.payload }
    },
    remove(state, action) {
      return state.filter(el => el.id !== action.payload.id)
    }
  }
})

const { remove, update } = taskSlice.actions
const taskReducer = taskSlice.reducer

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
