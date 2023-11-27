import React from "react";
import { useNavigate } from "react-router-dom";

export default function PendingApplication({ data, user }) {
  const navigate = useNavigate();
  const role = user?.role.toLowerCase();

  const handleViewDetails = () => {
    const jobId = data.id;
    navigate(`/${role}/job/${jobId}`);
  };

  return (
    <div className="flex flex-col">
      <h1 className="flex font-bold">{data?.position}</h1>
      <Content title="Company" desc={data?.company?.companyName} />
      <Content title="Location" desc={data?.location} />
      <Content title="Years of Exp" desc={data?.yearsOfExp} />
      <Content title="Salary" desc={data?.salary} />

      <div className="flex flex-col">
        <Content title="Slots" desc={data?.slots} />
        <p
          className="flex justify-end text-[#0098FF] cursor-pointer"
          onClick={handleViewDetails}
        >
          View Details
        </p>
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
