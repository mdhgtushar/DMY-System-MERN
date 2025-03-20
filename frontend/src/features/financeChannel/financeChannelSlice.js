import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchFinanceChannel = createAsyncThunk("financeChannel", async () => {
    const response = await api.get("/finance");
    return response.data;
});

const financeChannelSlice = createSlice({
    name: "financeChannel",
    initialState: {
        financeChannels: [],
        status: "loading",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFinanceChannel.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchFinanceChannel.fulfilled, (state, action) => {
            state.status = "success";
            state.financeChannels = action.payload;
        });
        builder.addCase(fetchFinanceChannel.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
    },
});

export default financeChannelSlice.reducer;