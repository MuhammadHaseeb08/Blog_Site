  
import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
let init = {
  _id: "",
  cPassword: "",
  email: "",
  password: "",
  username: "",
  name: ""
}
let iniBlog = {
  _id: "",
  title: "",
  imageName: "",
  desc: "",
  detail: "",
  comments: [],
  likes: 0
}
let userSlice = createSlice({
  name: "user",
  initialState: init,
  reducers: {
    setUser: (state, action) => {
      // console.log(action.payload);
      state._id = action.payload._id
      state.cPassword = action.payload.cPassword
      state.email = action.payload.email
      state.password = action.payload.password
      state.name = action.payload.name
      state.username = action.payload.username

    },
    resetUser: (state, action) => {
      state._id = ""
      state.cPassword = ""
      state.email = ""
      state.password = ""
      state.name = ""
      state.username = ""
      localStorage.clear("token")
    },
    maintainUser: (state, action) => {
      state._id = action.payload._id
      state.cPassword = action.payload.cPassword
      state.email = action.payload.email
      state.password = action.payload.password
      state.name = action.payload.name
      state.username = action.payload.username
    }
  }

})

let blogSlice = createSlice({
  name: "blog",
  initialState:iniBlog,
  reducers:{
    setBlog:(state,action)=>{
      state._id = action.payload._id
      state.title = action.payload.title
      state.imageName = action.payload.imageName
      state.desc = action.payload.desc
      state.comments=action.payload.comments
      state.likes = action.payload.likes
      // console.log(action.payload);

    }
  }
})
const meraStore = configureStore({
  reducer: {
    user: userSlice.reducer,
    blog:blogSlice.reducer
  }
})
export default meraStore
export const { setUser, resetUser, maintainUser } = userSlice.actions
export const {setBlog}=blogSlice.actions