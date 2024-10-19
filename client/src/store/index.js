import { configureStore} from "@reduxjs/toolkit";
import chatsSlice from "./Chats";
import palsSlice from "./Pals";
import userDetailsSlice from "./UserDetails";
import receiverSlice from "./receiver";

const store = configureStore({
    reducer:{
        chats:chatsSlice.reducer,
        pals:palsSlice.reducer,
        userDetails:userDetailsSlice.reducer,
        receiver:receiverSlice.reducer
    }
})

export default store