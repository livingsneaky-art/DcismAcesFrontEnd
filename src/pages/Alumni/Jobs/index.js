import React, { useEffect, useState } from "react";
import Search from "../../../components/search";
import AlumniUser from "../../../components/userCard/alumniCard";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllAppliedJobs,
  GetAllJobs,
  GetAlumniProfile,
} from "../../../services/alumni";
import JobContent from "../../../components/cards/JobContent";
import { useNavigate } from "react-router-dom";

const JobList = () => {
  const jobs = useSelector((state) => state.alumniUserSlice.jobList);
  const userData = useSelector((state) => state.alumniUserSlice.alumniProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const jobsPerPage = 4;
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingAppliedJobs, setLoadingAppliedJobs] = useState(true);
  const [appliedJobsLoaded, setAppliedJobsLoaded] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await GetAlumniProfile(dispatch);
        await GetAllJobs(dispatch);
        const appliedJobsLoaded = await GetAllAppliedJobs(dispatch);
        setAppliedJobsLoaded(appliedJobsLoaded);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingAppliedJobs(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (jobs.length > 0) {
      const activeJobs = jobs.filter((job) => job.status && job.isActive);
      const filteredResults = activeJobs.filter((job) =>
        job.position.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredJobs(filteredResults);
      const totalPagesCount = Math.ceil(filteredResults.length / jobsPerPage);
      setTotalPages(totalPagesCount);
    }
  }, [jobs, searchTerm, jobsPerPage]); // Added jobs to the dependencies

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto flex flex-col sm:flex-row py-4 gap-2">
        <div className="flex flex-col sm:w-[25%] gap-2">
          <Search onChange={(e) => setSearchTerm(e.target.value)} />
          {userData && <AlumniUser user={userData} />}
        </div>

        <div className="sm:w-[50%] space-y-2">
          <div className="space-y-2">
            {filteredJobs.length === 0 ? (
              <p className="mx-4 sm:mx-2">No jobs available</p>
            ) : (
              <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
                <div className="flex justify-between">
                  <span>
                    <h1 className="font-bold text-[15px] uppercase ">
                      LIST OF ACTIVE JOB POST
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
              <div className="pagination flex items-center gap-3 ml-5">
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
            <h1 className="font-bold text-[15px] uppercase">
              List of Applied Jobs
            </h1>
            <p className="text-slate-500 text-[12px]">All your placements</p>
            {loadingAppliedJobs ? (
              <p>Loading applied jobs...</p>
            ) : appliedJobsLoaded.length ? (
              <div
                className="flex flex-col text-[12px] space-y-2"
                style={{ maxHeight: "500px", overflowY: "auto" }}
              >
                {appliedJobsLoaded.map((appliedJob, index) => (
                  <div
                    key={index}
                    className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg"
                  >
                    <div className="flex flex-col">
                      <h1 className="flex font-bold">
                        {appliedJob.job.position}
                      </h1>
                      <Content
                        title="Location"
                        desc={appliedJob.job.location}
                      />
                      <Content
                        title="Years of Exp"
                        desc={appliedJob.job.yearsOfExp}
                      />
                      <Content title="Salary" desc={appliedJob.job.salary} />
                      <div className="flex flex-col">
                        <Content title="Slots" desc={appliedJob.job.slots} />
                        <p
                          className="flex justify-end text-[#0098FF] cursor-pointer"
                          onClick={() =>
                            navigate(`/alumni/apply/job/${appliedJob.job.id}`)
                          }
                        >
                          View Details
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mx-4 sm:mx-2">No applied jobs available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobList;

const Content = ({ title = "", desc = "" }) => {
  return (
    <div className="flex justify-between">
      <p>{title}</p>
      <p className="font-bold ">{desc}</p>
    </div>
  );
};
