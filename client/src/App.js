import React from "react";
import { Navigate, Route, Link, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import UploadMovie from "./pages/UploadMovie";
import Home from "./pages/Home";
import MyList from "./pages/MyList";
import Dashboard from "./pages/Dashboard";
import EpkDashboard from "./pages/EpkDashboardPage";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="upload" element={<UploadMovie />} />
          <Route path="my_list" element={<MyList />} />
          <Route path="edit_profile" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="epk/:id/epkdashboard" element={<EpkDashboard/>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
