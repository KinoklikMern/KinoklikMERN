import React from "react";
import { useSelector } from "react-redux";

function FilmMakerDashboard() {
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <div>
      filmMakerDashboard
      {user && <h3>wellcome back</h3>}
      <h2>
        {" "}
        {user?.firstName} {user?.lastName}
      </h2>
    </div>
  );
}
export default FilmMakerDashboard;
