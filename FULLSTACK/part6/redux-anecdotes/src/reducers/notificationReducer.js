import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'This is a notification !',
  reducers: {
    //NOTHING HERE YET
  }
})

export default notificationSlice.reducer