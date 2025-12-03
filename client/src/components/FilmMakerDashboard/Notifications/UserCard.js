/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as MessageIcon } from '../../../images/icons/message-icon-2.svg';
import { t } from "i18next";

export default function UserCard(props) {
  const { role, firstName, lastName, email, phone, website, id } =
    props.UserInfo;

  // console.log(props.UserInfo);
  const picture =
    props.UserInfo.picture ===
      "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844376/avatars/default_pic_jeaybr.png"
      ? "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844376/avatars/default_pic_jeaybr.png"
      : `${process.env.REACT_APP_AWS_URL}/${props.UserInfo.picture}`;

  return (
    <>
      {/* mobile version */}

      <div className=" tw-flex md:tw-hidden  tw-px-6 tw-py-6 tw-gap-6 tw-rounded-md tw-bg-[#ECF0F1]/75
      tw-shadow-multiSoft">
        <Link to={`/actor/${id}`}>
          <div className="tw-relative tw-h-20 tw-w-20  tw-overflow-hidden !tw-rounded-md">
            <img className="tw-w-full tw-h-full tw-object-cover !tw-rounded-none !tw-m-0 "
              src={picture} alt={`${firstName} ${lastName} `} />
            <span className=" tw-absolute tw-w-full tw-text-center tw-bg-[#00000080] tw-bottom-0 tw-text-white tw-text-xs tw-leading-none tw-py-1">{role}</span>
          </div>
        </Link>
        <div className="sm:tw-text-md tw-flex tw-flex-col  tw-justify-end tw-gap-1 tw-text-[#1E0039] tw-text-lg ">
          <Link to={`/actor/${id}`}>
            <div >{`${firstName} ${lastName}`}</div>
          </Link>
          <div className="tw-min-h-[20px]">
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className=" tw-underline"
            > {t("check the website")}
            </a></div>
        </div>
        <button onClick={props.onMessageIconClick} className="tw-ml-auto tw-border-2 tw-rounded-[40px] tw-bg-white tw-border-[#6101B7] tw-py-0 tw-px-4 tw-self-end "><MessageIcon className=" tw-w-8" /></button>
      </div>

      {/* wide screen version */}
      <div className="tw-hidden md:tw-block tw-py-2 sm:tw-py-3">
        <div className="tw-flex tw-items-center tw-border-b-2 md:tw-gap-8">
          <div className="tw-relative tw-m-3 tw-flex-shrink-0">
            <Link to={`/actor/${props.UserInfo.id}`}>
              <div
                className="tw-h-20 tw-w-20 tw-rounded-lg tw-bg-cover tw-bg-center tw-bg-no-repeat"
                style={{ backgroundImage: `url(${picture})` }}
              ></div>
            </Link>

            <div className="tw-absolute tw-inset-x-0 tw-bottom-0 tw-flex tw-h-6 tw-justify-center tw-rounded-full tw-bg-gray-500 tw-bg-opacity-75">
              <span className="tw-self-center tw-text-sm tw-text-white">
                {role}
              </span>
            </div>
          </div>

          <div
            className="tw-ml-4 tw-min-w-0 tw-flex-1"
            style={{ maxWidth: "30%" }}
          >
            <div>
              <Link to={`/actor/${id}`}>
                <p className="tw-truncate tw-text-lg tw-font-medium tw-text-gray-900">
                  {firstName} {lastName}
                </p>
              </Link>
              <p className="tw-truncate tw-text-lg tw-font-normal tw-text-gray-900">
                {website}
              </p>
            </div>
          </div>


          {/* Add the message icon and handle its click */}
          <div
            onClick={props.onMessageIconClick}
            className="tw-flex tw-items-center tw-justify-center"
            style={{
              cursor: "pointer",
              width: "32px",
              height: "32px",
            }}
          >
            <FontAwesomeIcon
              icon={faMessage}
              style={{ width: "100%", height: "100%" }}
              className="tw-h-full tw-w-full"
            />
          </div>
        </div>
      </div >

    </>
  );
}
