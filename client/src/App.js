import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Actor from './pages/Actor/Actor';

import './styles/tailwind.css';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import RegistrationForm from './components/Auth/Registration/Registration';
import EmailVerification from './components/Auth/Registration/EmailVerification';
import RegistrationSuccess from './components/Auth/Registration/RegistrationSuccess';
import LoginForm from './components/Auth/Registration/LoginForm'
import SendResetPasswordLinkPage from './components/Auth/Registration/SendResetPasswordLink';
import CheckEmailPage from './components/Auth/Registration/CheckEmail';
import ResetPasswordPage from './components/Auth/Registration/ResetPassword';
import ResetPasswordSuccessPage from './components/Auth/Registration/ResetPasswordSuccess';

import FepkUploadDashboard from './pages/FepkUploadDashboard';
import FepkEditDashboard from './pages/FepkEditDashboard';

import { useSelector } from 'react-redux';
import DashboardEpks from './pages/Dashboard/EpkPage';
import DashboardNotification from './pages/Dashboard/NotificationPage';
import DashboardSettings from './pages/Dashboard/SettingPage';
import DashboardChat from './pages/Dashboard/ChatPage';

import DashboardSaved from './pages/Dashboard/SavedPage';
import DashboardLayout from './layouts/DashboardLayout';

import UserDashboardRequests from './pages/Dashboard/RequestsPage';

import AdminDashboardMain from './pages/AdminDashboard/MainPage';
import AdminDashboardUsers from './pages/AdminDashboard/UsersPage';
import AdminDashboardAnalytics from './pages/AdminDashboard/AnalyticsPage';
import AdminDashboardEPKs from './pages/AdminDashboard/EPKsPage';

import AuthRoutes from './utils/AuthRoutes';
import AccessDeniedPage from './pages/AccessDeniedPage';
import { FepkContext } from './context/FepkContext';
import CatalogPage from './pages/CatalogPage.js';
import EpkViewPage from './pages/EpkViewPage';
import UploadActorPicCon from './components/UserDashboard/Upload/UploadActorPicCon';
import EditFepkLayout from './layouts/EditFepkLayout';

import Filmmaker from './pages/FilmMaker/Filmmaker.js';

import KinoToastContainer from './components/common/KinoToastContainer';

function App() {
  const NavbarHomeClass = 'tw-bg-opacity-25 tw-absolute';
  const NavbarDefaultClass =
    'tw-bg-gradient-to-b tw-from-[#4b1a77] tw-to-[#1f0439]';
  // const KinoKlikTitle = "KinoKlik";
  const user = useSelector((state) => state.user);
  const className = user ? NavbarHomeClass : NavbarDefaultClass;
  const [fepkId, setFepkId] = useState([]);
  const [fepkMaker, setFepkMaker] = useState([]);
  const [filterQuery, setFilterQuery] = useState([]);
  const fepkToProvider = {
    fepkId,
    setFepkId,
    fepkMaker,
    setFepkMaker,
    filterQuery,
    setFilterQuery,
  };

  return (
    <FepkContext.Provider value={fepkToProvider}>
      <KinoToastContainer />
      <Routes>
        <Route path="/accessdenied" element={<AccessDeniedPage />} />
        <Route path="/" element={<MainLayout className={className} />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/actors" element={<MainLayout className={className} />}>
          <Route index element={<Home role="actor" />} />
        </Route>

        <Route path="/actor/:id" element={<Actor />} />
        <Route path="/filmmaker/:id" element={<Filmmaker />} />

        <Route element={<AuthRoutes />}>
          <Route path="/" element={<DashboardLayout className={className} />}>

            <Route path="dashboard/epks" element={<DashboardEpks />} />
            <Route path="dashboard/saved" element={<DashboardSaved />} />
            <Route path="dashboard/notifications" element={<DashboardNotification />} />
            <Route path="dashboard/chat" element={<DashboardChat />} />
            <Route path="dashboard/settings" element={<DashboardSettings />} />

            <Route path="dashboard/requests" element={<UserDashboardRequests />} />
            <Route path="dashboard/actor" element={<UploadActorPicCon />} />

            <Route path="admindashboard/main" element={<AdminDashboardMain />} />
            <Route path="admindashboard/users" element={<AdminDashboardUsers />} />
            <Route path="admindashboard/analytics" element={<AdminDashboardAnalytics />} />
            <Route path="admindashboard/epks" element={<AdminDashboardEPKs />} />
          </Route>
        </Route>

        <Route path="/" element={<MainLayout className={NavbarDefaultClass} />}>
          {/* <Route index element={<Home />} /> */}
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="epk/:id" element={<EpkViewPage />} />
          <Route path="signup" element={<RegistrationForm />} />

          <Route path="verification" element={<EmailVerification />} />
          <Route path="success" element={<RegistrationSuccess />} />
          <Route path="login" element={<LoginForm />} />
          <Route
            path="sendresetpasswordlink"
            element={<SendResetPasswordLinkPage />}
          />
          <Route path="checkemail/:email" element={<CheckEmailPage />} />
          <Route path="resetpassword" element={<ResetPasswordPage />} />
          <Route
            path="resetpasswordsuccesss"
            element={<ResetPasswordSuccessPage />}
          />

          <Route element={<AuthRoutes />}>
            <Route path="uploadFepk" element={<FepkUploadDashboard />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
        <Route element={<EditFepkLayout title="Edit EPK" />}>
          <Route path="editFepk/:id" element={<FepkEditDashboard />} />
        </Route>
      </Routes>
    </FepkContext.Provider>
  );
}

export default App;