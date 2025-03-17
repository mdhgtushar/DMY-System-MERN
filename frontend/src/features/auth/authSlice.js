import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        auth: [],
        status: null,
        error: null,
    },
    reducers: {},
});

export default authSlice.reducer;