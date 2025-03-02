// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Main from './pages/Main';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VisionBoard from './pages/VisionBoard';
import EditVisionBoard from './pages/EditVisionBoard';
import FinanceChannelList from './pages/FinanceChannelList';
import FinanceChannelCreate from './pages/CreateFinanceChannel';
import TaskList from './pages/TaskList';
import CreateTask from './pages/CreateTask';
import EditFinanceChannel from './pages/EditFinanceChannel';
import CreateDailyData from './pages/CreateDailyData';
import ViewDailyData from './pages/ViewDailyData';
import FinanceView from './pages/FinanceView';
import Dashboard from './pages/Dashboard';
import ViewTask from "./pages/ViewTask"
import ViewFinanceChannel from './pages/ViewFinanceChannel'; 
import EditTask from './pages/EditTask';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
     <div className='md:min-h-screen'> 
     <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vision-board" element={<VisionBoard />} />
        <Route path="/edit-vision-board" element={<EditVisionBoard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/finance-channel-create" element={<FinanceChannelCreate />} />
        <Route path="/finance-channel-edit/:id" element={<EditFinanceChannel />} />
        <Route path="/finance-channel-list" element={<FinanceChannelList />} />
        <Route path="/finance-channel-view/:id" element={<ViewFinanceChannel />} />
        <Route path="/finance-view" element={<FinanceView />} />
        <Route path="/task-create" element={<CreateTask />} />
        <Route path="/task-edit/:id" element={<EditTask />} />
        <Route path="/task-list" element={<TaskList />} />
        <Route path="/task-view/:id" element={<ViewTask />} />
        <Route path="/daily-data-create" element={<CreateDailyData />} />
        <Route path="/view-daily-data" element={<ViewDailyData />} />
      </Routes>
     </div>
      <Footer/>
    </Router>
  );
};

export default App;
