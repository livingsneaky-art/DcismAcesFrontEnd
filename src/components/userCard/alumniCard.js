import React from "react";
import { useNavigate } from "react-router-dom";
import placeholder from "../../assets/placeholder.png";

const AlumniUser = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="hidden sm:flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-6">
      <div className="flex flex-col mx-auto justify-center items-center text-center">
        <img
          src={
            user?.profileImage
              ? `data:image/jpeg;base64,${user.profileImage}`
              : placeholder
          }
          alt="placeholder"
          className="w-[90px] h-[90px] rounded-full border border-slate-300 "
        />
        <h1 className="font-bold py-2 capitalize">
          {user?.firstName} {user?.lastName}
        </h1>
        <h1 className="text-[12px]">{user?.occupation}</h1>
      </div>

      <div className="flex flex-col text-[12px] space-y-2">
        <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
        <div className="flex justify-between">
          <p>Birthday</p>
          <p className="font-bold ">
            {user && user.birthday ? user.birthday.split("T")[0] : "N/A"}
          </p>
        </div>
        <div className="flex justify-between">
          <p>Company</p>
          <p className="font-bold ">
            {user && user.companyName ? user.companyName : "Not indicated"}
          </p>
        </div>
        <div className="flex justify-between">
          <p>Location</p>
          <p className="font-bold ">
            {user && user.companyAddress
              ? user.companyAddress
              : "Not indicated"}
          </p>
        </div>
        <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
        <div className="flex justify-between">
          <p>USC ID</p>
          <p className="font-bold ">{user?.idNum}</p>
        </div>
        <div className="flex justify-between">
          <p>Batch</p>
          <p className="font-bold ">
            {user && user.syGraduated ? user.syGraduated : "Not indicated"}
          </p>
        </div>
        <div className="flex justify-between">
          <p>Program</p>
          <div className="font-bold">
            {user?.courses?.map((course, index) => (
              <span key={index}>{course.programCode} </span>
            ))}
          </div>
        </div>
        <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />

        <div className="flex flex-col">
          <div className="flex justify-between">
            <p>Skills</p>
            {user?.skills ? (
              user?.skills.length === 0 ? (
                <p>No skills indicated</p>
              ) : (
                <p>{user?.skills.map((skill) => skill.skill).join(", ")}</p>
              )
            ) : (
              <p>No skills data available</p>
            )}
          </div>

          <div className="flex justify-end">
            <p
              className="text-[#0098FF] cursor-pointer"
              onClick={() => navigate("/alumni/profile")}
            >
              View All
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniUser;
