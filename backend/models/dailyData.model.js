const mongoose = require("mongoose");

const WorkSchema = new mongoose.Schema({
  hour_id: { type: Number, required: true }, // 1-24 পর্যন্ত ঘন্টা
  task_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }] // টাস্ক রেফারেন্স আইডি
});
const FinanceSchema = new mongoose.Schema({
  finance_id: { type: mongoose.Schema.Types.ObjectId }, // 1-24 পর্যন্ত ঘন্টা
  inOrOut: { type: String },
  amount: { type: Number },
});
const DailyDataSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ইউজার আইডি
  date: { type: String, required: true }, // প্রতিদিনের ডাটা ইউনিক হবে
  description: { type: String },
  works: [WorkSchema], // ২৪ ঘণ্টার কাজের তালিকা
  finances: [FinanceSchema]
});

const DailyData = mongoose.model("DailyData", DailyDataSchema);
module.exports = DailyData;
