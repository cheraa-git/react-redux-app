import { createSlice } from '@reduxjs/toolkit'

const initialState = { entities: [] }

const errorSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    set(state, action) {
      state.entities.push(action.payload)
    }
  }
})

const { set } = errorSlice.actions
const errorReducer = errorSlice.reducer

export const setError = (message) => (dispatch) => {
  dispatch(set(message))
}

export const getError = () => state => state.errors.entities

export default errorReducer

