import React from "react";
import LoglineForm from "../../components/Epk/Input/LoglineForm";
import Logline from "../../components/Epk/Present/Logline";
import ProducerForm from "../../components/Epk/Input/ProducerForm";
import Producers from "../components/Epk/Present/Producers";

const EpkDashboardPage = () => {
  return (
    <div>
      {/* <UniqueForm/> */}
      {/* <StillsForm/> */}
      <LoglineForm />
      <ProducerForm />
      {/* <Unique/> */}
      {/* <Stills/> */}
      <Logline />
      <Producers />
    </div>
  );
};

export default EpkDashboardPage;
