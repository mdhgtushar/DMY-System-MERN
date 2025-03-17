import { createSlice } from "@reduxjs/toolkit";

const financeChannelSlice = createSlice({
    name: "financeChannel",
    initialState: {
        financeChannel: [],
        status: null,
        error: null,
    },
    reducers: {},
});

export default financeChannelSlice.reducer;