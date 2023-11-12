import React, { useEffect, useState } from "react";
import AlumniProfileCard from "../../../components/profileCard/AlumniProfileCard";
import {
    GetAllAppliedJobs,
} from "../../../services/alumni";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AlumniProfile = () => {
    const [appliedJobsLoaded, setAppliedJobsLoaded] = useState(null);
    const [loadingAppliedJobs, setLoadingAppliedJobs] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const appliedJobsLoaded = await GetAllAppliedJobs(dispatch);
                setAppliedJobsLoaded(appliedJobsLoaded);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoadingAppliedJobs(false);
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <div className="bg-slate-100 min-h-screen">
            <div className="container mx-auto flex flex-col sm:flex-row py-4 gap-2">
                <div className="flex flex-col sm:w-[60%]">
                    <AlumniProfileCard />
                </div>
                <div className="sm:w-[40%]">
                    <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">

                        <h1 className="font-bold text-[15px] uppercase">
                            List of Applied Jobs
                        </h1>
                        <p className="text-slate-500 text-[12px]">All your placements</p>
                        {loadingAppliedJobs ? (
                            <p>Loading applied jobs...</p>
                        ) : appliedJobsLoaded && appliedJobsLoaded.length ? (
                            <div className="flex flex-col text-[12px] space-y-2">
                                {appliedJobsLoaded.map((appliedJob, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg"
                                    >
                                        <div className="flex flex-col">
                                            <h1 className="flex font-bold">
                                                {appliedJob.job.position}
                                            </h1>
                                            <Content
                                                title="Location"
                                                desc={appliedJob.job.location}
                                            />
                                            <Content
                                                title="Years of Exp"
                                                desc={appliedJob.job.yearsOfExp}
                                            />
                                            <Content title="Salary" desc={appliedJob.job.salary} />
                                            <div className="flex flex-col">
                                                <Content title="Slots" desc={appliedJob.job.slots} />
                                                <p
                                                    className="flex justify-end text-[#0098FF] cursor-pointer"
                                                    onClick={() =>
                                                        navigate(`/alumni/job/${appliedJob.job.id}`)
                                                    }
                                                >
                                                    View Details
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="mx-4 sm:mx-2">No applied jobs available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlumniProfile;

const Content = ({ title = "", desc = "" }) => {
    return (
        <div className="flex justify-between">
            <p>{title}</p>
            <p className="font-bold ">{desc}</p>
        </div>
    );
};
