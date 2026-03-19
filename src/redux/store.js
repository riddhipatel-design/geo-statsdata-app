import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedEarthquake: null,   // Clicked / selected point
  hoveredEarthquake: null,    // Hovered point (highlight only)
  search: ""                  // Search text
};

const earthquakeSlice = createSlice({
  name: "earthquake",
  initialState,
  reducers: {
    setSelectedEarthquake: (state, action) => {
      state.selectedEarthquake = action.payload;
    },
    setHoveredEarthquake: (state, action) => {
      state.hoveredEarthquake = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    }
  }
});

export const { setSelectedEarthquake, setHoveredEarthquake, setSearch } = earthquakeSlice.actions;

export const store = configureStore({
  reducer: {
    earthquake: earthquakeSlice.reducer
  }
});