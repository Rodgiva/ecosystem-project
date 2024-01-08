import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  map: [],
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    
  },
});

export const {
} = mapSlice.actions;

export const mapState = (state) => state.counter.count;

export default counterSlice.reducer;
