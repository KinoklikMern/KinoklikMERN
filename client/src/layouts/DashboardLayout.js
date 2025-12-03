import { Outlet, useLocation } from "react-router-dom";
import DefaultNavbar from "../components/navbar/Navbar";
import "./MainLayout.css";
import NotificationNavbar from "../components/navbar/NotificationNavbar";

function MainLayout(props) {

  const Navbar = useLocation().pathname === '/dashboard/notifications'
    ? NotificationNavbar
    : DefaultNavbar;

  return (
    <div className="mainLayout">
      <Navbar className={props.className} title={props.title} />
      <Outlet />
    </div>
  );
}

export default MainLayout;
