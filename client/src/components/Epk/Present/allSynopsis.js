import React, { useState } from "react";
import Synopsis from "./synopsis";
import movieImage from "./movie2.jpeg";
function AllSynopsis(props) {
  const [synopsisList, setSynopsisList] = useState(null);
  setSynopsisList(props.synopsisList);
  console.log(synopsisList);
  /*   const [photo, setPhoto] = useState(
    "https://res.cloudinary.com/ddqc5ljmz/image/upload/v1669740339/movie2_o4pspu.jpg"
  );
  const [text, setText] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
  );
  const synopsFile = [
    {
      photo:
        "https://res.cloudinary.com/ddqc5ljmz/image/upload/v1669740339/movie2_o4pspu.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    },
    {
      photo:
        "https://res.cloudinary.com/ddqc5ljmz/image/upload/v1669741242/CK2PDD2WIAA_hyr_mmswi3.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, ",
    },
    {
      photo:
        "https://res.cloudinary.com/ddqc5ljmz/image/upload/v1663685303/cld-sample-3.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sgsgsr ewfsaf wrgwgtwergtrweg, ",
    },
  ]; */

  return (
    <>
      {/*    {synopsFile.map((s) => (
        <Synopsis synopsFile={s} />
      ))} */}
    </>
  );
}
export default AllSynopsis;
