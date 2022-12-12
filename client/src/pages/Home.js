import React from "react";
import "./Home.css";
import { useSelector } from "react-redux";

function Home() {
  const { user } = useSelector((user) => ({ ...user }));

  return (
    <>
      <div>
<<<<<<< HEAD
        <img
          src={require("../images/back_image.jpeg")}
          alt="back_image"
          class="background_image img-fluid"
        />

        <div class="container-fluid">
          <div class="home-content padding">
            <h1 class="jumbo text-left"> Searching For Angels</h1>
            <p class="jumbo text-left">
              {" "}
              Who is Jane Doe?Thats the question everybody wantsan answer
              to,including herself.
            </p>
            <p class="jumbo text-left">
              Director: <strong> Nadeem Soumah</strong>
            </p>
            <p class="jumbo text-left">Drama | 2011 </p>
            <p class="jumbo text-left">
              <i class="far fa-clock"></i> 95 min{" "}
            </p>

            <div class="text-left">
              <button class="btnstyle">BUY</button>
              <button type="button" class="btniconstyle">
                <i class="fas fa-plus"></i>
              </button>
              <button type="button" class="btniconstyle">
                <i class="fas fa-share"></i>
              </button>
            </div>
          </div>
        </div>

        <section class="container-fluid">
          <ul
            class="nav nav-pills row mb-5 justify-content-md-center"
            id="pills-tab"
            role="tablist"
          >
            <li class="nav-item col-6 col-md-4 " role="presentation">
              <button
                class="btnstyleone details"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                Details
              </button>
            </li>
            <li class="nav-item col-6 col-md-4" role="presentation">
              <button
                class="btnstyleone extras"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Extras
              </button>
            </li>
            <li class="nav-item col-6 col-md-4" role="presentation">
              <button
                class="btnstyleone morelike"
                id="pills-contact-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-contact"
                type="button"
                role="tab"
                aria-controls="pills-contact"
                aria-selected="false"
              >
                More Like this
              </button>
            </li>
          </ul>

          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <section class="container-fluid">
                <div class="row justify-content-between box">
                  <div class="col-4 left-box">
                    <h5 ckass="desc-heading">DESCRIPTION:</h5>
                    <p class="desc-name">
                      {" "}
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Proin scelerisque mattis justo sed elementum. Praesent
                      congue et elit id tincidunt. Aliquam erat volutpat.
                      Aliquam lorem ex, ullamcorper quis elit vel, sollicitudin
                      tincidunt felis. Quisque scelerisque sit amet quam a
                      maximus. Phasellus felis metus, sollicitudin et ex at,
                      faucibus euismod turpis. In in dui magna.
                    </p>

                    <p class="desc-name">
                      {" "}
                      Praesent eget ipsum purus. Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Nulla facilisi. Mauris eget
                      semper neque. Duis sit amet interdum metus. Nunc urna
                      ligula, bibendum et aliquet sit amet, placerat sed ipsum.
                    </p>
                  </div>
                  <div class="col-4">
                    <div class="card main-cardcontainer">
                      <div class="top-container">
                        <img
                          src={require("../images/avatar.jpeg")}
                          alt="avatar"
                          class="profile-image img-fluid"
                        />

                        <div class="ml-5">
                          <h5 class="name">Rendition Films</h5>
                          <p class="mail">420 followers</p>
                        </div>
                      </div>
                      <div class="bottom-container">
                        <button type="button" class="btn follow-btn">
                          Follow+
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section class="container-fluid">
                <h4 class="container-heading">AWARDS & FESTIVALS:</h4>
                <h6 class="seeall-heading">
                  <a href="#">See all</a>
                </h6>
                <div class="row">
                  <div class="col-sm awardbox_one">
                    <p> Venice Film Festival </p>
                    <p>1996 | Winner: Best Film </p>
                    <p>(Filmcritica Bastone BiancoAward)</p>
                  </div>
                  <div class="col-sm  awardbox_two">
                    <p>Venice Film Festival </p>
                    <p>1996 | Winner: Best Film </p>
                    <p>(Filmcritica Bastone BiancoAward)</p>
                  </div>
                  <div class="col-sm awardbox_three">
                    <p>Venice Film Festival </p>
                    <p>1996 | Winner: Best Film </p>
                    <p>(Filmcritica Bastone BiancoAward)</p>
                  </div>
                </div>
              </section>

              <section class="container-fluid">
                <h4 class="container-heading">CAST & CREW:</h4>
                <h6 class="seeall-heading">
                  <a href="#">See all</a>
                </h6>
                <div class="row">
                  <div class="col">
                    <img
                      src={require("../images/avatar.jpeg")}
                      alt="avatar"
                      class="cast-image img-fluid"
                    />

                    <p class="image-title">Vivica A. Fox</p>
                    <p class="image-title">Alex Levy</p>
                  </div>
                  <div class="col">
                    <img
                      src={require("../images/avatar.jpeg")}
                      alt="avatar"
                      class="cast-image img-fluid"
                    />
                    <p class="image-title">Vivica A. Fox</p>
                    <p class="image-title">Alex Levy</p>
                  </div>
                  <div class="col">
                    <img
                      src={require("../images/avatar.jpeg")}
                      alt="avatar"
                      class="cast-image img-fluid"
                    />
                    <p class="image-title">Vivica A. Fox</p>
                    <p class="image-title">Alex Levy</p>
                  </div>
                  <div class="col">
                    <img
                      src={require("../images/avatar.jpeg")}
                      alt="avatar"
                      class="cast-image img-fluid"
                    />
                    <p class="image-title">Vivica A. Fox</p>
                    <p class="image-title">Alex Levy</p>
                  </div>
                  <div class="col">
                    <img
                      src={require("../images/avatar.jpeg")}
                      alt="avatar"
                      class="cast-image img-fluid"
                    />
                    <p class="image-title">Vivica A. Fox</p>
                    <p class="image-title">Alex Levy</p>
                  </div>
                  <div class="col">
                    <img
                      src={require("../images/avatar.jpeg")}
                      alt="avatar"
                      class="cast-image img-fluid"
                    />
                    <p class="image-title">Vivica A. Fox</p>
                    <p class="image-title">Alex Levy</p>
                  </div>
                  <div class="col">
                    <img
                      src={require("../images/avatar.jpeg")}
                      alt="avatar"
                      class="cast-image img-fluid"
                    />
                    <p class="image-title">Vivica A. Fox</p>
                    <p class="image-title">Alex Levy</p>
                  </div>
                  <div class="col">
                    <img
                      src={require("../images/avatar.jpeg")}
                      alt="avatar"
                      class="cast-image img-fluid"
                    />
                    <p class="image-title">Vivica A. Fox</p>
                    <p class="image-title">Alex Levy</p>
                  </div>
                  <div class="col">
                    <img
                      src={require("../images/avatar.jpeg")}
                      alt="avatar"
                      class="cast-image img-fluid"
                    />
                    <p class="image-title">Vivica A. Fox</p>
                    <p class="image-title">Alex Levy</p>
                  </div>
                  <div class="col">
                    <img
                      src={require("../images/avatar.jpeg")}
                      alt="avatar"
                      class="cast-image img-fluid"
                    />
                    <p class="image-title">Vivica A. Fox</p>
                    <p class="image-title">Alex Levy</p>
                  </div>
                </div>
              </section>
            </div>

            <div
              class="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <div class="headings">
                <h3>Videos</h3>
                <h6 class="seeall-heading">
                  <a href="#">See all</a>
                </h6>
              </div>
              <section class="container-fluid mt-5">
                <h5> Instagram videos </h5>
              </section>

              <div class="headings">
                <h3>Photos</h3>
                <h6 class="seeall-heading">
                  <a href="#">See all</a>
                </h6>
              </div>
              <section class="container-fluid mt-5">
                <h5> Instagram Photos</h5>
              </section>

              <div class="headings">
                <h3>Trivia</h3>
                <h6 class="seeall-heading">
                  <a href="#">See all</a>
                </h6>
              </div>
              <section class="container-fluid mt-5">
                <div class="row">
                  <div class="col-sm trivia_one">
                    <p>
                      {" "}
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aenean consequat vehicula tortor, eu ultrices lorem
                      pellentesque sit amet. Aliquam at rutrum diam.
                      Pellentesque malesuada eleifend ligula vel ornare. Duis
                      dapibus, est tempus aliquam suscipit.
                    </p>
                  </div>
                  <div class="col-sm trivia_one">
                    <p>
                      {" "}
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aenean consequat vehicula tortor, eu ultrices lorem
                      pellentesque sit amet. Aliquam at rutrum diam.
                      Pellentesque malesuada eleifend ligula vel ornare. Duis
                      dapibus, est tempus aliquam suscipit.
                    </p>
                  </div>
                  <div class="col-sm trivia_one">
                    <p>
                      {" "}
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aenean consequat vehicula tortor, eu ultrices lorem
                      pellentesque sit amet. Aliquam at rutrum diam.
                      Pellentesque malesuada eleifend ligula vel ornare. Duis
                      dapibus, est tempus aliquam suscipit.
                    </p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm trivia_one">
                    <p>
                      {" "}
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aenean consequat vehicula tortor, eu ultrices lorem
                      pellentesque sit amet. Aliquam at rutrum diam.
                      Pellentesque malesuada eleifend ligula vel ornare. Duis
                      dapibus, est tempus aliquam suscipit.
                    </p>
                  </div>
                  <div class="col-sm trivia_one">
                    <p>
                      {" "}
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aenean consequat vehicula tortor, eu ultrices lorem
                      pellentesque sit amet. Aliquam at rutrum diam.
                      Pellentesque malesuada eleifend ligula vel ornare. Duis
                      dapibus, est tempus aliquam suscipit.
                    </p>
                  </div>
                  <div class="col-sm trivia_one">
                    <p>
                      {" "}
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aenean consequat vehicula tortor, eu ultrices lorem
                      pellentesque sit amet. Aliquam at rutrum diam.
                      Pellentesque malesuada eleifend ligula vel ornare. Duis
                      dapibus, est tempus aliquam suscipit.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <div
              class="tab-pane fade"
              id="pills-contact"
              role="tabpanel"
              aria-labelledby="pills-contact-tab"
            >
              <div class="headings">
                <h5>Category</h5>
              </div>
              <section class="container-fluid" id="section_category">
                <div class="more_like">
                  <img
                    src={require("../images/movies/movie2.jpeg")}
                    alt="avatar"
                    class="category_image img-fluid"
                  />
                  <img
                    src={require("../images/movies/movie3.jpeg")}
                    alt="avatar"
                    class="category_image img-fluid"
                  />
                  <img
                    src={require("../images/movies/movie4.jpeg")}
                    alt="avatar"
                    class="category_image img-fluid"
                  />
                  <img
                    src={require("../images/movies/movie5.jpg")}
                    alt="avatar"
                    class="category_image img-fluid"
                  />
                  <img
                    src={require("../images/movies/movie6.jpg")}
                    alt="avatar"
                    class="category_image img-fluid"
                  />
                  <img
                    src={require("../images/movies/movie7.jpg")}
                    alt="avatar"
                    class="category_image img-fluid"
                  />
                </div>
              </section>

              <div class="headings">
                <h5>Category</h5>
              </div>
              <section class="container-fluid">
                <div class="more_like">
                  <img
                    src={require("../images/movies/movie2.jpeg")}
                    alt="avatar"
                    class="category_image img-fluid"
                  />
                  <img
                    src={require("../images/movies/movie3.jpeg")}
                    alt="avatar"
                    class="category_image img-fluid"
                  />
                  <img
                    src={require("../images/movies/movie4.jpeg")}
                    alt="avatar"
                    class="category_image img-fluid"
                  />
                  <img
                    src={require("../images/movies/movie5.jpg")}
                    alt="avatar"
                    class="category_image img-fluid"
                  />
                  <img
                    src={require("../images/movies/movie6.jpg")}
                    alt="avatar"
                    class="category_image img-fluid"
                  />
                  <img
                    src={require("../images/movies/movie7.jpg")}
                    alt="avatar"
                    class="category_image img-fluid"
                  />
                </div>
              </section>

              <div class="headings">
                <h5>Category</h5>
              </div>
              <section class="container-fluid ">
                <div class="more_like">
                  <img
                    src={require("../images/movies/movie2.jpeg")}
                    alt="avatar"
                    class="category_image img-fluid"
                  />
                  <img
                    src={require("../images/movies/movie3.jpeg")}
                    alt="avatar"
                    class="category_image img-fluid"
                  />
                  <img
                    src={require("../images/movies/movie4.jpeg")}
                    alt="avatar"
                    class="category_image img-fluid"
                  />
                  <img
                    src={require("../images/movies/movie5.jpg")}
                    alt="avatar"
                    class="category_image img-fluid"
                  />
                  <img
                    src={require("../images/movies/movie6.jpg")}
                    alt="avatar"
                    class="category_image img-fluid"
                  />
                  <img
                    src={require("../images/movies/movie7.jpg")}
                    alt="avatar"
                    class="category_image img-fluid"
                  />
                </div>
              </section>
            </div>
          </div>
        </section>
=======
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
>>>>>>> sina-new
      </div>
    </>
  );
}

export default Home;
