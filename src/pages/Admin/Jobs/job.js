import React from "react";
import placeholder from "../../../assets/placeholder.png";
import { formatDate } from "../../../components/constant/helper";

import "react-toastify/dist/ReactToastify.css";
export default function ViewJobAdmin({ jobData }) {
  return (
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
                {jobData?.targetSkills?.map((skill) => skill.skill).join(", ")}
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
      </div>
    </div>
  );
}
