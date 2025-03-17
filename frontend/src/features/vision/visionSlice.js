import { createSlice } from "@reduxjs/toolkit";

const visionSlice = createSlice({
    name: "vision",
    initialState: {
        vision: ["We are the best"],
        status: null,
        error: null,
    },
    reducers: {
        setVision: (state, action) => {
            state.vision = action.payload;
        },
        addVision: (state, action) => {
            state.vision.push(action.payload);
        },
        updateVision: (state, action) => {
            state.vision = state.vision.map((item) =>
                item.id === action.payload.id ? action.payload : item
            );
        },
        deleteVision: (state, action) => {
            state.vision = state.vision.filter((item) => item.id !== action.payload);
        },
    },
});


export default visionSlice.reducer;