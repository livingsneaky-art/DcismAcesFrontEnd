import React from "react";
import EditJobPostForm from "../../../components/forms/EditJobPost";

const EditJobPost = () => {
  return (
    <div className="bg-slate-100 min-h-screen ">
      <div className="container mx-auto flex justify-center items-center mt-3">
        <div className="sm:w-[50%] space-y-2">
          <EditJobPostForm />
        </div>
      </div>
    </div>
  );
};

export default EditJobPost;
