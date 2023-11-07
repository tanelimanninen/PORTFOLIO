import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: { success: null, error: null },
    reducers: {
      setSuccessNotification(state, action) {
        state.success = action.payload;
      },
      setErrorNotification(state, action) {
        state.error = action.payload;
      },
      unSetNotification(state) {
        state.success = null;
        state.error = null;
      },
    }
})

export const { setSuccessNotification, setErrorNotification, unSetNotification } = notificationSlice.actions

//ASYNC ACTION CREATOR FOR HANDLING NOTIFICATION
export const handleNotification = (text, duration, type) => {
    return async dispatch => {
      if (type === 'success') {
        dispatch(setSuccessNotification(text))
      } else if (type === 'error') {
        dispatch(setErrorNotification(text))
      }

      setTimeout(() => {
        dispatch(unSetNotification())
    }, duration * 1000)
    }
  }
  
export default notificationSlice.reducer