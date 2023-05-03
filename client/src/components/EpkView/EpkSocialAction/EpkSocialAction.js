import React from "react";
import ActionIcon from "./ActionIcon";
import DollarIcon from "../../../images/icons/DollarIcon.svg";
import KIcon from "../../../images/icons/K.svg";
import PlusIcon from "../../../images/icons/PlusWhite.svg";
import StarIcon from "../../../images/icons/StarWhite.svg";
import ShareIcon from "../../../images/icons/share.svg";

export default function EpkSocialAction({ epkInfo }) {
  const actionList = [
    {
      name: "wish_to_buy",
      icon: DollarIcon,
      number: epkInfo.wishes_to_buy.length,
      width :""
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
  return (
    <div className="tw-flex tw-justify-between tw-bg-opacity-100 tw-p-6">
      {actionList.map((action) => (
        <ActionIcon
          key={action.name}
          name={action.name}
          icon={action.icon}
          number={action.number}
        />
      ))}
    </div>
  );
}
