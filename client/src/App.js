import React from "react";
import { Navigate, Route, Link, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import UploadMovie from "./pages/UploadMovie";
import Home from "./pages/Home";
import MyList from "./pages/MyList";
import Dashboard from "./pages/Dashboard";
import RegistrationForm from "./components/Auth/Registration/registration";
import Login from "./components/Auth/Registration/login";
import FilmMakerDashboard from "./pages/FlimMaker/filmMakerDashboard";
import Bookmark from "./pages/Bookmark";
import UniquenessForm from "./components/Epk/Input/UniquenessForm";
import Uniqueness from "./components/Epk/Present/Uniqueness";
import StillsForm from "./components/Epk/Input/StillsForm";
import Stills from "./components/Epk/Present/Stills";
import EPK from "./pages/Epk";
import UploadEpk from "./pages/UploadEpk";

import EPKDashboard from "./pages/EpkDashboard";

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
          <Route path="registeration" element={<RegistrationForm />} />
          <Route path="login" element={<Login />} />
          <Route path="filmMakerDashboard" element={<FilmMakerDashboard />} />
          <Route path="bookmark" element={<Bookmark />} />
     
      
          <Route path="uniqueness" element={<Uniqueness />} />
          <Route path="uniquenessForm" element={<UniquenessForm />} />
          <Route path="stills" element={<Stills />} />
          <Route path="stillsForm" element={<StillsForm />} />
          <Route path="epk" element={<EPK />} />
          <Route path="uploadEpk" element={<UploadEpk />} />
          <Route path="epkDashboard" element={<EPKDashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
