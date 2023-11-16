import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function FepkDashboardNoAccess() {
  const { t } = useTranslation();

  return (
    <>
      <div
        style={{
          boxShadow: "1px 2px 9px #311465",
          marginLeft: "10%",
          width: "80%",
          background: "linear-gradient(rgba(128,128,128,0.65),transparent)",
          backgroundColor: "white",
          height: "570px",
          backgroundImage:
            "url(https://images.theconversation.com/files/159528/original/image-20170306-938-1t2lpfl.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip}}",
          backgroundRepeat: "no-repeat",
          backgroundSize: "20%",
          backgroundPosition: "center",
        }}
      >
        <div className="row">
          <div className="col-1">
            <Link className="navbar-brand text-headers-style" to="/home">
              <img
                style={{ width: "100%", height: "80px" }}
                src={require("../../../images/logo.png")}
                alt="Logo"
                className="navbar-logo"
              />
            </Link>
          </div>
          <div className="col-3  m-3">
            <h2
              className="col align-items-start"
              style={{
                color: "#311465",
                fontWeight: "normal",
                fontSize: "25px",
              }}
            >
              {t('EPK Dashboard')}
            </h2>
          </div>
          <div className="col-3 m-3"></div>
          <div className="col-1 m-3"></div>
          <div className="col-2 m-3"></div>
        </div>
      </div>
    </>
  );
}

export default FepkDashboardNoAccess;
