/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { getUserbyId } from "../../../api/epks";
import { Link } from "react-router-dom";
import { ReactComponent as MessageIcon } from '../../../images/icons/message-icon-2.svg';
import { useTranslation } from "react-i18next";

export default function RequestCardMobile({ request, filter, onMessageIconClick, onDeny, onApprove }) {

  const { t } = useTranslation();
  const [user, setUser] = useState();
  const [picture, setPicture] = useState();
  useEffect(() => {
    getUserbyId(request.user).then((res) => {
      setUser(res);
      setPicture(
        user?.picture ===
          "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844376/avatars/default_pic_jeaybr.png"
          ? "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844376/avatars/default_pic_jeaybr.png"
          : `${process.env.REACT_APP_AWS_URL}/${user?.picture}`
      );
    });
  }, [request.user, user?.picture]);

  if (!user) return null;

  return (
    <>

      {/* mobile version */}
      <div id="test" className="
      tw-flex 
      tw-flex-col
      tw-px-2 tw-py-6
      tw-gap-4 tw-rounded-md
      tw-bg-[#ECF0F1]/75
      tw-shadow-multiSoft">
        <div className="tw-flex tw-gap-6">
          <Link to={`/actor/${user._id}`}>
            <div className="
        tw-relative 
        tw-h-20 
        tw-w-20  
        tw-overflow-hidden 
        !tw-rounded-md">
              <img className="
            tw-w-full
            tw-h-full
            tw-object-cover
            !tw-rounded-none
            !tw-m-0"
                src={picture} alt={`${user.firstName} ${user.lastName} `} />
              <span className="tw-absolute 
            tw-w-full tw-text-center 
            tw-bg-[#00000080] 
            tw-bottom-0
            tw-text-white 
            tw-text-[12px] 
            tw-leading-none 
            tw-py-1">
                {user.role}
              </span>
            </div>
          </Link>

          <div className="tw-flex tw-flex-col
        tw-justify-end
        tw-gap-1
        tw-text-[#1E0039] 
        tw-text-md ">
            <Link to={`/actor/${user._id}`}>
              <div >{`${user.firstName} ${user.lastName}`}</div>
            </Link>
            <div className="tw-min-h-[20px]">
              <a
                href={
                  user.website
                }
                target="_blank"
                rel="noopener noreferrer"
                className=" tw-underline"
              > check the website
              </a>
            </div>
          </div>

          <div className="sm:tw-flex-row tw-flex-wrap tw-ml-auto tw-gap-3 tw-flex tw-flex-col tw-items-center tw-justify-between">

            {
              request.status === 'approved' &&
              (<button className={`
             tw-flex tw-items-center tw-justify-center
        tw-h-8
        tw-bg-white
        tw-border-2 
        tw-rounded-[40px] 
        tw-border-[#6101B7] 
        tw-py-0 
        tw-px-4 
        tw-self-end
         tw-bg-gradient-to-r tw-from-[#FF00A0] tw-to-[#1E0039] tw-text-white ` } disabled>{t("Approved")} </button>)

            }

            {
              request.status === 'refused' &&
              (<button className={`
             tw-flex tw-items-center tw-justify-center
        tw-h-8
        tw-bg-white
        tw-border-2 
        tw-rounded-[40px] 
        tw-border-[#6101B7] 
        tw-py-0 
        tw-px-4 
        tw-self-end
         tw-bg-gradient-to-r tw-from-[#FF00A0] tw-to-[#1E0039] tw-text-white ` } disabled>{t("Denied")} </button>)

            }

            {request.status === 'pending' &&

              <>
                <button onClick={onApprove} className={`
             tw-flex tw-items-center tw-justify-center
        tw-h-8
        tw-bg-white
        tw-border-2 
        tw-rounded-[40px] 
        tw-border-[#6101B7] 
        tw-py-0 
        tw-px-4 
        tw-self-end
         tw-bg-gradient-to-r tw-from-[#FF00A0] tw-to-[#1E0039] tw-text-white `}>{t("Approve")} </button>

                <button onClick={onDeny} className="
             tw-flex tw-items-center tw-justify-center
       tw-h-8
       tw-bg-white
        tw-border-2 
        tw-rounded-[40px] 
        tw-border-[#6101B7] 
        tw-py-0 
        tw-px-4 
        tw-self-end ">
                  {t("Deny")}
                </button>
              </>
            }
            <button onClick={() => onMessageIconClick(user._id)} className="
        tw-flex tw-items-center tw-justify-center
        tw-h-8
      tw-bg-white
        tw-ml-auto 
        tw-border-2 
        tw-rounded-[40px] 
        tw-border-[#6101B7] 
        tw-px-4 
        tw-self-end ">
              <MessageIcon className=" tw-w-8 tw-my-3 tw-inline-block" />
            </button>
          </div>
        </div>
        {
          request.status === 'pending' &&
          <p className="tw-border-2 tw-border-[#1E0039] tw-rounded-lg tw-p-2 tw-text-[#1E0039] 
        tw-text-lg">{request.comment}</p>
        }
      </div >

    </>

  );
}
