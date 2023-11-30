import React from "react";
import CreateJobPost from "../../../components/forms/CreateJobPost";

const PostJob = () => {
  return (
    <div className="bg-slate-100 min-h-screen ">
      <div className="container mx-auto flex justify-center items-center mt-3">
        <div className="sm:w-[50%] space-y-2">
          <CreateJobPost />
        </div>
      </div>
    </div>
  );
};

export default PostJob;
