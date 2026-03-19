import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedEarthquake: null,
  search: ""
};

const earthquakeSlice = createSlice({
  name: "earthquake",
  initialState,
  reducers: {
    setSelectedEarthquake: (state, action) => {
      state.selectedEarthquake = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    }
  }
});

export const { setSelectedEarthquake, setSearch } = earthquakeSlice.actions;

export const store = configureStore({
  reducer: {
    earthquake: earthquakeSlice.reducer
  }
});