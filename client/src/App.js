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
import EPK from "./pages/Epk";

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
          <Route path="epkCover" element={<EpkCoverForm />} />
          <Route path="epkCovershow" element={<EpkCover />} />
          <Route path="userDashboard" element={<UserDashboard />} />
          <Route path="synopsis" element={<Synopsis />} />
          <Route path="synopsisForm" element={<SynopsisForm />} />
          <Route path="epk" element={<EPK />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
