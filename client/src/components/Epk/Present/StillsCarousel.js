import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import "./StillsCarousel.css";
import { useEffect, useState } from "react";
import http from "../../../http-common";

function StillsCarousel(props) {
  let { title } = props.title;
  const [stills, setStills] = useState([]);

  useEffect(() => {
    http.get(`fepks/byTitle/${title}`).then((response) => {
      setStills(response.data.stills);
      console.log(stills);
    });
  }, [stills, title]);

  return (
    <div>
      <Carousel>
        {stills.map((s) => (
          <Carousel.Item interval={2000}>
            <Link to="/movie/830784">
              <img
                className="img-container d-block "
                style={{
                  borderRadius: "30px",
                  width: "100%",
                  height: "100%",
                }}
                src={`https://kinomovie.s3.amazonaws.com/${s.image}`}
                alt="resource pics"
              />

              {/* <Carousel.Caption>
                <h3 style={{ fontSize: "1.5rem" }}></h3>
              </Carousel.Caption> */}
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default StillsCarousel;
