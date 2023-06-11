import * as actionTypes from './actionTypes'

export const taskCompleted = (id) => {
  return {
    type: actionTypes.TASK_UPDATED,
    payload: { id, completed: true }
  }
}

export const titleChanged = (id) => {
  return {
    type: actionTypes.TASK_UPDATED,
    payload: { id, title: `New Title for ${id}` }
  }
}
