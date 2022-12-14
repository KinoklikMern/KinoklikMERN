import React from "react";
import { Navigate, Route, Link, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import UploadMovie from "./pages/UploadMovie";
import Home from "./pages/Home";
import MyList from "./pages/MyList";
import RegistrationForm from "./components/Auth/Registration/registration";
import Login from "./components/Auth/Registration/login";
import FilmMakerDashboard from "./pages/FlimMaker/filmMakerDashboard";
import Bookmark from "./pages/Bookmark";

import CoverForm from "./components/Epk/Input/coverForm";
import Cover from "./components/Epk/Present/cover";

import LoglineForm from "./components/Epk/Input/loglineForm";
import Logline from "./components/Epk/Present/logline";

import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import UserDashboard from "./pages/UserDashboard";
import EpkCover from "./components/Epk/Present/EpkCover";

import { getMovies } from "./actions/movies";
import Movies from "./components/Movies/Movies";
import Form from "./components/Forms/Form";
import jb from "./images/jb.jpeg";
import useStyles from "./styles";
import EpkCoverForm from "./components/Epk/Input/EpkCoverForm.js";
import SynopsisForm from "./components/Epk/Input/synopsisForm";
import Synopsis from "./components/Epk/Present/synopsis";

import UniquenessForm from "./components/Epk/Input/uniquenessForm";
import Uniqueness from "./components/Epk/Present/uniqueness";
import UploadEpk from "./pages/UploadEpk";

import StillsForm from "./components/Epk/Input/stillsForm";
import Stills from "./components/Epk/Present/stills";
import EPK from "./pages/Epk";
import ResourcesForm from "./components/Epk/Input/ResourcesForm";
import TrailerForm from "./components/Epk/Input/TrailerForm";
import Resources from "./components/Epk/Present/Resources";
import Trailer from "./components/Epk/Present/Trailer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#591398",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="upload" element={<UploadMovie />} />
          <Route path="my_list" element={<MyList />} />
          <Route path="edit_profile" element={<Home />} />
          <Route path="registeration" element={<RegistrationForm />} />
          <Route path="login" element={<Login />} />
          <Route path="filmMakerDashboard" element={<FilmMakerDashboard />} />
          <Route path="bookmark" element={<Bookmark />} />

          <Route path="coverForm" element={<CoverForm />} />
          <Route path="cover" element={<Cover />} />

          <Route path="logline" element={<Logline />} />
          <Route path="loglineForm" element={<LoglineForm />} />
          <Route path="epkCover" element={<EpkCoverForm />} />
          <Route path="epkCovershow" element={<EpkCover />} />
          <Route path="userDashboard" element={<UserDashboard />} />
          <Route path="synopsis" element={<Synopsis />} />
          <Route path="synopsisForm" element={<SynopsisForm />} />

          <Route path="uniqueness" element={<Uniqueness/>} />
          <Route path="uniquenessForm" element={<UniquenessForm />} />

          <Route path="cast" element={<Cast />} />
          <Route path="castForm" element={<CastForm />} />

          <Route path="director" element={<Director />} />
          <Route path="directorForm" element={<DirectorForm />} />

          <Route path="producer" element={<Producer />} />
          <Route path="producerForm" element={<ProducerForm />} />

          <Route path="cinematographer" element={<Cinematographer />} />
          <Route path="cinematographerForm" element={<CinematographerForm />} />

          <Route path="stills" element={<Stills />} />
          <Route path="stillsForm" element={<StillsForm />} />

          <Route path="epk" element={<EPK />} />
          <Route path="uploadEpk" element={<UploadEpk />} />
          <Route path="trailerForm" element={<TrailerForm/>} />
          <Route path="resourcesForm" element={<ResourcesForm/>} />
          <Route path="trailer" element={<Trailer/>} />
          <Route path="resources" element={<Resources/>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
