import { createSlice } from "@reduxjs/toolkit";

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    name:'',
    email:'',
    password:''
},
  reducers: {
    getUserDetails: (store, action) => {
        // console.log(action.payload)
        return action.payload
    },
  },
});

export const userDetailsSliceAction = userDetailsSlice.actions;
export default userDetailsSlice;
