import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import "../../Epk/Present/StillsCarousel.css";
import { useEffect, useState } from "react";
import http from "../../../http-common";

function EpkStills(props) {
  let { title } = props.epkInfo;
  const [stills, setStills] = useState([]);

  useEffect(() => {
    http.get(`fepks/byTitle/${title}`).then((response) => {
      setStills(response.data.stills);
      console.log(stills);
    });
  }, []);

  return (
    <div className="tw-bg-white tw-p-5 tw-my-12 tw-h-[700px]">
      <div className="tw-bg-[#1E0039] tw-h-full">
        <Carousel className="h-100">
          {stills.map((s) => (
            <Carousel.Item interval={2000}>
              <Link to="/movie/830784">
                <img
                  className="img-container d-block"
                  style={{
                    borderRadius: "30px",
                    width: "100%",
                    height: "100%",
                  }}
                  src={`https://kinomovie.s3.amazonaws.com/${s.image}`}
                  alt="resource pics"
                />

                <Carousel.Caption>
                  <h3 style={{ fontSize: "1.5rem" }}></h3>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default EpkStills;
