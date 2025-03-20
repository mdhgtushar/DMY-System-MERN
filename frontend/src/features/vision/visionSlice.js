import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchVision = createAsyncThunk("fetchVision", async () => {
    const response = await api.get("/vision");
    return response.data;
});

export const updateVision = createAsyncThunk("updateVision", async (vision) => {
    const response = await api.put(`/vision/`, vision);
    return response.data;
});


const visionSlice = createSlice({
    name: "vision",
    initialState: {
        vision: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVision.pending, (state, action) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchVision.fulfilled, (state, action) => {
                state.vision = action.payload.vision;
                state.status = "success";
                state.error = null;
                console.log("Vision board fetched:", action.payload);
            })
            .addCase(fetchVision.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                console.log("Error fetching vision board.");
            })
            .addCase(updateVision.fulfilled, (state, action) => {
                console.log("Vision board updated:", action.payload);
                state.status = "success";
                state.vision = action.payload.vision;
                console.log("Vision board updated successfully!");
            })
            .addCase(updateVision.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                console.log("Error updating vision board.");
            })
            .addCase(updateVision.pending, (state, action) => {
                state.status = "loading";
                state.error = null;
                console.log("Updating vision board...");
            });
    }
});


export default visionSlice.reducer;