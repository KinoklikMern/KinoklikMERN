import React from "react";
import { Navigate, Route, Link, Routes } from "react-router-dom";

import "./styles/tailwind.css"; //Tailwind

import MainLayout from "./layouts/MainLayout";
import UploadMovie from "./pages/UploadMovie";
import Home from "./pages/Home";
import MyList from "./pages/MyList";
import RegistrationForm from "./components/Auth/Registration/registration";
import LoginForm from "./components/Auth/Registration/loginform";
import SendResetPasswordLinkPage from "./pages/login/SendResetPasswordLinkPage";
import CheckEmailPage from "./pages/login/CheckEmailPage";
import ResetPasswordPage from "./pages/login/ResetPasswordPage";
import ResetPasswordSuccessPage from "./pages/login/ResetPasswordSuccessPage";

// add by Tony
import FilmMakerDashboard from "./pages/FlimMaker/filmMakerDashboard";
import FilmMakerSelectedEpk from "./pages/FlimMaker/filmMakerSelectedEpk";
// end

import FilmMakerConnect from "./components/FilmMaker/filmMakerConnect";
import FilmMakerNotifications from "./components/FilmMaker/filmMakerNotifications";
import FilmMakerDashboardSecurity from "./components/FilmMaker/filmMakerDashboardSecurity";
import FilmMakerDashboardSecurityCompany from "./components/FilmMaker/filmMakerDashboardSecurityCompany";
import FilmMakerDashboardSecurityPassword from "./components/FilmMaker/filmMakerDashboardSecurityPassword";
import FilmMakerDashboardSecurityAccount from "./components/FilmMaker/filmMakerDashboardSecurityAccount";
import FilmMakerDashboardSecurityProfile from "./components/FilmMaker/filmMakerDashboardSecurityProfile";
import Bookmark from "./pages/Bookmark";

import ForFilmMakers from "./components/ForFilmMakers";
import ForIndustryProf from "./components/ForIndustryProf";

import DetailsForm from "./components/Epk/Input/detailsForm";
import Details from "./components/Epk/Present/details";

import CoverForm from "./components/Epk/Input/coverForm";
import Cover from "./components/Epk/Present/Cover";

import LoglineForm from "./components/Epk/Input/loglineForm";
import Logline from "./components/Epk/Present/logline";

import UserDashboard from "./pages/UserDashboard";

import EpkCoverForm from "./components/Epk/Input/EpkCoverForm.js";
import SynopsisForm from "./components/Epk/Input/synopsisForm";
import Synopsis from "./components/Epk/Present/synopsis";

import UniquenessForm from "./components/Epk/Input/uniquenessForm";
import Uniqueness from "./components/Epk/Present/uniqueness";

import StillsForm from "./components/Epk/Input/stillsForm";
import Stills from "./components/Epk/Present/stills";

import ReviewForm from "./components/Epk/Input/reviewForm";
import Review from "./components/Epk/Present/review";

import Resources from "./components/Epk/Present/Resources";
import Trailer from "./components/Epk/Present/Trailer";
import ResourcesForm from "./components/Epk/Input/ResourcesForm";
import EPK from "./pages/Epk";
import CastForm from "./components/Epk/Input/castForm";
import Cast from "./components/Epk/Present/cast";

import DirectorForm from "./components/Epk/Input/directorForm";
import Director from "./components/Epk/Present/director";

import ProducerForm from "./components/Epk/Input/producerForm";
import Producer from "./components/Epk/Present/producer";

import CinematographerForm from "./components/Epk/Input/cinematographerForm";
import Cinematographer from "./components/Epk/Present/cinematographer";
import EpkDashboard from "./pages/EpkDashboard";
import FepkUploadDashboard from "./pages/FepkUploadDashboard";
import FepkEditDashboard from "./pages/FepkEditDashboard";
import TestApproval from "./pages/TestApproval";
import EpkView from "./pages/EpkView";
import Title from "antd/es/skeleton/Title";
import { useSelector } from "react-redux";
import DashboardEpks from "./pages/FilmmakerDashboard/EpkPage";
import DashboardNotification from "./pages/FilmmakerDashboard/NotificationPage";
import DashboardSettings from "./pages/FilmmakerDashboard/SettingPage";
import DashboardChat from "./pages/FilmmakerDashboard/ChatPage";
import DashboardLayout from "./layouts/DashboardLayout";

import UserDashboardStarred from "./pages/UserDashboard/StarredPage";
import UserDashboardFollowing from "./pages/UserDashboard/FollowingPage";
import UserDashboardSettings from "./pages/UserDashboard/SettingPage";
import UserDashboardRequests from "./pages/UserDashboard/RequestsPage";
import UserDashboardChat from "./pages/UserDashboard/ChatPage";
import EpkViewPage from "./pages/EpkViewPage";

function App() {
  const NavbarHomeClass = "tw-bg-opacity-25 tw-absolute";
  const NavbarDefaultClass =
    "tw-bg-gradient-to-b tw-from-[#4b1a77] tw-to-[#1f0439]";
  // const KinoKlikTitle = "KinoKlik";
  const { user } = useSelector((user) => ({ ...user }));
  const className = user ? NavbarHomeClass : NavbarDefaultClass;
  return (
    <Routes>
      <Route path="/" element={<MainLayout className={className} />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/" element={<DashboardLayout className={className} />}>
        <Route path="dashboard/epks" element={<DashboardEpks />} />
        <Route
          path="dashboard/notifications"
          element={<DashboardNotification />}
        />
        <Route path="dashboard/chat" element={<DashboardChat />} />
        <Route path="dashboard/settings" element={<DashboardSettings />} />

        <Route
          path="userdashboard/starred"
          element={<UserDashboardStarred />}
        />
        <Route
          path="userdashboard/following"
          element={<UserDashboardFollowing />}
        />
        <Route
          path="userdashboard/requests"
          element={<UserDashboardRequests />}
        />
        <Route
          path="userdashboard/settings"
          element={<UserDashboardSettings />}
        />

        <Route
          path="userdashboard/chat"
          element={<UserDashboardChat />}
        />
      </Route>

      <Route path="/" element={<MainLayout className={NavbarDefaultClass} />}>
        {/* <Route index element={<Home />} /> */}

        <Route path="upload" element={<UploadMovie />} />
        <Route path="my_list" element={<MyList />} />
        <Route path="edit_profile" element={<Home />} />
        <Route path="signup" element={<RegistrationForm />} />
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

        <Route path="filmMakerDashboard" element={<FilmMakerDashboard />} />
        <Route path="FilmMakerSelectedEpk" element={<FilmMakerSelectedEpk />} />

        <Route path="filmMakerConnect" element={<FilmMakerConnect />} />
        <Route
          path="FilmMakerNotifications"
          element={<FilmMakerNotifications />}
        />

        <Route
          path="filmMakerDashboardSecurity"
          element={<FilmMakerDashboardSecurity />}
        />
        <Route
          path="filmMakerDashboardSecurityCompany"
          element={<FilmMakerDashboardSecurityCompany />}
        />
        <Route
          path="filmMakerDashboardSecurityPassword"
          element={<FilmMakerDashboardSecurityPassword />}
        />
        <Route
          path="filmMakerDashboardSecurityAccount"
          element={<FilmMakerDashboardSecurityAccount />}
        />
        <Route
          path="filmMakerDashboardSecurityProfile"
          element={<FilmMakerDashboardSecurityProfile />}
        />
        <Route path="bookmark" element={<Bookmark />} />

        <Route path="forFilmMakers" element={<ForFilmMakers />} />
        <Route path="forIndustryProf" element={<ForIndustryProf />} />
        <Route path="coverForm" element={<CoverForm />} />
        <Route path="cover" element={<Cover />} />

        <Route path="detailsForm" element={<DetailsForm />} />
        <Route path="details" element={<Details />} />

        <Route path="logline" element={<Logline />} />
        <Route path="loglineForm" element={<LoglineForm />} />
        <Route path="epkCover" element={<EpkCoverForm />} />
        <Route path="userDashboard" element={<UserDashboard />} />
        <Route path="synopsis" element={<Synopsis />} />
        <Route path="synopsisForm" element={<SynopsisForm />} />

        <Route path="uniqueness" element={<Uniqueness />} />
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

        <Route path="review" element={<Review />} />
        <Route path="reviewForm" element={<ReviewForm />} />

        <Route path="resourcesForm" element={<ResourcesForm />} />
        <Route path="resources" element={<Resources />} />

        <Route path="epk/:title" element={<EPK />} />
        <Route path="uploadEpk" element={<EpkDashboard />} />
        <Route path="uploadFepk" element={<FepkUploadDashboard />} />
        <Route path="editFepk/:fepkId" element={<FepkEditDashboard />} />
        <Route path="resourcesForm" element={<ResourcesForm />} />
        <Route path="trailer" element={<Trailer />} />
        <Route path="resources" element={<Resources />} />
        <Route path="epkview/:title" element={<EpkView />} />
        <Route path="epkviewpage/:title" element={< EpkViewPage/>} />
      </Route>
      <Route path="epk" element={<EPK />} />
      <Route path="approvals/:fepkId" element={<TestApproval />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
