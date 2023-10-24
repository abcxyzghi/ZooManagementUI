import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App1 from './Component/App1';
import Admin from './AdminPage/Admin'; // Import trang Admin
import Staff from './StaffPage/Staff';
import MainCoverImage from './CoverImage/MainCoverImage';
import './App.css';
import LoginComponent from './AuthPage/Login/Login';
import RegisterComponent from './AuthPage/Register/Register';
import GlobalPrivateRouter from './privateRouter/GlobalPrivateRouter';
import { ROLE } from './constants';
import CommonPrivateRouter from './privateRouter/CommonPrivateRouter';
import MainPageExpert from './ExpertPage/MainPage/MainPage';
import DailyMealExpert from './ExpertPage/DailyMeal';
import SickMealExpert from './ExpertPage/SickMeal';
import FoodStore from './ExpertPage/FoodStore/FoodStore';
import TicketPage from './TicketPage/TicketPage';
import Dashboard from './AdminPage/Dashboard';
import StaffManager from './AdminPage/StaffManager';
import Cage from './AdminPage/Cage';
import ExpertManager from './AdminPage/Expert';
import HomeAdmin from './AdminPage/HomeAdmin';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/" element={<MainCoverImage />} />

          <Route element={<GlobalPrivateRouter />}>
            <Route path="/App1" element={<App1 />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/buy-ticket" element={<TicketPage />} />

            {/* private router with role ADMIN */}
            <Route element={<CommonPrivateRouter targetRole={ROLE.ADMIN} />}>
              <Route path="/admin" element={<Admin />}>
                <Route path="" element={<HomeAdmin />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="staff-manager" element={<StaffManager />} />
                <Route path="cages" element={<Cage />} />
                <Route path="expert" element={<ExpertManager />} />
              </Route>
            </Route>

            {/* private router with role EXPERT */}
            <Route element={<CommonPrivateRouter targetRole={ROLE.EXPERT} />}>
              <Route path="/expert">
                <Route path="" element={<MainPageExpert />} />
                <Route path="daily-meal" element={<DailyMealExpert />} />
                <Route path="sick-meal" element={<SickMealExpert />} />
                <Route path="food-store" element={<FoodStore />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
