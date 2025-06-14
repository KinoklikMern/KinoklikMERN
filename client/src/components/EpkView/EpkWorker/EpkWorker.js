import React from 'react';
import CastCard from '../EpkCast/CastCard';

export default function EpkWorker({ epkInfo }) {
  const IMAGE_URL_PRIFIX = `${process.env.REACT_APP_AWS_URL}`;

  const crewList = epkInfo.actors.filter(
    (actor) => !actor.role.includes('Actor')
  );

  return crewList.length !== 0 ? (
    <div className="tw-bg-opacity-100">
      <div className="tw-text-white">
        {crewList.map((cast, index) => (
          <CastCard
            key={cast._id}
            index={index}
            image={
              cast.picture.startsWith('https')
                ? `${cast.picture}`
                : `${IMAGE_URL_PRIFIX}/${cast.picture}`
            }
            text={cast.aboutMe}
            castName={cast.firstName + ' ' + cast.lastName}
            epkRole={cast.role}
            actorUrl={`/filmmaker/${cast._id}`}
          />
        ))}
      </div>
    </div>
  ) : null;
}
