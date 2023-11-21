import React from "react";

import "./index.scss";
import { useNavigate } from "react-router-dom";

const TopBox = ({ data }) => {
  const top5Jobs = data ? data.slice(0, 5) : [];
  const navigate = useNavigate();

  return (
    <div className="topBox">
      <h1 className="title">List of Jobs</h1>
      <div className="list">
        {data && data.length > 0 ? (
          top5Jobs.map((job) => (
            <div className="listItem" key={job.id}>
              <span className="position">{job.position}</span>
              <div className="details">
                {/* <span className='invites'>{`${job?.totalNumberOfInvites ?? 0} Candidates`}</span> */}
                <span className="slots">{`${job.slots} Slot`}</span>
              </div>
            </div>
          ))
        ) : (
          <p>No Jobs Available</p>
        )}
        {data && data.length > 5 && (
          <div
            className="listItem cursor-pointer"
            onClick={() => navigate("/jobs")}
          >
            View All
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBox;
