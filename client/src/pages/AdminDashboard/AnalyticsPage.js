import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/Dashboard/Sidebar";
import TopToolBar from "../../components/AdminDashboard/TopToolBar";
import http from "../../http-common";
import Cookies from "js-cookie";

const StatCard = ({ label, value, sub }) => (
  <div className="tw-flex tw-flex-col tw-gap-1 tw-rounded-xl tw-bg-[#280D41] tw-border tw-border-white/10 tw-p-4">
    <span className="tw-text-xs tw-text-white/50 tw-uppercase tw-tracking-wide">{label}</span>
    <span className="tw-text-3xl tw-font-bold tw-text-white">{value ?? 0}</span>
    {sub && <span className="tw-text-xs tw-text-white/40">{sub}</span>}
  </div>
);

const TableCard = ({ title, rows }) => (
  <div className="tw-rounded-xl tw-bg-[#280D41] tw-border tw-border-white/10 tw-overflow-hidden">
    <div className="tw-px-4 tw-py-3 tw-border-b tw-border-white/10">
      <h3 className="tw-text-sm tw-font-semibold tw-text-white">{title}</h3>
    </div>
    <div className="tw-divide-y tw-divide-white/5">
      {rows.length === 0 && (
        <p className="tw-text-center tw-text-white/30 tw-text-sm tw-py-6">No data yet</p>
      )}
      {rows.map((row, i) => (
        <div key={i} className="tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-3 hover:tw-bg-white/5 tw-transition-colors">
          <div className="tw-flex tw-items-center tw-gap-3 tw-min-w-0">
            <span className="tw-text-white/30 tw-text-xs tw-w-4 tw-shrink-0">#{i + 1}</span>
            <div className="tw-min-w-0">
              <p className="tw-text-sm tw-text-white tw-truncate">{row.name}</p>
              {row.sub && <p className="tw-text-xs tw-text-white/40">{row.sub}</p>}
            </div>
          </div>
          <div className="tw-flex tw-items-center tw-gap-3 tw-shrink-0">
            {row.badges.map((b, j) => (
              <span key={j} className="tw-text-xs tw-text-white/60 tw-whitespace-nowrap">{b}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RoleBar = ({ role, count, max }) => (
  <div className="tw-flex tw-items-center tw-gap-3">
    <span className="tw-text-xs tw-text-white/60 tw-w-28 tw-truncate tw-shrink-0">{role}</span>
    <div className="tw-flex-1 tw-h-2 tw-rounded-full tw-bg-white/10 tw-overflow-hidden">
      <div
        className="tw-h-full tw-rounded-full tw-bg-[#712CB0]"
        style={{ width: `${Math.round((count / max) * 100)}%` }}
      />
    </div>
    <span className="tw-text-xs tw-text-white tw-w-6 tw-text-right tw-shrink-0">{count}</span>
  </div>
);

export default function AnalyticsPage() {
  const user = useSelector((state) => state.user);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = JSON.parse(Cookies.get("user") || "null")?.token;
    http
      .get("/analytics/admin-summary", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setData(res.data))
      .catch(() => setError("Failed to load analytics."))
      .finally(() => setLoading(false));
  }, []);

  const topEpkRows = (data?.topEPKs || []).map((e) => ({
    name: e.title || "Untitled",
    sub: e.status || "",
    badges: [`${e.viewCount ?? 0} views`, `${e.likes?.length ?? 0} likes`, `${e.favourites?.length ?? 0} saved`],
  }));

  const topProfileRows = (data?.topProfiles || []).map((u) => ({
    name: `${u.firstName} ${u.lastName}`,
    sub: u.role,
    badges: [`${u.profileViews ?? 0} views`, `${u.likes?.length ?? 0} likes`, `${u.followers?.length ?? 0} followers`],
  }));

  const roleBreakdown = data?.roleBreakdown || [];
  const maxRoleCount = roleBreakdown.reduce((m, r) => Math.max(m, r.count), 1);

  return (
    <div className="tw-flex tw-h-[calc(100vh-5rem)] tw-overflow-hidden tw-bg-[#1E0039]">
      <div className="tw-flex tw-flex-1 tw-overflow-hidden tw-pt-3 tw-pb-4 tw-px-3">
        <Sidebar role={user.role} />
        <main className="tw-flex-1 tw-overflow-auto tw-p-6">
          <TopToolBar selectedTab="Analytics" role={user.role} />

          {loading && (
            <p className="tw-text-white/40 tw-text-sm tw-text-center tw-mt-16">Loading analytics...</p>
          )}

          {error && (
            <p className="tw-text-red-400 tw-text-sm tw-text-center tw-mt-16">{error}</p>
          )}

          {data && (
            <div className="tw-flex tw-flex-col tw-gap-6">
              {/* Stat cards */}
              <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-4">
                <StatCard label="EPK Views" value={data.epkStats.totalViews} sub="all time" />
                <StatCard label="Profile Views" value={data.userStats.totalProfileViews} sub="all time" />
                <StatCard label="EPK Likes" value={data.epkStats.totalLikes} />
                <StatCard label="EPKs Saved" value={data.epkStats.totalFavourites} />
              </div>

              {/* Tables */}
              <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4">
                <TableCard title="Top EPKs by Views" rows={topEpkRows} />
                <TableCard title="Top Profiles by Views" rows={topProfileRows} />
              </div>

              {/* Role breakdown */}
              <div className="tw-rounded-xl tw-bg-[#280D41] tw-border tw-border-white/10 tw-p-4">
                <h3 className="tw-text-sm tw-font-semibold tw-text-white tw-mb-4">Users by Role</h3>
                <div className="tw-flex tw-flex-col tw-gap-3">
                  {roleBreakdown.map((r, i) => (
                    <RoleBar key={i} role={r._id} count={r.count} max={maxRoleCount} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
