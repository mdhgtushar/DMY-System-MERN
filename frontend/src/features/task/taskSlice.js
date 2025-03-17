import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "task",
    initialState: {
        tasks: [],
        status: null,
        error: null,
    },
    reducers: {},
});

export default taskSlice.reducer;