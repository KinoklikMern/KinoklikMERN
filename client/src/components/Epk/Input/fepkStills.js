// ****new version by Armita *******
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { useTranslation } from "react-i18next";
import http from "../../../http-common";
import { getFepksById } from "../../../api/epks";


Modal.setAppElement("#root");


const CATEGORY_CONFIG = [
  { key: "posters", label: "Posters" },
  { key: "stills", label: "Stills" },
  { key: "premieres", label: "Premieres" },
  { key: "behind", label: "Behind The Scenes" },
];


const SLOTS_PER_CATEGORY = 10;

function normalizeCategoryArray(arr) {
  const source = Array.isArray(arr) ? arr : [];
  const result = Array.from({ length: SLOTS_PER_CATEGORY }, (_, i) =>
    source[i] ? source[i] : null
  );
  return result;
}

function StillsForm() {
  const { t } = useTranslation();
  const { id } = useParams();

  const [fepk, setFepk] = useState(null);
  const [albums, setAlbums] = useState({
    posters: Array(SLOTS_PER_CATEGORY).fill(null),
    stills: Array(SLOTS_PER_CATEGORY).fill(null),
    premieres: Array(SLOTS_PER_CATEGORY).fill(null),
    behind: Array(SLOTS_PER_CATEGORY).fill(null),
  });

  const [isSaving, setIsSaving] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    getFepksById(id)
      .then((response) => {
        setFepk(response);

        const pa = response.photo_albums || {};

        const legacyStills = response.stills || [];

        setAlbums({
          posters: normalizeCategoryArray(pa.posters),
          stills: normalizeCategoryArray(pa.stills && pa.stills.length ? pa.stills : legacyStills),
          premieres: normalizeCategoryArray(pa.premieres),
          behind: normalizeCategoryArray(pa.behind),
        });
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Error loading EPK data.");
      });
  }, [id]);

  // --- ۲) تابع کمکی برای ذخیره در سرور ---

  async function savePhotoAlbums(nextAlbums) {
    if (!fepk?._id) return;

    setIsSaving(true);
    setErrorMessage("");


    const payloadPhotoAlbums = {
      posters: nextAlbums.posters.filter(Boolean),
      stills: nextAlbums.stills.filter(Boolean),
      premieres: nextAlbums.premieres.filter(Boolean),
      behind: nextAlbums.behind.filter(Boolean),
    };


    const legacyStillsMirror = payloadPhotoAlbums.stills;

    try {
      await http.put(`fepks/update/${fepk._id}`, {
        photo_albums: payloadPhotoAlbums,
        stills: legacyStillsMirror,
      });
      // setModalIsOpen(true);
    } catch (err) {
      console.error(err);
      setErrorMessage("Error while saving Photo Albums.");
    } finally {
      setIsSaving(false);
    }
  }



  const handleSlotFileChange = async (categoryKey, slotIndex, event) => {
    const file = event.target.files[0];
    if (!file) return;


    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please upload image files only (JPEG/PNG/...).");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await http.post("fepks/uploadFile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const key = response.data.key;

      setAlbums((prev) => {
        const updatedCategory = [...prev[categoryKey]];
        updatedCategory[slotIndex] = { image: key, blur: false };

        const nextAlbums = {
          ...prev,
          [categoryKey]: updatedCategory,
        };


        savePhotoAlbums(nextAlbums);
        return nextAlbums;
      });
    } catch (err) {
      console.error(err);
      setErrorMessage("Error while uploading image.");
    } finally {

      event.target.value = "";
    }
  };



  const handleDeleteSlot = (categoryKey, slotIndex) => {
    setAlbums((prev) => {
      const updatedCategory = [...prev[categoryKey]];
      updatedCategory[slotIndex] = null;

      const nextAlbums = {
        ...prev,
        [categoryKey]: updatedCategory,
      };

      savePhotoAlbums(nextAlbums);
      return nextAlbums;
    });
  };


  // const handleToggleBlur = (categoryKey, slotIndex) => {
  //   setAlbums((prev) => {
  //     const updatedCategory = [...prev[categoryKey]];
  //     const item = updatedCategory[slotIndex];
  //     if (!item) return prev;

  //     updatedCategory[slotIndex] = { ...item, blur: !item.blur };

  //     const nextAlbums = {
  //       ...prev,
  //       [categoryKey]: updatedCategory,
  //     };

  //     savePhotoAlbums(nextAlbums);
  //     return nextAlbums;
  //   });
  // };

  const closeModal = () => setModalIsOpen(false);



  return (
    <div className="tw-w-full tw-space-y-6 tw-pb-12 tw-mt-10 ">


      {errorMessage && (
        <div className="tw-text-center tw-text-sm tw-text-red-500">
          {errorMessage}
        </div>
      )}


      <div className="tw-flex tw-flex-col tw-gap-6 md:tw-gap-2 lg:tw-gap-4 md:tw-flex-row tw-rounded-lg   tw-mt-20 tw-p-[2px]">
        {CATEGORY_CONFIG.map(({ key, label }) => (
          <div
            key={key}
            className=" tw-rounded-2xl  tw-p-1 md:tw-p-2 tw-w-full md:tw-w-1/4 "
          >

            <div className="tw-mb-3">
              <h3 className="tw-text-lg lg:tw-text-xl tw-font-bold   tw-text-center "
                style={{
                  background: "linear-gradient(to right, #FF00A0, #1E0039)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {label}
              </h3>
            </div>


            <div className="tw-bg-gradient-to-r tw-from-[#FF00A0] tw-to-[#1E0039] tw-p-[1.5px] tw-rounded-[17.2px] tw-overflow-hidden tw-shadow-multiSoft ">
              <div className="tw-grid tw-grid-cols-5 md:tw-grid-cols-2 tw-gap-2 tw-bg-[#ECF0F1] tw-rounded-[15px]">
                {Array.from({ length: SLOTS_PER_CATEGORY }).map((_, index) => {
                  const item = albums[key]?.[index];

                  return (
                    <div className="tw-w-full tw-h-full tw-p-2">
                      <div
                        key={index}
                        className="tw-relative tw-w-full tw-aspect-[3/4]  tw-shadow-multiSoft tw-rounded-[15px]  tw-bg-[#ECF0F1]"
                      >

                        <input
                          id={`${key}-${index}`}
                          type="file"
                          accept="image/*"
                          className="tw-hidden"
                          onChange={(e) => handleSlotFileChange(key, index, e)}
                        />


                        <button
                          type="button"
                          onClick={() =>
                            document.getElementById(`${key}-${index}`).click()
                          }
                          className="tw-w-full tw-h-full tw-rounded-xl  tw-bg-[#ECF0F1]  tw-flex tw-items-center tw-justify-center tw-overflow-hidden hover:tw-bg-gray-100 tw-transition"
                        >
                          {item && item.image ? (
                            <img
                              src={`${process.env.REACT_APP_AWS_URL}/${item.image}`}
                              alt=""
                              className={`tw-w-full tw-h-full tw-object-cover ${item.blur ? "tw-blur-sm" : ""
                                }`}
                            />
                          ) : (
                            <div className="tw-flex tw-items-center tw-justify-center tw-text-gray-400">

                              <svg width="109" height="74" viewBox="0 0 109 74" fill="none" className="tw-w-1/2"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.16667 0C2.77166 0 0 2.77167 0 6.16667V60.4333C0 63.8283 2.77166 66.6 6.16667 66.6H75.2719C78.6509 71.0809 84.0003 74 90.0333 74C100.236 74 108.533 65.7026 108.533 55.5C108.533 49.4669 105.614 44.1176 101.133 40.7385V6.16667C101.133 2.77167 98.3617 0 94.9667 0H6.16667ZM6.16667 2.46667H94.9667C97.0378 2.46667 98.6667 4.09553 98.6667 6.16667V39.1583C96.089 37.7937 93.148 37 90.0333 37C88.9304 37 87.8462 37.1221 86.7958 37.3083L78.5094 29.9083C78.3069 29.7255 78.0496 29.615 77.7776 29.594C77.5056 29.573 77.2344 29.6428 77.0063 29.7924L58.0438 42.8196L34.1094 22.4696C33.9675 22.349 33.8002 22.2621 33.62 22.2154C33.4398 22.1687 33.2513 22.1635 33.0688 22.2C32.8729 22.2325 32.6878 22.3119 32.5292 22.4312L2.46667 45.5563V6.16667C2.46667 4.09553 4.09552 2.46667 6.16667 2.46667ZM59.2 9.86667C55.1277 9.86667 51.8 13.1943 51.8 17.2667C51.8 21.339 55.1277 24.6667 59.2 24.6667C63.2723 24.6667 66.6 21.339 66.6 17.2667C66.6 13.1943 63.2723 9.86667 59.2 9.86667ZM59.2 12.3333C61.9392 12.3333 64.1333 14.5274 64.1333 17.2667C64.1333 20.0059 61.9392 22.2 59.2 22.2C56.4608 22.2 54.2667 20.0059 54.2667 17.2667C54.2667 14.5274 56.4608 12.3333 59.2 12.3333ZM33.2615 25.0135L57.1573 45.325C57.3643 45.5018 57.624 45.6053 57.8958 45.6191C58.1677 45.6329 58.4366 45.5564 58.6604 45.4015L77.5844 32.3743L83.9823 38.0401C76.7392 40.5502 71.5333 47.4128 71.5333 55.5C71.5333 58.6147 72.327 61.5557 73.6917 64.1333H6.16667C4.09552 64.1333 2.46667 62.5045 2.46667 60.4333V48.7167L33.2615 25.0135ZM90.0333 39.4667C98.903 39.4667 106.067 46.6305 106.067 55.5C106.067 64.3695 98.903 71.5333 90.0333 71.5333C81.1637 71.5333 74 64.3695 74 55.5C74 46.6305 81.1637 39.4667 90.0333 39.4667ZM90.0333 45.6333C89.7047 45.6333 89.4065 45.7705 89.1854 45.9801C87.1274 48.0259 85.0462 50.0935 82.9802 52.1468C82.5398 52.6284 82.4986 53.438 82.9802 53.9199C83.4619 54.4014 84.2715 54.4014 84.7531 53.9199L88.8 49.8343V64.1333C88.8 64.8145 89.3522 65.3667 90.0333 65.3667C90.7145 65.3667 91.2667 64.8145 91.2667 64.1333V49.8343L95.3136 53.9199C95.7663 54.3772 96.6048 54.4014 97.0865 53.9199C97.5681 53.438 97.5343 52.614 97.0865 52.1468C95.026 50.0987 92.9198 48.0075 90.8813 45.9801C90.6602 45.7705 90.362 45.6333 90.0333 45.6333Z" fill="black" />
                              </svg>
                            </div>
                          )}
                        </button>


                        {item && item.image && (
                          <div className="tw-absolute tw-top-1.5 tw-right-1.5 tw-flex tw-gap-1">
                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => handleDeleteSlot(key, index)}
                              className="tw-bg-gray-200 tw-rounded-full tw-w-4 tw-h-4 tw-flex tw-items-center tw-justify-center tw-text-xs tw-shadow-md hover:tw-bg-red-50 hover:tw-text-red-500 tw-transition"
                            >
                              ✕
                            </button>
                            {/* Blur */}
                            {/* <button
                              type="button"
                              onClick={() => handleToggleBlur(key, index)}
                              className="tw-bg-gray-200 tw-rounded-full tw-px-2 tw-h-6 tw-flex tw-items-center tw-justify-center tw-text-[0.6rem] tw-shadow-md hover:tw-bg-purple-50 tw-transition"
                            >
                              {item.blur ? "Unblur" : "Blur"}
                            </button> */}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="tw-flex tw-justify-center tw-mt-2">
        <button
          type="button"
          onClick={() => setModalIsOpen(true)}
          className="tw-cursor-default tw-mt-5 tw-text-md tw-bg-gradient-to-r tw-from-[#FF00A0] tw-to-[#1E0039] tw-text-white tw-px-12 md:tw-px-16 tw-py-2 tw-rounded-[40px]"
        >
          {isSaving ? "Saving..." : t("Save")}
        </button>
      </div>


      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Save Confirmation"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            inset: "50% auto auto 50%",
            transform: "translate(-50%, -50%)",
            border: "none",
            padding: 0,
            background: "transparent",
          },
        }}
      >
        <div className="tw-bg-white tw-rounded-xl tw-shadow-lg tw-p-6 tw-min-w-[260px] tw-text-center">
          <div className="tw-text-black tw-font-semibold tw-mb-2">
            {t("Photo Albums saved successfully!")}
          </div>
          <button
            onClick={closeModal}
            className="tw-mt-2 tw-px-4 tw-py-1.5 tw-rounded-lg tw-bg-[#712CB0] tw-text-white tw-text-sm hover:tw-bg-[#5b2290] tw-transition"
          >
            {t("Ok")}
          </button>
        </div>
      </Modal>
    </div >
  );
}

export default StillsForm;
