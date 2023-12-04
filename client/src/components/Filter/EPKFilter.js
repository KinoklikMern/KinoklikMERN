import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const EPKFilter = (initialData, filterTags, setFilterTags) => {
  const [filteredEPKs, setFilteredEPKs] = useState(initialData);
  const [filterQuery, setFilterQuery] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("All");
  const { t } = useTranslation();

  useEffect(() => {
    let filtered = initialData;

    // Filter by status if not 'All'
    if (currentStatus !== "All") {
      filtered = filtered.filter((fepk) => fepk.status === currentStatus);
    }

    // Filter by tags if filterQuery is not empty
    if (filterQuery.length > 0) {
      filtered = filtered.filter((fepk) =>
        filterQuery.includes(fepk.production_type)
      );
    }

    setFilteredEPKs(filtered);
  }, [initialData, currentStatus, filterQuery]);

  const handleStatusChange = (status) => {
    if (currentStatus === status) {
      setCurrentStatus("All");
      setFilteredEPKs(initialData);
    } else {
      setCurrentStatus(status);
      const filtered = initialData.filter((fepk) => fepk.status === status);
      setFilteredEPKs(filtered);
    }
  };

  const clickHandler = (name, isActive) => {
    let newTags;
    let newQuery;

    if (name === (t("all epks"))) {
      newTags = filterTags.map((tag) => ({
        ...tag,
        isActive: tag.name === name,
      }));
      newQuery = isActive
        ? []
        : [(t("Movie")), "TV Show", "Web Series", "Documentary"];
    } else {
      newTags = filterTags.map((tag) =>
        tag.name === name ? { ...tag, isActive: !isActive } : tag
      );

      if (isActive) {
        newQuery = filterQuery.filter((item) => item !== name);
      } else {
        if (filterQuery.length === 4) {
          newQuery = [name];
        } else {
          newQuery = [...filterQuery, name];
        }
      }

      if (!isActive) {
        newTags[4].isActive = false; // set "all epks" to inactive
      }

      if (
        newQuery.length ===
        newTags.filter((tag) => tag.name !== "all epks").length
      ) {
        newTags = newTags.map((tag) =>
          tag.name === "all epks" ? { ...tag, isActive: true } : tag
        );
        newQuery = ["Movie", "TV Show", "Web Series", "Documentary"];
      }

      if (
        newTags.filter((tag) => tag.name !== "all epks" && !tag.isActive)
          .length === 4
      ) {
        newTags = newTags.map((tag) =>
          tag.name === "all epks" ? { ...tag, isActive: true } : tag
        );
      }

      if (
        newTags.filter((tag) => tag.name !== "all epks" && tag.isActive)
          .length !== 0
      ) {
        newTags = newTags.map((tag) =>
          tag.name === "all epks" ? { ...tag, isActive: false } : tag
        );
      }
    }

    setFilterTags(newTags);
    setFilterQuery(newQuery);
  };

  return {
    filteredEPKs,
    filterQuery,
    currentStatus,
    setFilterQuery,
    handleStatusChange,
    clickHandler,
  };
};

export default EPKFilter;