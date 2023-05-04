import React, { useState } from "react";
import ActionIcon from "./ActionIcon";
import DollarIcon from "../../../images/icons/DollarIcon.svg";
import KIcon from "../../../images/icons/K.svg";
import PlusIcon from "../../../images/icons/PlusWhite.svg";
import StarIcon from "../../../images/icons/StarWhite.svg";
import ShareIcon from "../../../images/icons/share.svg";
import { useSelector } from "react-redux";

export default function EpkSocialAction({ epkInfo }) {
  const { user } = useSelector((user) => ({ ...user }));
  let userId;
  let userRole;
  if (!user) {
    userId = "0";
    userRole = "noUser";
  } else {
    userId = user.id;
    userRole = user.role;

  }

  const [fepkInfo, setFepkInfo] = useState(epkInfo);
  console.log("!!", fepkInfo.wishes_to_buy.includes(userId));
  console.log(userId); 
  const actionList = [
    {
      name: "wish_to_buy",
      icon: DollarIcon,
      number: epkInfo.wishes_to_buy.length,
      width: "",
    },
    {
      name: "favorites",
      icon: PlusIcon,
      number: epkInfo.favourites.length,
    },
    {
      name: "likes",
      icon: StarIcon,
      number: epkInfo.likes.length,
    },
    {
      name: "K",
      icon: KIcon,
    },
    {
      name: "share",
      icon: ShareIcon,
    },
  ];

  const clickHandler = () => {
    //handler function
    console.log("aaaaa");
  };
  return (
    <div className="tw-flex tw-justify-between tw-bg-opacity-100 tw-px-6 tw-py-16">
      {actionList.map((action) => (
        <ActionIcon
          key={action.name}
          name={action.name}
          icon={action.icon}
          number={action.number}
          handler={clickHandler}
        />
      ))}
    </div>
  );
}
