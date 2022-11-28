import UniquesForm from "../components/Epk/Input/UniquesForm";
import StillsForm from "../components/Epk/Input/StillsForm";
import Uniques from "../components/Epk/Present/Uniques";
import Stills from "../components/Epk/Present/Stills";

import React from 'react'

const EpkDashboardPage = () => {
  return (
    <div>
      <UniquesForm/>
      <StillsForm/>
      <Uniques/>
      <Stills/>
    </div>
  )
}

export default EpkDashboardPage
