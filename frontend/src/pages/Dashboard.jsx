import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // হেল্পার ফাংশন: সপ্তাহ নাম্বার বের করা
  const getWeekNumber = (date) => {
    const startDate = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((date - startDate) / (7 * 24 * 60 * 60 * 1000));
  };

  // বছর, মাস, এবং অন্যান্য তথ্য
  const year = currentDate.getFullYear();
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const weekNumber = getWeekNumber(currentDate);
  const dayName = currentDate.toLocaleString("default", { weekday: "long" });
  const formattedDate = currentDate.toLocaleDateString("en-GB");

  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-5 container mx-auto">
      <h1 className="text-3xl font-bold mb-6">📊 Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="📅 Year" data={year} bgColor="bg-blue-100" />
        <Card title="📆 Current Month" data={monthName} bgColor="bg-purple-100" />
        <Card title="🗓️ Week Number" data={`Week ${weekNumber}`} bgColor="bg-orange-100" />
        <Card title="📍 Today's Date" data={formattedDate} bgColor="bg-red-100" />
        <Card title="📌 Day of the Week" data={dayName} bgColor="bg-teal-100" />
      </div>
    </div>
  );
};

// সাধারণ কার্ড কম্পোনেন্ট
const Card = ({ title, data, bgColor }) => {
  return (
    <div className={`${bgColor} p-6 rounded-md shadow-md`}> 
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-lg">{data}</p>
    </div>
  );
};

export default Dashboard;
