import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/userSlice";

const store = configureStore({
  reducer: {
    map: mapReducer,
  },
});

export default store;
