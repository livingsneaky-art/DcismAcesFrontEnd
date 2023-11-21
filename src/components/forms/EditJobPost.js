import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate, useParams } from "react-router-dom";
import { GetAllJobs, GetJob, UpateJobPost } from "../../services/company";
import RichTextEditor from "./RichTextEditor";
import { FirstPage, Save } from "@mui/icons-material";

const EditJobPostForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    position: "",
    requireResume: false,
    expiration_Date: "",
    description: "",
    location: "",
    salary: "",
    yearsOfExp: "",
    slots: "",
    targetSkills: [{ skill: "" }],
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postDataLoaded, setPostDataLoaded] = useState(false);
  const [skillsInput, setSkillsInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const jobData = await GetJob(dispatch, id);
          if (jobData) {
            setFormData({
              id: jobData.id,
              position: jobData.position,
              expiration_Date: jobData.expiration_Date,
              requireResume: jobData.requireResume,
              location: jobData.location,
              salary: jobData.salary,
              description: jobData.description,
              targetSkills: jobData.targetSkills,
              yearsOfExp: jobData.yearsOfExp,
              slots: jobData.slots,
            });
            setSkillsInput((prevSkillsInput) =>
              jobData.targetSkills.map((skill) => skill.skill).join(","),
            );
            setPostDataLoaded(true);
          }
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
        toast.error("An error occurred while fetching job data");
      }
    };

    if (id) {
      fetchData();
    } else {
      setPostDataLoaded(true);
    }
  }, [id, dispatch]);

  const handleCheckboxChange = (e) => {
    const value = e.target.checked;
    setFormData({ ...formData, requireResume: value });
  };

  const handleSkillsChange = (e) => {
    setSkillsInput(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        const skillsArray = skillsInput.split(/[,\n]/);
        const updatedSkills = skillsArray.map((skill) => ({
          skill: skill.trim(),
        }));
        const filteredSkills = updatedSkills.filter(
          (skill) => skill.skill !== "",
        );

        const updatedFormData = {
          ...formData,
          targetSkills: filteredSkills,
        };

        const updateSuccess = await UpateJobPost(dispatch, updatedFormData);
        if (updateSuccess) {
          await GetAllJobs(dispatch);
          await new Promise((resolve) => setTimeout(resolve, 3000));
          navigate("/company/jobs");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
      <ToastContainer position="top-right" autoClose={3000} />

      <h1 className="font-bold text-[15px] uppercase ">EDIT LISTING</h1>
      <p className="text-slate-500 text-[12px]">
        Edit the job offer for the Alumni of the University of San Carlos
      </p>

      <form onSubmit={handleFormSubmit}>
        {postDataLoaded ? (
          <div className="flex flex-col text-[12px] space-y-2">
            <div className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg">
              <div className="flex items-center">
                <label className="text-[12px] w-[100px]">Position: </label>
                <input
                  type="text"
                  placeholder="Ex. Human Resource Representative"
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  variant="outlined"
                  className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                  required
                />
              </div>
              <div className="flex items-center">
                <label className="text-[12px] w-[100px]">Location: </label>
                <input
                  type="text"
                  placeholder="Ex. USC Talamban"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  variant="outlined"
                  className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                  required
                />
              </div>
              <div className="flex items-center">
                <label className="text-[12px] w-[100px]">
                  Years of Experience:{" "}
                </label>
                <input
                  type="number"
                  placeholder="2 years"
                  value={formData.yearsOfExp}
                  onChange={(e) =>
                    setFormData({ ...formData, yearsOfExp: e.target.value })
                  }
                  variant="outlined"
                  className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                  required
                />
              </div>
              <div className="flex items-center">
                <label className="text-[12px] w-[100px]">Slots: </label>
                <input
                  type="number"
                  placeholder="5 slots"
                  value={formData.slots}
                  onChange={(e) =>
                    setFormData({ ...formData, slots: e.target.value })
                  }
                  variant="outlined"
                  className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                  required
                />
              </div>
              <div className="flex items-center">
                <label className="text-[12px] w-[100px]">Salary: </label>
                <input
                  type="text"
                  placeholder="Php 16,000.00-Php 20,000.00"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                  variant="outlined"
                  className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                  required
                />
              </div>
              <div className="flex items-center my-2">
                <label className="text-[12px] w-[90px]">End of Posting: </label>
                <input
                  type="datetime-local"
                  value={
                    formData.expiration_Date
                      ? formData.expiration_Date.slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      expiration_Date: e.target.value,
                    })
                  }
                  className="w-[200px] h-[30px] bg-white border border-slate-200 p-2 rounded-md"
                  required
                />
              </div>
              <div className="flex items-center my-2">
                <label className="text-[12px] w-[90px]">
                  Required Resume:{" "}
                </label>
                <input
                  type="checkbox"
                  checked={formData.requireResume}
                  onChange={handleCheckboxChange}
                  className="h-[30px] bg-white border border-slate-200 rounded-md"
                />
                <label className="text-[12px] ml-2">
                  {formData.requireResume ? "Yes" : "No"}
                </label>
              </div>

              <div className="flex items-center">
                <label className="text-[12px] w-[100px]">Target Skills: </label>
                <textarea
                  value={skillsInput}
                  onChange={handleSkillsChange}
                  placeholder="Enter skills separated by commas or new lines"
                  className="w-[100%] h-[80px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                  required
                />
              </div>

              <div className="flex items-center my-4">
                <label className="text-[12px] w-[100px]">Description: </label>
                <div style={{ flex: 1 }}>
                  <RichTextEditor
                    value={formData.description}
                    onChange={(value) =>
                      setFormData({ ...formData, description: value })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center mt-20">
                <div className="flex gap-10 flex-1 justify-end">
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      backgroundColor: "#3da58a",
                    }}
                    startIcon={<Save />}
                  >
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    size="medium"
                    onClick={() => navigate(-1)}
                    startIcon={<FirstPage />}
                  >
                    Discard Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading post data...</p>
        )}
      </form>
    </div>
  );
};

export default EditJobPostForm;
