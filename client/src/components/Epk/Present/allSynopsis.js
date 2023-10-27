/* eslint-disable no-unused-vars */
import React, { useState } from "react";

function AllSynopsis(synopsisList) {
  const [synopsisList1, setSynopsisList1] = useState(null);
  setSynopsisList1(synopsisList.synopsisList);

  return (
    <>
      {/*    {synopsisList1?.map((s) => (
        <Synopsis synopsFile={s} />
      ))} */}
    </>
  );
}
export default AllSynopsis;
