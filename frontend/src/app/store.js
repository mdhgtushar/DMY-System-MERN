import { configureStore } from "@reduxjs/toolkit";
import visionSlice from "../features/vision/visionSlice";
import taskSlice from "../features/task/taskSlice";
import authSlice from "../features/auth/authSlice";
import financeSlice from "../features/finance/financeSlice";
import financeChannelSlice from "../features/financeChannel/financeChannelSlice";

const store = configureStore({
    reducer: {
        vision: visionSlice,
        task: taskSlice,
        auth: authSlice,
        finance: financeSlice,
        financeChannel: financeChannelSlice
    }
});

export default store