import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    unSetNotification() {
      return null
    }
  }
})

export const { setNotification, unSetNotification } = notificationSlice.actions

//ASYNC ACTION CREATOR FOR HANDLING NOTIFICATION
export const handleNotification = (text, duration) => {
  return async dispatch => {
    dispatch(setNotification(text))

    setTimeout(() => {
      dispatch(unSetNotification())
  }, duration * 1000)
  }
}

export default notificationSlice.reducer