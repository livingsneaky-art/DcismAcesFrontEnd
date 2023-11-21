import React from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatDate } from "../constant/helper";

export default function JobContent({ data, user }) {
  const navigate = useNavigate();
  const role = user?.role.toLowerCase();

  const handleViewDetails = () => {
    const jobId = data.id;
    navigate(`/${role}/job/${jobId}`);
  };

  return (
    <div className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex flex-col">
        <h1 className="flex font-bold">{data.position}</h1>
        <Content title="Company" desc={data.company.companyName} />
        <Content title="Location" desc={data.location} />
        <Content title="Years of Exp" desc={data.yearsOfExp} />
        <Content title="Salary" desc={data.salary} />
        <div className="flex justify-between">
          <p>Skills Required:</p>
          <p className="font-bold">
            {data?.targetSkills?.map((skill) => skill.skill).join(", ")}
          </p>
        </div>

        <div className="flex flex-col">
          <Content title="Slots" desc={data.slots} />
          <Content title="Ends By:" desc={formatDate(data.expiration_Date)} />
          <p
            className="flex justify-end text-[#0098FF] cursor-pointer"
            onClick={handleViewDetails}
          >
            View Details
          </p>
        </div>
      </div>
    </div>
  );
}

const Content = ({ title = "", desc = "" }) => {
  return (
    <div className="flex justify-between">
      <p>{title}</p>
      <p className="font-bold ">{desc}</p>
    </div>
  );
};
