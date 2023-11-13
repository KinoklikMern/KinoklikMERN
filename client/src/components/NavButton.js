import React from "react";
import { NavLink, useResolvedPath, useMatch } from "react-router-dom";
import {useTranslation} from 'react-i18next';

function NavButton(props) {
  const { t } = useTranslation();
  let resolved = useResolvedPath(props.to);
  let match = useMatch({ path: resolved.pathname, end: true });

  const buttonStyle = {
    backgroundColor: "green",
    border: "none",
    color: "white",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
  };

  const activeButtonStyle = {
    backgroundColor: "red",
    border: "none",
    color: "white",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
  };

  return (
    <NavLink to={props.to}>
      <button style={match ? activeButtonStyle : buttonStyle}>{t('Home')}</button>
    </NavLink>
  );
}

export default NavButton;
