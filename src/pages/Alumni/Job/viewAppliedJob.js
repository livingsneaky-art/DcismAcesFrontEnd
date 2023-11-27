import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import placeholder from "../../../assets/placeholder.png";
import { getJobError } from "../../../app/companyUserSlice";
import { formatDate } from "../../../components/constant/helper";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DeleteAppliedJob,
  GetAllAppliedJobs,
  GetAppliedJob,
} from "../../../services/alumni";
import ConfirmationDialog from "../../../components/popup/confirmationDialog";
import { Delete, FirstPage } from "@mui/icons-material";

export default function ViewAppliedJobAlumni() {
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
          const job = await GetAppliedJob(dispatch, id);
          if (job) {
            setJobData(job);
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
      await DeleteAppliedJob(dispatch, id);
      setDeleteOccurred(true);
    } catch (error) {
      console.error("Error deleting job:", error);
    }
    setOpenDeletePopup(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (deleteOccurred) {
        await GetAllAppliedJobs(dispatch);
        setDeleteOccurred(false);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        navigate("/alumni/jobs");
      }
    };
    fetchData();
  }, [deleteOccurred, dispatch, navigate]);

  if (!jobData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-slate-100 min-h-screen flex items-start justify-center mt-2">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="container mx-auto">
        <div className="bg-white border border-slate-200 p-4 md:p-6 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row items-center md:items-start mb-4">
            <div className="flex-shrink-0 w-16 h-16 md:w-12 md:h-12 mb-4 md:mb-0">
              {jobData[0].company && (
                <img
                  src={
                    jobData[0].company.profileImage
                      ? `data:image/jpeg;base64,${jobData[0].company.profileImage}`
                      : placeholder
                  }
                  alt="Profile"
                  className="w-full h-full rounded-full border border-slate-300"
                />
              )}
            </div>
            <div className="ml-0 md:ml-4 text-center md:text-left">
              <h1 className="text-lg md:text-2xl font-bold mb-2">
                {jobData[0].position}
              </h1>
              <p className="text-xs md:text-sm text-slate-500 mb-2">
                Posted By:{" "}
                <span className="font-bold">
                  {jobData[0].company.firstName} {jobData[0].company.lastName}
                </span>{" "}
                on {formatDate(jobData[0].posted_Date)}
              </p>

              <p className="text-xs md:text-sm text-slate-500">
                Job Location:{" "}
                <span className="font-bold">{jobData[0].location} </span>
              </p>
              <p className="text-xs md:text-sm text-slate-500">
                Slots: <span className="font-bold">{jobData[0].slots} </span>
              </p>
              <p className="text-xs md:text-sm text-slate-500">
                Years of Experience:{" "}
                <span className="font-bold">{jobData[0].yearsOfExp} </span>
              </p>
              <p className="text-xs md:text-sm text-slate-500">
                Skills Required:{" "}
                <span className="font-bold">
                  {jobData[0].targetSkills
                    ?.map((skill) => skill.skill)
                    .join(", ")}
                </span>
              </p>
              <p className="text-xs md:text-sm text-slate-500 mb-4">
                Application End:{" "}
                <span className="font-bold">
                  {" "}
                  {formatDate(jobData[0].expiration_Date)}{" "}
                </span>
              </p>

              <p className="text-xs md:text-sm text-slate-500">
                Job Description:
                <span
                  className="richTextContainer"
                  dangerouslySetInnerHTML={{ __html: jobData[0].description }}
                />
              </p>

              {jobData[0].company.companyName &&
                jobData[0].company.companyAddress &&
                jobData[0].company.mobileNumber &&
                jobData[0].company.email && (
                  <p className="text-xs md:text-sm text-slate-500 mt-3">
                    To apply for this position, you can reach out to{" "}
                    {jobData[0].company.companyName}, located at {""}
                    <span className="font-bold">
                      {jobData[0].company.companyAddress}
                    </span>
                    . Feel free to contact them via phone at {""}
                    <span className="font-bold">
                      {jobData[0].company.mobileNumber}
                    </span>{" "}
                    or send an email to {""}
                    <span className="font-bold">
                      {jobData[0].company.email}
                    </span>
                    . Additionally, you can find more information and explore
                    opportunities on their website at {""}
                    <span className="font-bold">
                      {" "}
                      <a
                        href={jobData[0].company.websiteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {jobData[0].company.websiteLink}
                      </a>
                    </span>
                    .
                  </p>
                )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-end mt-4 md:mt-6 space-y-4 md:space-y-0 md:space-x-4">
            {jobData[0].isActive ? (
              <>
                <Button
                  type="button"
                  variant="contained"
                  size="medium"
                  style={{
                    backgroundColor: "#db4f4a",
                    color: "#dbf5ee",
                  }}
                  onClick={() => {
                    setSelectedItemId(jobData.id);
                    setOpenDeletePopup(true);
                  }}
                  startIcon={<Delete />}
                >
                  Delete Application
                </Button>
              </>
            ) : (
              <Button
                type="button"
                variant="contained"
                className="w-full md:w-auto bg-gray-600 text-white px-4 py-2"
                onClick={() => navigate(-1)}
                startIcon={<FirstPage />}
              >
                Back
              </Button>
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
