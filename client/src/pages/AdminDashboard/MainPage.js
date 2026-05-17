import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/Dashboard/Sidebar";
import TopToolBar from "../../components/AdminDashboard/TopToolBar";
import { useTranslation } from "react-i18next";
import http from "../../http-common";

const StatCard = ({ label, value, large = false }) => (
  <div className="tw-flex tw-flex-col tw-gap-1 tw-rounded-xl tw-bg-[#280D41] tw-border tw-border-white/10 tw-p-4">
    <span className="tw-text-xs tw-text-white/50 tw-uppercase tw-tracking-wide">{label}</span>
    <span className={`tw-font-bold tw-text-white ${large ? "tw-text-4xl" : "tw-text-3xl"}`}>
      {value ?? <span className="tw-text-white/30 tw-text-base">Loading...</span>}
    </span>
  </div>
);

const MetricGroup = ({ title, metrics }) => (
  <div className="tw-rounded-xl tw-bg-[#280D41] tw-border tw-border-white/10 tw-overflow-hidden">
    <div className="tw-px-4 tw-py-3 tw-border-b tw-border-white/10">
      <h3 className="tw-text-sm tw-font-semibold tw-text-white">{title}</h3>
    </div>
    <div className="tw-grid tw-grid-cols-3 tw-divide-x tw-divide-white/10">
      {metrics.map((m, i) => (
        <div key={i} className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1 tw-py-6 tw-px-4">
          <span className="tw-text-2xl tw-font-bold tw-text-white">{m.value ?? 0}</span>
          <span className="tw-text-xs tw-text-white/50 tw-text-center">{m.label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function MainPage() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState(null);
  const [epkInfo, setEpkInfo] = useState(null);

  useEffect(() => {
    Promise.all([http.get("/fepks/"), http.get("/users/getallusers")])
      .then(([fepkRes, usersRes]) => {
        setUserInfo(usersRes.data);
        setEpkInfo(fepkRes.data);
      })
      .catch((err) => console.error("Failed to fetch metrics:", err));
  }, []);

  const actors = userInfo?.filter((u) => u.role === "Actor") ?? [];

  const epkMetrics = [
    { label: t("Likes"), value: epkInfo?.reduce((s, e) => s + e.likes.length, 0) },
    { label: t("Saved"), value: epkInfo?.reduce((s, e) => s + e.favourites.length, 0) },
    { label: t("Wish to Buy"), value: epkInfo?.reduce((s, e) => s + e.wishes_to_buy.length, 0) },
  ];

  const actorMetrics = [
    { label: t("Likes"), value: actors.reduce((s, u) => s + u.likes.length, 0) },
    { label: t("Followers"), value: actors.reduce((s, u) => s + u.followers.length, 0) },
    { label: t("Recommendations"), value: actors.reduce((s, u) => s + u.recommendations, 0) },
  ];

  return (
    <div className="tw-flex tw-h-[calc(100vh-5rem)] tw-overflow-hidden tw-bg-[#1E0039]">
      <div className="tw-flex tw-flex-1 tw-overflow-hidden tw-pt-3 tw-pb-4 tw-px-3">
        <Sidebar role={user.role} />
        <main className="tw-flex-1 tw-overflow-auto tw-p-6">
          <TopToolBar selectedTab="Main Metrics" role={user.role} />

          <div className="tw-flex tw-flex-col tw-gap-6 tw-mt-2">
            {/* Top-level counts */}
            <div className="tw-grid tw-grid-cols-2 tw-gap-4">
              <StatCard label={t("Total Users")} value={userInfo?.length} large />
              <StatCard label={t("Total EPKs")} value={epkInfo?.length} large />
            </div>

            {/* Engagement breakdown */}
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4">
              <MetricGroup title={t("EPK Engagement")} metrics={epkMetrics} />
              <MetricGroup title={t("Actor Engagement")} metrics={actorMetrics} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
