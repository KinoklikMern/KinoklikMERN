import { useState } from "react";
import { ReactComponent as BuyIcon } from '../../../images/icons/buy.svg';
import { ReactComponent as FilledBuyIcon } from '../../../images/icons/filled-buy.svg';
import { ReactComponent as LikeIcon } from '../../../images/icons/like.svg';
import { ReactComponent as FilledLikeIcon } from '../../../images/icons/filled-like.svg';
import { ReactComponent as FollowIcon } from '../../../images/icons/follow.svg';
import { ReactComponent as FilledFollowIcon } from '../../../images/icons/filled-follow.svg';

export default function EpkInfo({
    selected,
    handleBuyers,
    handleLikers,
    handleFollowers, }) {

    const [activeButton, setActiveButton] = useState('like');

    const buyCount = selected?.wishes_to_buy?.length ?? 0;
    const likeCount = selected?.likes?.length ?? 0;
    const followCount = selected?.favourites?.length ?? 0;

    const handleClick = (type, value) => {
        switch (type) {
            case 'like':
                setActiveButton(pre => 'like');
                handleLikers(value);
                console.log(activeButton)
                break;
            case 'buy':
                setActiveButton(pre => 'buy');
                handleBuyers(value);
                console.log(activeButton)
                break;
            case 'follow':
                setActiveButton(pre => 'follow');
                handleFollowers(value);
                console.log(activeButton)
                break;
            default:
                console.log(activeButton)
                return null;
        }

    }
    return (
        <div className="tw-flex tw-justify-center tw-gap-11 tw-mt-4 tw-mb-8 tw-h-16">

            <button onClick={() => handleClick('like', selected.likes)}
                className={`tw-relative  tw-flex tw-flex-col tw-items-center tw-justify-start tw-gap-0`}>
                {activeButton === "like" ?
                    <FilledLikeIcon className={`tw-h-16 tw-w-16 tw-object-contain !tw-rounded-none`} /> :
                    <LikeIcon className={`tw-h-9 tw-w-auto tw-object-contain !tw-rounded-none`} />}
                <p className={`tw-text-md
                                 ${activeButton === "like" ?
                        "tw-text-[#1E0039]" : "tw-text-[#868585]"}`}>Like</p>
                <p className="tw-absolute tw--top-4 tw--right-2 tw-text-[#FF0000] tw-text-lg">{likeCount}</p>
            </button>

            <button onClick={() => handleClick('buy', selected.wishes_to_buy)}
                className={`tw-relative  tw-flex tw-flex-col tw-items-center tw-justify-start tw-gap-0 `}>
                {activeButton === "buy" ?
                    <FilledBuyIcon className={`tw-h-9 tw-w-auto tw-object-contain !tw-rounded-none`} /> :
                    <BuyIcon className={`tw-h-16 tw-w-16  tw-object-contain !tw-rounded-none`} />}
                <p className={`tw-text-md
                                 ${activeButton === "buy" ?
                        "tw-text-[#1E0039]" : "tw-text-[#868585]"}`}>Would Buy</p>
                <p className="tw-absolute tw--top-4 tw-right-4 tw-text-[#FF0000] tw-text-lg">{buyCount}</p>
            </button>

            <button onClick={() => handleClick('follow', selected.favourites)}
                className={`tw-relative  tw-flex tw-flex-col tw-items-center tw-justify-start tw-gap-0 `}>
                {activeButton === "follow" ?
                    <FilledFollowIcon className={`tw-h-9 tw-w-auto tw-object-contain !tw-rounded-none`} /> :
                    <FollowIcon className={`tw-h-16 tw-w-16  tw-object-contain !tw-rounded-none`} />}
                <p className={`tw-text-md
                                 ${activeButton === "follow" ?
                        "tw-text-[#1E0039]" : "tw-text-[#868585]"}`}>Follow</p>
                <p className="tw-absolute tw--top-4 tw-right-1 tw-text-[#FF0000] tw-text-lg">{followCount}</p>
            </button>
        </div>
    )

}