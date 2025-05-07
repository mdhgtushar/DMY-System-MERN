// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

//main 
import Main from './features/main/Main';

//auth
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';

//vision
import VisionBoard from './features/vision/VisionBoard';
import EditVisionBoard from './features/vision/EditVisionBoard';

//finance
import FinanceChannelList from './features/financeChannel/FinanceChannelList';
import FinanceChannelCreate from './features/financeChannel/CreateFinanceChannel';
import ViewFinanceChannel from './features/financeChannel/ViewFinanceChannel'; 
import EditFinanceChannel from './features/financeChannel/EditFinanceChannel';
import FinanceView from './features/finance/FinanceView'; 
import CreateFinance from './features/finance/CreateFinance'; 

//task
import TaskList from './features/task/TaskList';
import CreateTask from './features/task/CreateTask';
import EditTask from './features/task/EditTask';
import ViewTask from "./features/task/ViewTask";

//daily
import CreateDailyData from './features/dailyData/CreateDailyData';
import ViewDailyData from './features/dailyData/ViewDailyData';

//dashboard
import Dashboard from './features/dashboard/Dashboard';
import ProjectList from './features/project/ProjectList';
import ProjectView from './features/project/ProjectView';
import FeatureDetails from './features/project/FeatureDetails';
import ProjectCreate from './features/project/ProjectCreate';
import ProjectEdit from './features/project/ProjectEdit';
import FeatureCreate from './features/project/FeatureCreate';
import FeatureEdit from './features/project/FeatureEdit';

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
        <Route path="/finance-create" element={<CreateFinance />} />
        <Route path="/task-create" element={<CreateTask />} />
        <Route path="/task-edit/:id" element={<EditTask />} />
        <Route path="/task-list" element={<TaskList />} />
        <Route path="/task-view/:id" element={<ViewTask />} />
        <Route path="/daily-data-create" element={<CreateDailyData />} />
        <Route path="/view-daily-data" element={<ViewDailyData />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:id" element={<ProjectView />} />
        <Route path="/projects/create" element={<ProjectCreate />} />
        <Route path="/projects/features/:id" element={<FeatureDetails />} />
        <Route path="/projects/features/create/:id" element={<FeatureCreate />} />
        <Route path="/projects/edit/:id" element={<ProjectEdit />} />
        <Route path="/projects/features/edit/:id" element={<FeatureEdit />} /> 
      </Routes>
     </div>
      <Footer/>
    </Router>
  );
};

export default App;
