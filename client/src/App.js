import React from "react";
import { Navigate, Route, Link, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import UploadMovie from "./pages/UploadMovie";
import Home from "./pages/Home";
import MyList from "./pages/MyList";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";

import { getMovies } from "./actions/movies";
import Movies from "./components/Movies/Movies";
import Form from "./components/Forms/Form";
import jb from "./images/jb.jpeg";
import useStyles from "./styles";

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
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
