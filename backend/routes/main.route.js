const express = require("express");
const { signup, login, users, logout, updateUser } = require("../controller/auth.controller");
const protect = require("../middleware/auth.middleware");

const router = express.Router();




// Register a new user
router.post("/register", signup);

// Login user
router.post("/login", login);
router.get("/logout", logout);
router.patch("/users", protect, updateUser);
router.get("/users", protect, users);


//task
const { createTask, getTasks, deleteTask, updateTask, getTaskById } = require('../controller/task.controller');
const { createDailyData, getDailyData, deleteDailyData, getDailyDataByDate } = require("../controller/dailyData.controller");
const { getVision, updateVision } = require("../controller/vision.controller");
const { getFinance, createFinance, deleteFinance, updateFinance, getFinanceById } = require("../controller/finance.controller");
router.get('/tasks', protect, getTasks);
router.get('/tasks/:id', protect, getTaskById);
router.post('/tasks', protect, createTask);
router.put('/tasks/:id', protect, updateTask);
router.delete('/tasks/:id', protect, deleteTask);

//daily data 
router.get("/dailydata", protect, getDailyData);
router.get("/dailydata/:date", protect, getDailyDataByDate);
router.post("/dailydata", protect, createDailyData);
router.delete("/dailydata/:id", protect, deleteDailyData);

//vision board
router.get("/vision", protect, getVision);
router.put("/vision", protect, updateVision);

//finance
router.get("/finance", protect, getFinance);
router.get("/finance/:id", protect, getFinanceById);
router.post("/finance", protect, createFinance);
router.delete("/finance/:id", protect, deleteFinance);
router.put("/finance/:id", protect, updateFinance);

module.exports = router;
