import React from "react";
import { CompanyFAQData } from "../../../data/faqData";

const CompanyFAQ = () => {
  const data = CompanyFAQData[0];

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto flex flex-col sm:flex-row py-4 gap-2 items-center justify-center">
        <div className="mx-4 sm:mx-0 bg-white p-4 space-y-2">
          <h1 className="Uppercase text-xl font-bold">FAQ. Need Help?</h1>
          <p>
            Please refer to the following questions and their respective answers
            before contacting the office for assistance.
          </p>
          {data.data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row border border-slate-200 p-4 mb-2 rounded-lg shadow-md"
            >
              <div className="flex flex-col space-y-2">
                <h1 className="font-bold ">{item.title}</h1>
                <div
                  className="text-[12px] text-justify mr-8"
                  dangerouslySetInnerHTML={{ __html: item.Content }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyFAQ;
