import React from "react";
import placeholder from "../../assets/placeholder.png";
import { formatDate } from "../constant/helper";

const EventsCard = ({ events }) => {
  const { title, start, end, venue, description, posted_Date } = events;

  return (
    <>
      <div className="mx-4 sm:mx-0">
        <div className="bg-white border border-slate-200 p-4 mb-2 rounded-lg flex">
          <div className="flex-shrink-0 sm:w-1/9 md:w-1/7 lg:w-1/8 ">
            <img
              src={
                events.admin.profileImage
                  ? `data:image/jpeg;base64,${events.admin.profileImage}`
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
                {events.admin.firstName} {events.admin.lastName}
              </span>{" "}
              on {formatDate(posted_Date)} {events.admin.position}
            </p>
            <p className="flex items-center gap-2 text-[12px] text-slate-500 mt-4">
              Venue: <span className="font-bold">{venue} </span>
            </p>
            <p className="flex items-center gap-2 text-[12px] text-slate-500">
              Start: <span className="font-bold">{formatDate(start)} </span>
            </p>
            <p className="flex items-center gap-2 text-[12px] text-slate-500 mb-4">
              End: <span className="font-bold">{formatDate(end)} </span>
            </p>
            <div
              className="text-[12px] text-justify mr-8 richTextContainer"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsCard;
