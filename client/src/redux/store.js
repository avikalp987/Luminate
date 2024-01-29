import { configureStore } from '@reduxjs/toolkit'
import UserReducer from "./user/userSlice.js"

export default configureStore({
  reducer: {
    user: UserReducer
  }
})