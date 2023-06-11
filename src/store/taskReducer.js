import { TASK_UPDATED } from './actionTypes'

export function taskReducer(state = [], action) {
  switch (action.type) {
    case TASK_UPDATED:
      const newArray = [...state]
      const elementIndex1 = newArray.findIndex(el => el.id === action.payload.id)
      newArray[elementIndex1] = { ...newArray[elementIndex1], ...action.payload }
      return newArray
    default:
      return state
  }
}
