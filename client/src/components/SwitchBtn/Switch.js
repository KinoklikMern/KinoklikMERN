import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./SwitchBtn.css";
import { useTranslation } from "react-i18next";

export default function SwitchBtn({ role }) {
  const { t } = useTranslation();
  const [activeBtn, setActiveBtn] = useState("epk");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    setActiveBtn(path === "/actors" ? "actor" : "epk");
  }, [location.pathname]);

  return (
    <div className='switch-container'>
      <div className='switch-btn'>
        <Link to='/'>
          <button id='epk-btn' className={activeBtn === "epk" ? "active" : ""}>
            EPKs
          </button>
        </Link>
        <Link to='/actors'>
          <button
            id='actor-btn'
            className={activeBtn === "actor" ? "active" : ""}
          >
            {t("Actors")}
          </button>
        </Link>
      </div>
    </div>
  );
}
