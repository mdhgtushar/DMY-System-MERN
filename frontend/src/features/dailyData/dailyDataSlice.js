import { createSlice } from "@reduxjs/toolkit";

const dailyDataSlice = createSlice({
    name: "dailyData",
    initialState: {
        dailyData: [],
        status: null,
        error: null,
    },
    reducers: {},
});

export default dailyDataSlice.reducer;