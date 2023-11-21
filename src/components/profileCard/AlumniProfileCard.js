import { Button, CardMedia } from "@mui/material";

import React from "react";
import placeholder from "../../assets/placeholder.png";
import { useNavigate } from "react-router-dom";

import { Edit } from "@mui/icons-material";

const AlumniProfileCard = ({ userData }) => {
  const navigate = useNavigate();

  const handleDownload = () => {
    const linkSource = `data:application/pdf;base64,${userData.resume}`;
    const downloadLink = document.createElement("a");
    const fileName = `resume-${userData.firstName}-${userData.lastName}.pdf`;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };
  return (
    <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
      <div className="flex flex-col mx-auto justify-center items-center text-center">
        <>
          <CardMedia
            component="img"
            sx={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              cursor: "pointer",
            }}
            src={
              userData.profileImage
                ? `data:image/jpeg;base64,${userData.profileImage}`
                : placeholder
            }
            alt="Profile picture"
          />
          <h1 className="font-bold py-2 capitalize text-xl">
            {userData?.firstName} {userData?.lastName}
          </h1>
        </>
      </div>

      <div className="flex flex-col text-[12px] space-y-2">
        <div className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg">
          <p className="text-lg font-bold mb-4">Personal Information</p>
          <div className="flex items-center justify-between">
            <label className="text-[12px] w-[100px]">First Name: </label>
            <p className="font-bold "> {userData?.firstName}</p>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-[12px] w-[100px]">Last Name: </label>

            <p className="font-bold "> {userData?.lastName}</p>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-[12px] w-[100px]">Middle Name: </label>

            <p className="font-bold ">
              {" "}
              {userData?.middleName ? userData.middleName : "Not indicated"}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-[12px] w-[100px]">Gender: </label>

            <p className="font-bold">
              {" "}
              {userData?.gender ? userData.gender : "Not indicated"}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-[12px] w-[100px]">Date of Birth: </label>

            <p className="font-bold ">
              {userData?.birthday ? userData.birthday.split("T")[0] : "N/A"}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-[12px] w-[100px]">Address: </label>
            <p className="font-bold ">
              {userData?.alumniAddress
                ? userData.alumniAddress
                : "Not indicated"}
            </p>
          </div>

          <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2  mt-4" />
          <p className="font-bold text-lg mb-4">Account Information</p>

          <div className="flex items-center justify-between">
            <label className="text-[12px] w-[100px]">USC ID: </label>
            <p className="font-bold "> {userData?.idNum}</p>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-[12px] w-[100px]">Email Address: </label>
            <p className="font-bold "> {userData?.email}</p>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-[12px] w-[100px]">Contact Number: </label>

            <p className="font-bold ">
              {" "}
              {userData?.mobileNumber ? userData.mobileNumber : "Not indicated"}
            </p>
          </div>
          <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2 justify-between  mt-4" />
          <p className="font-bold text-lg mb-4">Academic Information</p>
          {userData?.courses?.map((course, index) => (
            <div className="flex items-center justify-between mb-4" key={index}>
              <label className="text-[12px] w-[100px]">
                {" "}
                Program Graduated:{" "}
              </label>
              <p className="font-bold text-right">
                {course.programDescription}
              </p>
            </div>
          ))}

          <div className="flex items-center justify-between">
            <label className="text-[12px] w-[90px]">Year Graduated: </label>
            <p className="font-bold ">
              {" "}
              {userData?.syGraduated ? userData.syGraduated : "Not indicated"}
            </p>
          </div>

          <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2  mt-4" />
          <p className="font-bold text-lg">Work Information</p>

          <div className="flex items-center justify-between">
            <label className="text-[12px] w-[100px]">Employment Status:</label>

            <p className="font-bold">
              {userData?.isEmployed === true ? "Employed" : "Unemployed"}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-[12px] w-[100px]">Company Name: </label>

            <p className="font-bold ">
              {" "}
              {userData?.companyName ? userData.companyName : "Not indicated"}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-[12px] w-[100px]">Company Address: </label>

            <p className="font-bold ">
              {" "}
              {userData?.companyAddress
                ? userData.companyAddress
                : "Not indicated"}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-[12px] w-[100px]">Occupation: </label>
            <p className="font-bold ">
              {" "}
              {userData?.occupation ? userData.occupation : "Not indicated"}
            </p>
          </div>

          <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2 mt-4" />
          <p className="font-bold text-lg mb-4">Skills</p>

          <div className="flex items-center justify-between">
            <label className="text-[12px] w-[100px]">Added Skills: </label>
            <div>
              {userData.skills && userData.skills.length > 0 ? (
                <div className="border-[1px] rounded-3xl p-2 mt-2 inline-block mx-1 bg-slate-100">
                  <div>
                    {userData.skills.map((skill) => skill.skill).join(", ")}
                  </div>
                </div>
              ) : (
                <p className="font-bold ">No skills added</p>
              )}
            </div>
          </div>

          <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2  mt-4" />
          <div className="flex items-center">
            {userData.resume && userData.resume.length > 0 && (
              <div style={{ flex: 1 }}>
                <label className="text-[12px] w-[100px]">
                  Uploaded Resume:{" "}
                </label>
                <button
                  className="border-[1px] rounded-3xl p-2 mt-2 inline-block mx-1 bg-slate-100"
                  onClick={handleDownload}
                >
                  Download Resume
                </button>
              </div>
            )}
            {!userData.resume && (
              <div>
                <span style={{ color: "gray" }}>No resume Uploaded</span>
              </div>
            )}
          </div>

          <div className="flex items-center px-6 mt-6">
            <div className="flex gap-10 flex-1 justify-center">
              <Button
                type="button"
                variant="contained"
                size="medium"
                style={{
                  backgroundColor: "#FFC107",
                  color: "#FFFFFF",
                }}
                startIcon={<Edit />}
                onClick={() => navigate("/alumni/edit-profile")}
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniProfileCard;
