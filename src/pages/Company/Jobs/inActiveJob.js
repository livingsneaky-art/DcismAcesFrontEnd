import React, { useEffect, useState } from "react";
import Search from "../../../components/search";
import CompanyUser from "../../../components/userCard/companyCard";
import { useDispatch, useSelector } from "react-redux";
import { GetAllJobs, GetCompanyProfile } from "../../../services/company";
import PendingApplication from "../../../components/cards/PendingApplication";
import JobContent from "../../../components/cards/JobContent";

const CompanyInactiveJobs = () => {
  const jobs = useSelector((state) => state.companyUserSlice.jobPost);
  const userData = useSelector(
    (state) => state.companyUserSlice.companyProfile,
  );

  const dispatch = useDispatch();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const jobsPerPage = 4;

  useEffect(() => {
    GetCompanyProfile(dispatch);
    GetAllJobs(dispatch);
  }, [dispatch]);

  const inactiveJobs = Object.values(jobs).filter(
    (job) => job.status && !job.isActive,
  );
  const pending_jobs = Object.values(jobs).filter((job) => !job.status);

  useEffect(() => {
    if (inactiveJobs.length > 0) {
      const filteredResults = inactiveJobs.filter((job) =>
        job.position.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredJobs(filteredResults);
      const totalPagesCount = Math.ceil(filteredResults.length / jobsPerPage);
      setTotalPages(totalPagesCount);
    }
  }, [inactiveJobs, searchTerm, jobsPerPage]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto flex flex-col sm:flex-row py-4 gap-2">
        <div className="flex flex-col sm:w-[25%] gap-2">
          <Search onChange={(e) => setSearchTerm(e.target.value)} />
          {userData && <CompanyUser user={userData} />}
        </div>
        <div className="sm:w-[50%] space-y-2">
          <div className="space-y-2">
            {filteredJobs.length === 0 ? (
              <p className="mx-4 sm:mx-2">No inactive jobs available</p>
            ) : (
              <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
                <div className="flex justify-between">
                  <span>
                    <h1 className="font-bold text-[15px] uppercase ">
                      ENDED JOB POST
                    </h1>
                    <p className="text-slate-500 text-[12px]">
                      All your job placements
                    </p>
                  </span>
                </div>
                {currentJobs.map((job, index) => (
                  <div
                    key={index}
                    className="flex flex-col text-[12px] space-y-2"
                  >
                    <JobContent data={job} user={userData} />
                  </div>
                ))}
              </div>
            )}
            {filteredJobs.length > 0 && (
              <div className="pagination flex items-center gap-3">
                <label>Page Number: </label>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`${
                        currentPage === number
                          ? "bg-[#221769] text-white"
                          : "bg-gray-300 text-gray-700"
                      } font-semibold px-3 py-1 rounded-full mx-1`}
                    >
                      {number}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:w-[25%] gap-2">
          <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
            <h1 className="font-bold text-[15px] uppercase ">
              List of Pending Job Post
            </h1>
            <p className="text-slate-500 text-[12px]">All your placement</p>
            {pending_jobs.length === 0 ? (
              <p className="mx-4 sm:mx-2">No pending jobs available</p>
            ) : (
              <div
                className="flex flex-col text-[12px] space-y-2"
                style={{ maxHeight: "680px", overflowY: "auto" }}
              >
                {pending_jobs.map((job, index) => (
                  <div
                    key={index}
                    className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg"
                  >
                    <PendingApplication data={job} user={userData} />
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

export default CompanyInactiveJobs;
