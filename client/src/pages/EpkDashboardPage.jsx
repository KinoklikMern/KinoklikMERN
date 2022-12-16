
import StillsForm from "../components/Epk/Input/StillsForm";
import UniqueForm from "../components/Epk/Input/UniqueForm";
import Unique from "../components/Epk/Present/Uniques";
import Stills from "../components/Epk/Present/Stills";
import SynopsisForm from "../components/Epk/Input/SynopsisForm";
import React from 'react'
import LoglineForm from "../components/Epk/Input/LoglineForm";
import Logline from "../components/Epk/Present/Logline";
import ProducerForm from "../components/Epk/Input/ProducerForm";
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
  )
}

export default EpkDashboardPage
