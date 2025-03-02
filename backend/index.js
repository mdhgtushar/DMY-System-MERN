const express = require("express");
const dotenv = require("dotenv"); 
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(cors())
dotenv.config();
app.use(cookieParser());

app.use(express.json());

app.use("/api", require("./routes/main.route"))



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();

    console.log("server running on port " + PORT);
})