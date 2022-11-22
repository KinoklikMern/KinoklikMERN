import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const { user } = useSelector((user) => ({ ...user }));

  return (
    <>
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        {user && <h3>wellcome back</h3>}
        <h2>
          {" "}
          {user?.firstName} {user?.lastName}
        </h2>
        <br />
        <br />
        HOME PAGE!!!
        <br />
        <br />
        <br />
      </div>
    </>
  );
}

export default Home;
