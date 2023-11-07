import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import RichTextEditor from '../forms/RichTextEditor';
import { CompanyJobPost } from '../../services/company_job_post';
import {
    Alert,
    AlertTitle,
} from "@mui/material";

const CreateJobPost = () => {
    const { message, isCreate } = useSelector((state) => state.createJob);
    const [Position, setPosition] = useState("");
    const [Description, setDescription] = useState("");
    const [Location, setLocation] = useState("");
    const [Expiration_Date, setExpiration_Date] = useState("");

    // const [Posted_Date, setPosted_Date] = useState("");
    // const [UpdatedTime, setUpdatedTime] = useState("");

    const [Slots, setSlots] = useState("");
    const [YearsOfExp, setYearsOfExp] = useState("");
    const [Salary, setSalary] = useState("");

    const dispatch = useDispatch();

    // const combineDateAndTime = () => {
    //     if (formData.scheduledInterviewDate && formData.scheduledInterviewTime) {
    //         const date = new Date(formData.scheduledInterviewDate);
    //         const time = new Date(`1970-01-01T${formData.scheduledInterviewTime}`);
    //         // Combine the date and time
    //         const scheduledInterview = new Date(date.getTime() + time.getTime());

    //         // Now 'scheduledInterview' is a valid datetime
    //         setFormData({ ...formData, scheduledInterview });
    //     }
    // };

    // const handleSubmit = () => {
    //     combineDateAndTime();
    //     // Now 'formData.scheduledInterview' contains the datetime value
    //     // You can send this data to the backend
    // };

    return (
        <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
            <h1 className="font-bold text-[15px] uppercase ">CREATE NEW LISTING</h1>
            <p className="text-slate-500 text-[12px]">Post a new job offer for the Alumni of the University of San Carlos</p>
                
            <form onSubmit={event => {
                event.preventDefault();
                CompanyJobPost(dispatch, {Position, Description, Location, 
                    Expiration_Date, Slots, YearsOfExp, Salary});
            }}>
                <div className="flex flex-col text-[12px] space-y-2">
                    <div className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg">
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Position: </label>
                            <input
                                type="text"
                                placeholder='Ex. Human Resource Representative'
                                value={Position}
                                onChange={(e) => setPosition(e.target.value)}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Location: </label>
                            <input
                                type="text"
                                placeholder='Ex. USC Talamban'
                                value={Location}
                                onChange={(e) => setLocation(e.target.value)}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Years of Experience: </label>
                            <input
                                type="number"
                                placeholder='2 years'
                                value={YearsOfExp}
                                onChange={(e) => setYearsOfExp(e.target.value)}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Slots: </label>
                            <input
                                type="number"
                                placeholder='5 slots'
                                value={Slots}
                                onChange={(e) => setSlots(e.target.value)}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Salary: </label>
                            <input
                                type="text"
                                placeholder='Php 16,000.00-Php 20,000.00'
                                value={Salary}
                                onChange={(e) => setSalary(e.target.value)}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center my-2">
                            <label className="text-[12px] w-[90px]">End of Posting: </label>
                            <input
                                type="date"
                                value={Expiration_Date}
                                onChange={(e) => setExpiration_Date(e.target.value)
                                }
                                className="w-[100px] h-[30px] bg-white border border-slate-200 p-2 rounded-md"
                            />
                        </div>

                        <div className="flex items-center my-4">
                            <label className="text-[12px] w-[100px]">Description: </label>
                            <div style={{ flex: 1 }}>
                                <RichTextEditor 
                                value={Description} 
                                onChange={(newValue) => setDescription(newValue)} />
                            </div>
                        </div> 
                        <div className="flex items-center px-6 mt-20">
                            <div className='flex gap-10 flex-1 justify-end'>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    style={{
                                        display: "block",
                                        padding: "10px",
                                        backgroundColor: "#221769",
                                        color: "#FFFFFF",
                                    }}
                                >
                                    Submit Application
                                </Button>
                                <Button
                                    type="button"
                                    variant="contained"
                                    style={{
                                        display: "block",
                                        padding: "10px",
                                        backgroundColor: "#666666",
                                        color: "#FFFFFF",
                                    }}
                                >
                                    Discard Application
                                </Button>
                            </div>
                        </div>
                        {isCreate && (
                            <Alert severity="success">
                                <AlertTitle>Success</AlertTitle>
                                {message} — <strong>check it out!</strong>
                            </Alert>
                        )}   
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateJobPost