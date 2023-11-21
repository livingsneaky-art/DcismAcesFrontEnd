import React from "react";
import { formatDate } from "../constant/helper";
import placeholder from "../../assets/placeholder.png";

import "./index.scss";

const AnnouncementCard = ({ announcement }) => {
  const { title, posted_Date, description, file } = announcement;

  const handleDownload = (file, title) => {
    const linkSource = `data:application/pdf;base64,${file}`;
    const downloadLink = document.createElement("a");
    const fileName = `announcement-${title}.pdf`;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  return (
    <div className="mx-4 sm:mx-0">
      <div className="bg-white border border-slate-200 p-4 mb-2 rounded-lg flex">
        <div className="flex-shrink-0 sm:w-1/9 md:w-1/7 lg:w-1/8 ">
          <img
            src={
              announcement.admin.profileImage
                ? `data:image/jpeg;base64,${announcement.admin.profileImage}`
                : placeholder
            }
            alt="Profile"
            className="w-12 h-12 rounded-full border border-slate-300"
          />
        </div>
        <div className="sm:w-8/9 md:w-6/7 lg:w-7/8 ml-4">
          <h1 className="font-bold">{title}</h1>
          <p className="flex items-center gap-2 text-[12px] text-slate-500 ">
            Posted By:{" "}
            <span className="font-bold">
              {announcement.admin.firstName} {announcement.admin.lastName}
            </span>{" "}
            on {formatDate(posted_Date)} {announcement.admin.position}
          </p>
          <p className="flex items-center gap-2 text-[12px] text-slate-500 mb-4">
            Position:{" "}
            <span className="font-bold">{announcement.admin.position} </span>
          </p>
          <div
            className="text-[12px] text-justify mr-8 richTextContainer"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          {file !== "NULL" && (
            <div className="text-[12px] text-justify mr-8">
              <label className="text-[12px] text-justify mr-8">
                Announcement File:
              </label>
              <button
                className="border-[1px] rounded-3xl p-2 mt-2 inline-block mx-1 bg-slate-100"
                onClick={() => handleDownload(file, title)}
              >
                Download File
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
