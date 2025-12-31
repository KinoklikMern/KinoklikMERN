/* eslint-disable no-unused-vars */
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import RequestButton from "../miscellaneous/RequestButton";
import "../../Epk/Present/StillsCarousel.css";


function EpkStills({ epkInfo, requestStatus, handler }) {
  const stillList = epkInfo?.stills;
  return (
    stillList.length !== 0 && (
      <div className='tw-hidden md:tw-block tw-my-12 tw-h-[700px] tw-rounded-lg tw-bg-white tw-p-5'>
        <div className='tw-h-full tw-rounded-lg tw-bg-[#1E0039] tw-p-5'>
          <Carousel className='h-100 tw-flex tw-items-center tw-justify-center'>
            {stillList.map((s, index) => (
              <Carousel.Item interval={2000} className='' key={index}>
                <Link to='/movie/830784'>
                  <div className='tw-border-1 tw-absolute tw-left-[45%] tw-top-[2%] tw-my-3 tw-rounded-lg tw-border-[#712CB0] '>
                    {requestStatus !== "approved" && s.blur && (
                      <RequestButton status={requestStatus} handler={handler} />
                    )}
                  </div>
                  <img
                    className={"img-container d-block"}
                    style={{
                      borderRadius: "30px",
                      height: "100%",
                      filter:
                        requestStatus !== "approved" && s.blur && "blur(8px)",
                    }}
                    src={`https://kinomovie.s3.amazonaws.com/${s.image}`}
                    alt='resource pics'
                  />
                  {/* <Carousel.Caption>
                    <h3 style={{ fontSize: "1.5rem" }}></h3>
                  </Carousel.Caption> */}
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    )
  );
}

export default EpkStills;
