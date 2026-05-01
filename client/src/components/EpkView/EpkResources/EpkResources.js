import  { useState } from "react";
import ResourceCard from "./ResourceCard";
import ActionPlaceholder from "../../common/ActionPlaceholder";
import ResourceModal from "./ResourceModal";
import { useTranslation } from 'react-i18next';
import { uploadSingleFile } from "../../../api/epks";
import { useSelector } from "react-redux";

export default function EpkResources({ epkInfo, isEditMode, onChange }) {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const resources = epkInfo?.resources || [];

  if (!isEditMode && resources.length === 0) {
    return null;
  }

  const handleOpenCreate = () => {
    setSelectedResource(null);
    setEditIndex(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (resource, index) => {
    setSelectedResource(resource);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleSaveResource = async (resourceData) => {
    try {
      let finalImageUrl = resourceData.originalUrl;

      if (resourceData.file) {
        finalImageUrl = await uploadSingleFile(resourceData.file, user?.token);
      }

      const newResource = {
        title: resourceData.title,
        description: resourceData.description,
        time: resourceData.time,
        image: finalImageUrl
      };

      const newResourcesArray = [...resources];

      if (editIndex !== null) {
        newResourcesArray[editIndex] = newResource;
      } else {
        newResourcesArray.push(newResource);
      }

      onChange("resources", newResourcesArray);

    } catch (error) {
      console.error("Failed to save resource:", error);
      throw error; 
    }
  };

  const handleDeleteResource = (resourceToDelete) => {
    const newResourcesArray = resources.filter((r, idx) => idx !== editIndex);
    onChange("resources", newResourcesArray);
    setIsModalOpen(false);
  };

  return (
    <div className="tw-w-full tw-bg-[#1E0039] tw-py-16 tw-px-4 md:tw-px-16">
      
      {/* HEADER (Matches EpkUniqueness exact structure) */}
      <div className="tw-max-w-[1200px] tw-mx-auto tw-flex tw-flex-col tw-mb-10 md:tw-mb-16 tw-px-4 md:tw-px-0">
        <span className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-mb-1">
          {t('Production Logistics')}
        </span>
        <h2 className="tw-text-white tw-text-3xl md:tw-text-4xl tw-font-bold tw-tracking-tight tw-mb-2">
          {t('Resources Needed')}
        </h2>
        {isEditMode && (
          <p className="tw-text-[#DDB7FF] tw-text-sm md:tw-text-base tw-leading-relaxed tw-max-w-[672px] tw-mt-2 tw-mb-0">
            {t('Tell the world what unique resources you need to make your film (e.g. a red Ferrari, an outdoor boxing gym, a Penthouse pool). Use these cards to ask people for help, as it doubles as free ads for your film!')}          </p>
        )}
      </div>

      {/* HYBRID LAYOUT CONTAINER */}
      <div className="tw-max-w-[1200px] tw-mx-auto">
        <div className="tw-flex tw-flex-row md:tw-flex-col tw-overflow-x-auto md:tw-overflow-visible tw-snap-x tw-snap-mandatory md:tw-snap-none tw-gap-4 md:tw-gap-12 tw-w-full tw-pb-8 md:tw-pb-0 tw-scrollbar-width-none [&::-webkit-scrollbar]:tw-hidden">
          
          {resources.map((resource, index) => (
            <div key={index} className="tw-w-[85vw] sm:tw-w-[400px] md:tw-w-full tw-shrink-0 md:tw-shrink tw-snap-center md:tw-snap-align-none">
              <ResourceCard
                resourceInfo={resource}
                fepkTitle={epkInfo?.title}
                isEditMode={isEditMode}
                onEditClick={() => handleOpenEdit(resource, index)}
              />
            </div>
          ))}

          {/* Add New Placeholder (Only in Edit Mode) */}
          {isEditMode && (
            <div className="tw-w-[85vw] sm:tw-w-[400px] md:tw-w-full tw-shrink-0 md:tw-shrink tw-snap-center md:tw-snap-align-none">
              <ActionPlaceholder 
                variant="resource" 
                title={t('Add New Resource')}
                onClick={handleOpenCreate} 
              />
            </div>
          )}

        </div>
      </div>

      <ResourceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        resource={selectedResource}
        onSave={handleSaveResource}
        onDelete={handleDeleteResource}
      />

    </div>
  );
}