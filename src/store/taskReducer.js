import * as actionTypes from './actionTypes'

export function taskReducer(state = [], action) {
  let elementIndex, newArray
  switch (action.type) {
    case actionTypes.TASK_UPDATED:
      newArray = [...state]
      elementIndex = newArray.findIndex(el => el.id === action.payload.id)
      newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload }
      return newArray
    case actionTypes.TASK_DELETED:
      newArray = [...state]
      elementIndex = newArray.findIndex(el => el.id === action.payload.id)
      newArray = newArray.filter(el => el.id !== action.payload.id)
      return newArray
    default:
      return state
  }
}
