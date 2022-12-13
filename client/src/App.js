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

import CoverForm from "./components/Epk/Input/coverForm";
import Cover from "./components/Epk/Present/cover";

import LoglineForm from "./components/Epk/Input/loglineForm";
import Logline from "./components/Epk/Present/logline";

import SynopsisForm from "./components/Epk/Input/synopsisForm";
import Synopsis from "./components/Epk/Present/synopsis";

import CastForm from "./components/Epk/Input/castForm";
import Cast from "./components/Epk/Present/cast";

import DirectorForm from "./components/Epk/Input/directorForm";
import Director from "./components/Epk/Present/director";

import ProducerForm from "./components/Epk/Input/producerForm";
import Producer from "./components/Epk/Present/producer";

import CinematographerForm from "./components/Epk/Input/cinematographerForm";
import Cinematographer from "./components/Epk/Present/cinematographer";

import EPK from "./pages/Epk";

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

          <Route path="coverForm" element={<CoverForm />} />
          <Route path="cover" element={<Cover />} />

          <Route path="logline" element={<Logline />} />
          <Route path="loglineForm" element={<LoglineForm />} />

          <Route path="synopsis" element={<Synopsis />} />
          <Route path="synopsisForm" element={<SynopsisForm />} />

          <Route path="cast" element={<Cast />} />
          <Route path="castForm" element={<CastForm />} />

          <Route path="director" element={<Director />} />
          <Route path="directorForm" element={<DirectorForm />} />

          <Route path="producer" element={<Producer />} />
          <Route path="producerForm" element={<ProducerForm />} />

          <Route path="cinematographer" element={<Cinematographer />} />
          <Route path="cinematographerForm" element={<CinematographerForm />} />

          <Route path="epk" element={<EPK />} />

          <Route path="epkDashboard" element={<EPKDashboard />} />

        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
