
import StillsForm from "../components/Epk/Input/StillsForm";
import UniqueForm from "../components/Epk/Input/UniqueForm";
import Unique from "../components/Epk/Present/Uniques";
import Stills from "../components/Epk/Present/Stills";

import React from 'react'


const EpkDashboardPage = () => {
  return (
    <div>
   
      <UniqueForm/>
      <StillsForm/>
      <Unique/>
      <Stills/>
     
    </div>
  )
}

export default EpkDashboardPage
