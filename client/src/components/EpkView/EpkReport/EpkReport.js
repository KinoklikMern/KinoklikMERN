/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import http from "../../../http-common";
import { useSelector } from "react-redux";
import style from "../../../pages/EpkView.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faFlag,
  faCircleInfo,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export default function EpkReport({ epkInfo }) {
  const user = useSelector((state) => state.user);
  let userId;
  let userRole;
  if (!user) {
    userId = "0";
    userRole = "noUser";
  } else {
    userId = user.id;
    userRole = user.role;
  }
  const [report, setReport] = useState({
    userId: userId,
    reason: "Spam",
    comment: "",
  });
  const [isClickDot, setIsClickDot] = useState(false);
  const clickStateDot = () => {
    setIsClickDot(!isClickDot);
  };

  const [isShow, setIsShow] = useState(false);

  function makeReport() {
    setIsShow(true);
  }

  const [isClose, setIsClose] = useState(false);
  const clickClose = () => {
    setIsClickInfoIcon1(false);
    setIsClickInfoIcon2(false);
    setIsClickInfoIcon3(false);
    setIsClickInfoIcon4(false);
    setChosen1(false);
    setChosen2(false);
    setChosen3(false);
    setChosen4(false);
    setIsShow(!isShow);
    setIsClickDot(!isClickDot);
  };
  const [isClickInfoIcon1, setIsClickInfoIcon1] = useState(false);
  const clickInfoIcon1 = () => {
    setIsClickInfoIcon1(!isClickInfoIcon1);
    setIsClickInfoIcon2(false);
    setIsClickInfoIcon3(false);
    setIsClickInfoIcon4(false);
  };
  const [isClickInfoIcon2, setIsClickInfoIcon2] = useState(false);
  const clickInfoIcon2 = () => {
    setIsClickInfoIcon1(false);
    setIsClickInfoIcon2(!isClickInfoIcon2);
    setIsClickInfoIcon3(false);
    setIsClickInfoIcon4(false);
  };

  const [isClickInfoIcon3, setIsClickInfoIcon3] = useState(false);
  const clickInfoIcon3 = () => {
    setIsClickInfoIcon1(false);
    setIsClickInfoIcon2(false);
    setIsClickInfoIcon3(!isClickInfoIcon3);
    setIsClickInfoIcon4(false);
  };

  const [isClickInfoIcon4, setIsClickInfoIcon4] = useState(false);
  const clickInfoIcon4 = () => {
    setIsClickInfoIcon1(false);
    setIsClickInfoIcon2(false);
    setIsClickInfoIcon3(false);
    setIsClickInfoIcon4(!isClickInfoIcon4);
  };
  const [isClickReport, setIsClickReport] = useState(false);
  const clickReport = () => {
    http.put(`/fepks/report/${epkInfo._id}`, report).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      }
      console.log("report sent");
    });
    console.log(report);
    setIsClickReport(true);
  };

  const [chosen1, setChosen1] = useState(false);
  const [chosen2, setChosen2] = useState(false);
  const [chosen3, setChosen3] = useState(false);
  const [chosen4, setChosen4] = useState(false);

  function chooseReason(reason) {
    setReport({ ...report, reason: reason });
    setChosen1(!chosen1);
    setChosen2(false);
    setChosen3(false);
    setChosen4(false);
  }
  function chooseReason1(reason) {
    setReport({ ...report, reason: reason });
    setChosen2(!chosen2);
    setChosen1(false);
    setChosen3(false);
    setChosen4(false);
  }
  function chooseReason2(reason) {
    setReport({ ...report, reason: reason });
    setChosen3(!chosen3);
    setChosen1(false);
    setChosen2(false);
    setChosen4(false);
  }
  function chooseOtherReason() {
    setChosen4(!chosen4);
    setChosen1(false);
    setChosen2(false);
    setChosen3(false);
  }

  const handleInputChange = (event) => {
    let comment = event.target.value;
    setReport({ ...report, comment: comment });
    // setChosen4(true);
    // setChosen1(false);
    // setChosen2(false);
    // setChosen3(false);
  };

  function login() {
    document.getElementById("login").click();
    // setClickStar(!clickStar);
  }
  //For Translation
  const { t } = useTranslation();

  return (
    <div>
      {isClickDot === false || isClose === true ? (
        <div className={style.dotSection}>
          <FontAwesomeIcon
            color='white'
            onClick={() => clickStateDot()}
            icon={faEllipsisVertical}
          />
        </div>
      ) : user === null ? (
        <div className={style.reportSection}>
          <button className={style.reportBtn} onClick={() => login()}>
            <FontAwesomeIcon icon={faFlag} />
            &nbsp; {t("Report")}
          </button>
        </div>
      ) : (
        <div className={style.reportSection}>
          <button
            className={style.reportBtn}
            onClick={() => {
              makeReport();
              setIsClickDot(false);
            }}
          >
            <FontAwesomeIcon icon={faFlag} />
            &nbsp; {t("Report")}
          </button>
          <div />

          <div
            className={
              isShow === true || isClose === false
                ? style.reportForm
                : style.hidden
            }
          >
            <span onClick={() => clickClose()} className={style.closeBtn}>
              &times;
            </span>

            {isClickReport === false ? (
              <>
                <p className={style.reportTitle}>
                  {t("Why are you reporting this EPK?")}
                </p>
                <form className={style.form1}>
                  <div className={style.inputContainer}>
                    <input
                      className={
                        chosen1 === true ? style.selected : style.form1Input
                      }
                      type='text'
                      value='Spam'
                      onhover='tw-color-red-500'
                      onClick={() => chooseReason("Spam")}
                      readOnly
                    ></input>
                    <FontAwesomeIcon
                      className={
                        chosen1 === true ? style.infoIconSelect : style.infoIcon
                      }
                      icon={faInfoCircle}
                      onClick={() => clickInfoIcon1()}
                    />
                    {isClickInfoIcon1 === true ? (
                      <div className={style.reportMessage}>
                        {t(
                          "This can be unwanted and unauthorized use of content from another website on third-party websites in connection with other content, negatively affecting your experience and reputation on our platform."
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className={style.inputContainer}>
                    <input
                      className={
                        chosen2 === true ? style.selected : style.form1Input
                      }
                      type='text'
                      value='Nudity or Sexual Content'
                      onClick={() => chooseReason1("Nudity or Sexual Content")}
                      readOnly
                    ></input>
                    <FontAwesomeIcon
                      className={
                        chosen2 === true ? style.infoIconSelect : style.infoIcon
                      }
                      icon={faCircleInfo}
                      onClick={() => clickInfoIcon2()}
                    />
                    {isClickInfoIcon2 === true ? (
                      <div className={style.reportMessage}>
                        {t(
                          "This can be any content that appears to be pronographic, sexual exploitation or solicitation and/or content that shows sexual intercourse, genitals and close-ups of fully-nude buttocks. Nudity in photos of paintings and sculptures are permitted."
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className={style.inputContainer}>
                    <input
                      className={
                        chosen3 === true ? style.selected : style.form1Input
                      }
                      type='text'
                      value='Copyrighted Intellectual Property Violation'
                      onClick={() =>
                        chooseReason2(
                          t("Copyrighted Intellectual Property Violation")
                        )
                      }
                      readOnly
                    ></input>
                    <FontAwesomeIcon
                      className={
                        chosen3 === true ? style.infoIconSelect : style.infoIcon
                      }
                      icon={faCircleInfo}
                      onClick={() => clickInfoIcon3()}
                    />
                    {isClickInfoIcon3 === true ? (
                      <div className={style.reportMessage}>
                        {t(
                          "This can be unwanted, unauthorized or unethical use of content from another website, negatively affecting your experience and the reputation on our platform."
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className={style.inputContainer}>
                    {!chosen4 && <label for='Other'>Other: </label>}
                    <input
                      className={
                        chosen4 === true ? style.selected : style.comment
                      }
                      type='text'
                      name='comment'
                      onChange={handleInputChange}
                      onClick={chooseOtherReason}
                      placeholder={t("type here")}
                    ></input>
                    <FontAwesomeIcon
                      className={
                        chosen4 === true ? style.infoIconSelect : style.infoIcon
                      }
                      icon={faCircleInfo}
                      onClick={() => clickInfoIcon4()}
                    />
                    {isClickInfoIcon4 === true ? (
                      <div className={style.reportMessage}>
                        {t(
                          "Other: any other reason you may want to report this EPK."
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <button
                    onClick={() => clickReport()}
                    className={style.submitReport}
                  >
                    {t("Report!")}
                  </button>
                </form>
              </>
            ) : (
              <p className={style.reportP}>
                {t(
                  "Thank you for reporting this film EPK. We are currently inverstigation and have notified the filmmaker accordingly."
                )}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
