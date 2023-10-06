import React, { useState } from "react";

import UserCard from "../../components/alumni-company/UserCard";
import JobContent from "../../components/alumni-company/JobContent";

import { JobsData, UserCardData, PendingData } from "../../data/mockAlumniData";
import Search from "../../components/alumni-company/SearchBox";

function A_Jobs() {
  const user = UserCardData[0];
  const pending = PendingData[0];
  // const jobSections = JobsData;

  const [displayCount, setDisplayCount] = useState(3); // Initial display count
  const jobSections = JobsData.slice(0, displayCount); // Limit the displayed items

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 2); // Increase the display count by 2 when "Load More" is clicked
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto flex flex-col sm:flex-row py-4 gap-2">
        <div className="flex flex-col sm:w-[25%] gap-2">
          <Search />
          <UserCard data={user} />
        </div>

        <div className="sm:w-[50%] space-y-2">
          {jobSections.map((section, index) => (
            <JobContent key={index} data={section} />
          ))}
          
          {displayCount < JobsData.length && (
            <button
              onClick={handleLoadMore}
              className="bg-blue-500 text-white py-2 px-4 mt-2"
            >
              Load More
            </button>
          )}
        </div>

        <div className="sm:w-[25%]">
          <JobContent data={pending} />
        </div>
      </div>
    </div>
  );
}

export default A_Jobs;
