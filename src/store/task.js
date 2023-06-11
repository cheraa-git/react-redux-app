const TASK_UPDATED = 'task/updated'
const TASK_DELETED = 'task/deleted'

export const taskCompleted = (id) => {
  return {
    type: TASK_UPDATED,
    payload: { id, completed: true }
  }
}

export const titleChanged = (id) => {
  return {
    type: TASK_UPDATED,
    payload: { id, title: `New Title for ${id}` }
  }
}

export const taskDeleted = (id) => {
  return {
    type: TASK_DELETED,
    payload: { id }
  }
}

function taskReducer(state = [], action) {
  let elementIndex, newArray
  switch (action.type) {
    case TASK_UPDATED:
      newArray = [...state]
      elementIndex = newArray.findIndex(el => el.id === action.payload.id)
      newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload }
      return newArray
    case TASK_DELETED:
      newArray = [...state]
      elementIndex = newArray.findIndex(el => el.id === action.payload.id)
      newArray = newArray.filter(el => el.id !== action.payload.id)
      return newArray
    default:
      return state
  }
}

export default taskReducer
