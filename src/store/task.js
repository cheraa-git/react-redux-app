import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: false }
]
const update = createAction('task/updated')
const remove = createAction('task/removed')


export const taskCompleted = (id) => {
  return update({ id, completed: true })
}

export const titleChanged = (id) => {
  return update({ id, title: `New Title for ${id}` })
}

export const taskDeleted = (id) => {
  return remove({ id })
}


const taskReducer = createReducer(initialState, builder => {
  builder
    .addCase(update, (state, action) => {
      const elementIndex = state.findIndex(el => el.id === action.payload.id)
      state[elementIndex] = { ...state[elementIndex], ...action.payload }
    })
    .addCase(remove, (state, action) => {
      return state.filter(el => el.id !== action.payload.id)
    })
})

function _taskReducer(state = [], action) {
  let elementIndex, newArray
  switch (action.type) {
    case update.type:
      newArray = [...state]
      elementIndex = newArray.findIndex(el => el.id === action.payload.id)
      newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload }
      return newArray
    case remove.type:
      newArray = [...state]
      elementIndex = newArray.findIndex(el => el.id === action.payload.id)
      newArray = newArray.filter(el => el.id !== action.payload.id)
      return newArray
    default:
      return state
  }
}

export default taskReducer
