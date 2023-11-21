import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditCompanyProfile from "../../../components/forms/EditCompanyProfile";
import PendingApplication from "../../../components/cards/PendingApplication";
import Search from "../../../components/search";

const CompanyEditProfile = () => {
  const profileData = useSelector(
    (state) => state.companyUserSlice.companyProfile,
  );
  const jobs = useSelector((state) => state.companyUserSlice.jobPost);
  const [searchTerm, setSearchTerm] = useState("");

  const pending_jobs = Object.values(jobs).filter((job) => !job.status);
  const filteredPendingJobs = Object.values(pending_jobs)
    .filter((job) => !job.status && job.isActive)
    .filter(
      (job) =>
        job.position &&
        job.position.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto flex flex-col sm:flex-row py-4 gap-2">
        <div className="flex flex-col sm:w-[60%]">
          <EditCompanyProfile profileData={profileData} />
        </div>
        <div className="sm:w-[40%]">
          <Search onChange={(e) => setSearchTerm(e.target.value)} />

          <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
            <h1 className="font-bold text-[15px] uppercase ">
              List of Pending Job Post
            </h1>
            <p className="text-slate-500 text-[12px]">All your placement</p>
            {filteredPendingJobs === 0 ? (
              <p className="mx-4 sm:mx-2">No pending jobs available</p>
            ) : (
              <div
                className="flex flex-col text-[12px] space-y-2"
                style={{ maxHeight: "500px", overflowY: "auto" }}
              >
                {filteredPendingJobs.map((job, index) => (
                  <div
                    key={index}
                    className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg"
                  >
                    <PendingApplication data={job} user={profileData} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyEditProfile;
