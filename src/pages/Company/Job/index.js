import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import placeholder from "../../../assets/placeholder.png";
import {
  CloseJobPost,
  DeleteJob,
  GetAllJobs,
  GetJob,
} from "../../../services/company";
import { getJobError } from "../../../app/companyUserSlice";
import { formatDate } from "../../../components/constant/helper";
import ConfirmationDialog from "../../../components/popup/confirmationDialog";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Block,
  Delete,
  Diversity3,
  Edit,
  FirstPage,
  Recommend,
} from "@mui/icons-material";

export default function ViewJobCompany() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [deleteOccurred, setDeleteOccurred] = useState(false);

  useEffect(() => {
    const fetchJobPosting = async () => {
      try {
        if (id) {
          const jobData = await GetJob(dispatch, id);
          if (jobData) {
            setJobData(jobData);
          }
        }
      } catch (error) {
        dispatch(getJobError());
        console.error("Error:", error);
      }
    };

    fetchJobPosting();
  }, [id, dispatch]);

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await DeleteJob(dispatch, id);
      toast.success("Sucessfully deleted the job post.");
      setDeleteOccurred(true);
    } catch (error) {
      console.error("Error deleting job:", error);
    }
    setOpenDeletePopup(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (deleteOccurred) {
        await GetAllJobs(dispatch);
        setDeleteOccurred(false);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        navigate("/company/jobs");
      }
    };
    fetchData();
  }, [deleteOccurred, dispatch, navigate]);

  if (!jobData) {
    return <p>Loading...</p>;
  }

  const handlCloseJobPost = async (id) => {
    try {
      const credentials = {
        id: id,
        isActive: false,
      };
      console.log(credentials);
      await CloseJobPost(dispatch, credentials);
      await GetAllJobs(dispatch);
      toast.success("Close the Job Application successfully");
      await new Promise((resolve) => setTimeout(resolve, 3000));
      navigate("/company/inactive/jobs");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen flex items-start justify-center mt-2">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="container mx-auto">
        <div className="bg-white border border-slate-200 p-4 md:p-6 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row items-center md:items-start mb-4">
            <div className="flex-shrink-0 w-16 h-16 md:w-12 md:h-12 mb-4 md:mb-0">
              {jobData.company && (
                <img
                  src={
                    jobData.company.profileImage
                      ? `data:image/jpeg;base64,${jobData.company.profileImage}`
                      : placeholder
                  }
                  alt="Profile"
                  className="w-full h-full rounded-full border border-slate-300"
                />
              )}
            </div>
            <div className="ml-0 md:ml-4 text-center md:text-left">
              <h1 className="text-lg md:text-2xl font-bold mb-2">
                {jobData.position}
              </h1>
              <p className="text-xs md:text-sm text-slate-500 mb-2">
                Posted By:{" "}
                <span className="font-bold">
                  {jobData.company.firstName} {jobData.company.lastName}
                </span>{" "}
                on {formatDate(jobData.posted_Date)}
              </p>

              <p className="text-xs md:text-sm text-slate-500">
                Job Location:{" "}
                <span className="font-bold">{jobData.location} </span>
              </p>
              <p className="text-xs md:text-sm text-slate-500">
                Slots: <span className="font-bold">{jobData.slots} </span>
              </p>
              <p className="text-xs md:text-sm text-slate-500">
                Years of Experience:{" "}
                <span className="font-bold">{jobData.yearsOfExp} </span>
              </p>
              <p className="text-xs md:text-sm text-slate-500">
                Skills Required:{" "}
                <span className="font-bold">
                  {jobData?.targetSkills
                    ?.map((skill) => skill.skill)
                    .join(", ")}
                </span>
              </p>
              <p className="text-xs md:text-sm text-slate-500 mb-4">
                Application End:{" "}
                <span className="font-bold">
                  {" "}
                  {formatDate(jobData.expiration_Date)}{" "}
                </span>
              </p>

              <p className="text-xs md:text-sm text-slate-500">
                Job Description:
                <span
                  className="richTextContainer"
                  dangerouslySetInnerHTML={{ __html: jobData.description }}
                />
              </p>

              {jobData.company.companyName &&
                jobData.company.companyAddress &&
                jobData.company.mobileNumber &&
                jobData.company.email && (
                  <p className="text-xs md:text-sm text-slate-500 mt-3">
                    To apply for this position, you can reach out to{" "}
                    {jobData.company.companyName}, located at {""}
                    <span className="font-bold">
                      {jobData.company.companyAddress}
                    </span>
                    . Feel free to contact them via phone at {""}
                    <span className="font-bold">
                      {jobData.company.mobileNumber}
                    </span>{" "}
                    or send an email to {""}
                    <span className="font-bold">{jobData.company.email}</span>.
                    Additionally, you can find more information and explore
                    opportunities on their website at {""}
                    <span className="font-bold">
                      {" "}
                      <a
                        href={jobData.company.websiteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {jobData.company.websiteLink}
                      </a>
                    </span>
                    .
                  </p>
                )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-end mt-4 md:mt-6 space-y-4 md:space-y-0 md:space-x-4">
            {!jobData.status && (
              <>
                <Button
                  type="button"
                  variant="contained"
                  size="medium"
                  style={{
                    backgroundColor: "#FFC107",
                    color: "#FFFFFF",
                  }}
                  startIcon={<Edit />}
                  onClick={() => navigate(`/company/edit-job/${jobData.id}`)}
                >
                  Edit Job Post
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  size="medium"
                  style={{
                    backgroundColor: "#db4f4a",
                    color: "#FFFFFF",
                  }}
                  startIcon={<Delete />}
                  onClick={() => {
                    setSelectedItemId(jobData.id);
                    setOpenDeletePopup(true);
                  }}
                >
                  Delete Job Post
                </Button>
              </>
            )}
            {jobData.status && jobData.company.isVerified && (
              <>
                <Button
                  type="submit"
                  variant="contained"
                  size="medium"
                  style={{
                    backgroundColor: "#221769",
                    color: "#dbf5ee",
                  }}
                  startIcon={<Recommend />}
                  onClick={() => navigate(`/company/job/candidates/${id}`)}
                >
                  View Candidates
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="medium"
                  style={{
                    backgroundColor: "#4cceac",
                    color: "#dbf5ee",
                  }}
                  startIcon={<Diversity3 />}
                  onClick={() => navigate(`/company/job/applicants/${id}`)}
                >
                  View Applicants
                </Button>
                {jobData.isActive && (
                  <Button
                    type="button"
                    variant="contained"
                    style={{
                      backgroundColor: "#666666",
                      color: "#dbf5ee",
                    }}
                    startIcon={<Block />}
                    onClick={() => handlCloseJobPost(jobData.id)}
                  >
                    Close Job Post
                  </Button>
                )}
              </>
            )}
            {jobData.status && !jobData.company.isVerified && (
              <>
                <p className="text-xs md:text-sm text-slate-500 mt-3">
                  Apply for partnership to view candidates of this job and the
                  applicants.
                </p>
                {jobData.isActive && (
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      backgroundColor: "#666666",
                      color: "#dbf5ee",
                    }}
                    startIcon={<Block />}
                    onClick={() => handlCloseJobPost(jobData.id)}
                  >
                    Close Job Post
                  </Button>
                )}

                <Button
                  type="button"
                  variant="contained"
                  className="w-full md:w-auto bg-gray-600 text-white px-4 py-2"
                  startIcon={<FirstPage />}
                  onClick={() => navigate(-1)}
                >
                  Back
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <ConfirmationDialog
        open={openDeletePopup}
        onClose={() => setOpenDeletePopup(false)}
        onConfirm={() => {
          if (selectedItemId) {
            handleDelete(selectedItemId);
          }
        }}
      />
    </div>
  );
}
