import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import {
  validatename,
  validateWebsite,
  validateEmail,
  validatePhone,
  validatelocation,
} from "./validation";

export default function Studio({ isActor = false }) {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const userId = user?.id || "0";

  const [formData, setFormData] = useState({
    name: "", website: "", email: "", phone: "", city: "", province: "", country: ""
  });
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [hasAgent, setHasAgent] = useState(true);

  useEffect(() => {
    if (userId === "0") return;
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/company/getCompanyByUser/${userId}`)
      .then((res) => {
        if (res.data) {
          setFormData(res.data);
          if (res.data.hasAgent !== undefined) setHasAgent(res.data.hasAgent);
        }
      })
      .catch((err) => console.error("Fetch Error:", err));
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    // Comprehensive Validation Switch
    switch (name) {
      case "name":
        error = validatename(value) ? "" : t("Name is required");
        break;
      case "website":
        // Only validate if there is actually text in the box
        error = value && !validateWebsite(value) ? t("Invalid URL (include http/https)") : "";
        break;
      case "email":
        error = validateEmail(value) ? "" : t("Invalid Email Address");
        break;
      case "phone":
        error = value && !validatePhone(value) ? t("Invalid Phone (10-15 digits)") : "";
        break;
      case "city":
      case "province":
      case "country":
        error = validatelocation(value) ? "" : t("Required field");
        break;
      default:
        break;
    }

    const newErrors = { ...errors, [name]: error };
    setErrors(newErrors);
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Check if any errors exist across the whole form
    const hasAnyErrors = Object.values(newErrors).some((errText) => errText !== "");
    setDisabled(hasAnyErrors);
  };

  const saveDetails = () => {
    // Final check for required fields if an agent/studio is active
    if (hasAgent || !isActor) {
      if (!formData.name || !formData.email) {
        toast.error(t("Please fill in required fields"));
        return;
      }
    }

    const payload = isActor ? { ...formData, hasAgent } : formData;

    Axios.put(`${process.env.REACT_APP_BACKEND_URL}/company/updateCompanyByUser/${userId}`, payload)
      .then(() => {
        toast.success(isActor ? t("Representation updated!") : t("Studio updated!"));
        setDisabled(true);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || t("Update failed"));
      });
  };

  return (
    <div className='tw-h-full tw-py-4 lg:tw-px-24'>
      {isActor && (
        <div className='tw-mb-6 tw-flex tw-items-center tw-justify-center'>
          <p className='tw-mb-0 tw-mr-4 tw-font-bold tw-text-[#1E0039]'>{t("Do you have an Agent?")}</p>
          <button 
            onClick={() => { setHasAgent(true); setDisabled(false); }} 
            className={`tw-mx-2 tw-px-4 tw-py-1 tw-rounded-lg tw-transition ${hasAgent ? "tw-bg-[#1E0039] tw-text-white shadow-md" : "tw-bg-gray-200 tw-text-gray-600"}`}
          >
            {t("Yes")}
          </button>
          <button 
            onClick={() => { setHasAgent(false); setDisabled(false); }} 
            className={`tw-mx-2 tw-px-4 tw-py-1 tw-rounded-lg tw-transition ${!hasAgent ? "tw-bg-[#1E0039] tw-text-white shadow-md" : "tw-bg-gray-200 tw-text-gray-600"}`}
          >
            {t("No")}
          </button>
        </div>
      )}

      {(hasAgent || !isActor) && (
        <div className="tw-grid tw-grid-cols-1 tw-gap-4">
          {[
            { id: "name", label: isActor ? "Agent Name" : "Studio Name", required: true },
            { id: "website", label: isActor ? "Agent Website" : "Studio Website" },
            { id: "email", label: isActor ? "Agent Email" : "Studio Email", required: true },
            { id: "phone", label: "Phone" },
            { id: "city", label: "City", required: true },
            { id: "province", label: "Province", required: true },
            { id: "country", label: "Country", required: true }
          ].map((f) => (
            <div key={f.id} className="tw-flex tw-flex-col">
              <input
                name={f.id}
                placeholder={t(f.label) + (f.required ? " *" : "")}
                value={formData[f.id] || ""}
                onChange={handleInputChange}
                className={`tw-h-11 tw-w-full tw-rounded-lg tw-border-2 tw-px-4 tw-text-[#1E0039] tw-transition-colors ${errors[f.id] ? "tw-border-red-500" : "tw-border-gray-200 focus:tw-border-[#1E0039]"}`}
              />
              {errors[f.id] && <span className="tw-text-xs tw-text-red-500 tw-mt-1 tw-ml-2">{errors[f.id]}</span>}
            </div>
          ))}
        </div>
      )}

      <div className='tw-text-end tw-mt-8'>
        <button 
          disabled={disabled} 
          onClick={saveDetails} 
          className='tw-rounded-full tw-px-12 tw-py-2 tw-bg-[#1E0039] tw-text-white tw-font-bold tw-transition-all active:tw-scale-95 disabled:tw-bg-gray-200 disabled:tw-text-gray-400 disabled:tw-cursor-not-allowed'
        >
          {t("Save Changes")}
        </button>
      </div>
    </div>
  );
}