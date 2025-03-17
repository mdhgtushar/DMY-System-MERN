import { createSlice } from "@reduxjs/toolkit";

const financeSlice = createSlice({
    name: "finance",
    initialState: {
        finance: [],
        status: null,
        error: null,
    },
    reducers: {},
});

export default financeSlice.reducer;