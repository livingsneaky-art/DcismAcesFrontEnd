import React from "react";
import { useLocation } from "react-router-dom";

export default function JobContent({ data }) {
  const location = useLocation();

  const isCompanyPage = location.pathname.includes("/company");
 



  return (
    <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
      <h1 className="font-bold text-[15px] uppercase ">{data.Head}</h1>
      <p className="text-slate-500 text-[12px]">{data.Desc}</p>

      <div className="flex flex-col text-[12px] space-y-2">
        {data.data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg"
          >
            <div className="flex flex-col">
              <h1 className="flex font-bold">{item.Title}</h1>

              <Content title="Company" desc={item.Company} />
              <Content title="Location" desc={item.Location} />
              <Content title="Years of Exp" desc={item.Years} />
              <Content title="Salary" desc={item.Salary} />

              <div className="flex flex-col">
                <Content title="Slots" desc={item.Slots} />

                <p className="flex justify-end text-[#0098FF]">View Details</p>

                {isCompanyPage && (
                  <p className="flex justify-end text-[#aa3636]">
                    Cancel Posting
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
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
