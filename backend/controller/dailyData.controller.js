const DailyWork = require("../models/dailyData.model");
const DailyData = require("../models/dailyData.model");
const Task = require("../models/task.model");
const getDailyData = async (req, res) => {
  try {
    // Fetch daily data for the user and populate the works field with task details
    const dailyData = await DailyData.find({ user_id: req.user.id })
      .populate({
        path: 'works.task_ids',  // Populating task_ids in each work
        model: 'Task',           // Referencing the Task model
      });

    res.send(dailyData);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


const getDailyDataByDate = async (req, res) => {
  try {
    const dailyData = await DailyData.find({ user_id: req.user.id, date: req.params.date });
    res.send(dailyData);
  } catch (error) {
    res.send(error.message);
  }
}

const createDailyData = async (req, res) => {
  try {
    const { date, works, finances } = req.body;
    const user_id = req.user.id;

    // 1️⃣ ইনপুট ভ্যালিডেশন
    if (!user_id || !date) {
      return res.status(400).json({ message: "Invalid input! Please provide user_id, date" });
    }

    // 2️⃣ আগে থেকে এই তারিখের ডাটা আছে কিনা চেক করা
    let dailyData = await DailyData.findOne({ user_id, date });

    if (!dailyData) {
      // 🔹 যদি না থাকে, নতুন এন্ট্রি তৈরি হবে
      dailyData = new DailyData({
        user_id,
        date,
        description: "",
        works: [],
        finances: []
      });
    }

    // 3️⃣ Works অ্যাড/আপডেট করা
    works.forEach(({ hour, tasks }) => {
      // ঘন্টা 0-23 এর মধ্যে থাকতে হবে
      if (hour < 0 || hour > 24) {
        return res.status(400).json({ message: `Invalid hour: ${hour}. Must be between 0-23!` });
      }

      let existingHourIndex = dailyData.works.findIndex(work => work.hour_id === hour);

      if (existingHourIndex === -1) {
        // 🔹 যদি ঘণ্টা না থাকে, নতুন ঘণ্টা যোগ করবো
        dailyData.works.push({ hour_id: hour, task_ids: tasks || [] });
      } else {
        // 🔹 যদি ঘণ্টা আগে থেকেই থাকে, তাহলে শুধু নতুন টাস্ক যোগ করবো
        if (Array.isArray(dailyData.works[existingHourIndex].task_ids)) {
          tasks.forEach(task => {
            // Check if task is already added using ObjectId
            if (!dailyData.works[existingHourIndex].task_ids.includes(task)) {
              dailyData.works[existingHourIndex].task_ids.push(task);
            }
          });
        } else {
          // If the task_ids array is undefined or not an array, initialize it.
          dailyData.works[existingHourIndex].task_ids = tasks || [];
        }
      }
    });

    // 4️⃣ সঠিকভাবে ঘণ্টাগুলিকে সাজানো (hour_id অনুযায়ী)
    dailyData.works.sort((a, b) => a.hour_id - b.hour_id);

    if (finances) {
      // 5️⃣ Finances অ্যাড/আপডেট করা
      finances.forEach(financeItem => {
        // 🔹 নতুন ফাইনান্স আইটেম সরাসরি পুশ করা হচ্ছে
        dailyData.finances.push({
          finance_id: financeItem.id,
          inOrOut: financeItem.inOrOut,
          amount: financeItem.amount
        });
      });
    }

    // Debugging
    console.log("Updated Finances:", dailyData.finances);

    // 6️⃣ ডাটাবেসে সংরক্ষণ করা
    await dailyData.save();

    res.status(200).json({ message: "Daily data updated successfully!", data: dailyData });
  } catch (error) {
    console.error("Error updating daily data:", error);
    res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
};






const deleteDailyData = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEntry = await DailyData.findByIdAndDelete(id);
    //send success message
    if (deletedEntry) {
      res.send({ message: "Entry deleted successfully" });
    } else {
      res.send({ message: "Entry not found" });
    }
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = {
  createDailyData,
  getDailyData,
  deleteDailyData,
  getDailyDataByDate
}