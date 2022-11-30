import React from "react";
import { Navigate, Route, Link, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import UploadMovie from "./pages/UploadMovie";
import Home from "./pages/Home";
import MyList from "./pages/MyList";
import UserDashboard from "./pages/Dashboard";
import RegistrationForm from "./components/Auth/Registration/registration";
import Login from "./components/Auth/Registration/login";
import FilmMakerDashboard from "./pages/FlimMaker/filmMakerDashboard";
import SynopsisForm from "./components/Epk/Input/synopsisForm";
import Synopsis from "./components/Epk/Present/synopsis";
import EPK from "./pages/Epk";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="upload" element={<UploadMovie />} />
          <Route path="my_list" element={<MyList />} />
          <Route path="edit_profile" element={<Home />} />
          <Route path="userDashboard" element={<UserDashboard />} />
          <Route path="registeration" element={<RegistrationForm />} />
          <Route path="login" element={<Login />} />
          <Route path="filmMakerDashboard" element={<FilmMakerDashboard />} />
          <Route path="synopsis" element={<Synopsis />} />
          <Route path="synopsisForm" element={<SynopsisForm />} />
          <Route path="epk" element={<EPK />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
