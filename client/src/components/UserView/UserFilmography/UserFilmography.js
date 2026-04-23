import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Import your existing, working API calls
import { getMoviesByActors, getFepksByFilmmakerId } from '../../../api/epks'; 
import emptyBanner from '../../../images/empty_banner.jpeg';

const S3 = process.env.REACT_APP_AWS_URL;

export default function UserFilmography({ profileOwnerId, role }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAppropriateFilmography = async () => {
      if (!profileOwnerId || profileOwnerId === "undefined") return;
      
      try {
        setIsLoading(true);
        let data = [];

        // Simple switch based on the role passed from the parent
        if (role === 'filmmaker') {
          data = await getFepksByFilmmakerId(profileOwnerId);
        } else {
          // Defaults to actor search
          data = await getMoviesByActors(profileOwnerId);
        }

        setProjects(data || []);
      } catch (err) {
        console.error("Error fetching filmography:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppropriateFilmography();
  }, [profileOwnerId, role]);

  if (isLoading || projects.length === 0) return null;

  return (
    <section className="tw-w-full tw-bg-transparent tw-py-12 tw-border-[#5A3F49]/30">
      <div className="tw-w-full tw-max-w-[1280px] tw-mx-auto tw-px-4 md:tw-px-0">
        
        {/* Dynamic Header based on Role */}
        <h2 className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-mb-8">
          {role === 'filmmaker' ? t('Worked On') : t('Appears In')}
        </h2>

        <div className="tw-pl-0 md:tw-pl-10">
          <div className="tw-flex tw-gap-6 tw-overflow-x-auto tw-pb-6 custom-scrollbar tw-snap-x">
            {projects.map((project) => (
              <button
                key={project._id}
                onClick={() => navigate(`/epk/${project._id}`)}
                className="tw-shrink-0 tw-group tw-bg-transparent tw-border-none tw-cursor-pointer tw-p-0 tw-text-left tw-snap-center"
              >
                <div className="tw-relative tw-w-44 tw-aspect-[2/3] tw-rounded-xl tw-overflow-hidden tw-border tw-border-[#5A3F49]/40">
                  <img
                    src={
                        project.image_details 
                        ? (project.image_details.startsWith('http') 
                            ? project.image_details 
                            : `${S3}/${project.image_details}`)
                        : emptyBanner // Fallback if image_details is missing
                    }
                    alt={project.title}
                    className="tw-w-full tw-h-full tw-object-cover"
                    onError={(e) => { e.target.src = emptyBanner; }}
                    />
                  
                  <div className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-bg-gradient-to-t tw-from-[#1E0039] tw-p-4">
                    <p className="tw-truncate tw-text-sm tw-font-bold tw-text-white tw-m-0">{project.title}</p>
                    <p className="tw-text-[10px] tw-font-bold tw-text-[#FF43A7] tw-mt-1">
                      {project.productionYear || '---'}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}