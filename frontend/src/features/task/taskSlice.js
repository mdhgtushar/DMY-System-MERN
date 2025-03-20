import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchTask = createAsyncThunk("task", async () => {
    const response = await api.get("/tasks");
    return response.data;
});

const taskSlice = createSlice({
    name: "task",
    initialState: {
        tasks: [],
        status: "loading",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTask.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchTask.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.tasks = action.payload;
        });
        builder.addCase(fetchTask.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
    },
});

export default taskSlice.reducer;