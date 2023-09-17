import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { jobMockData } from "../../../data/mockAdminData";
import Header from "../../../components/header";
import JobCard from "../../../components/cards";

const Jobs = () => {

    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const data = jobMockData;

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="JOB LIST" subtitle="See the diffirent job postings." />

            <Box
                my="20px"
                display="grid"
                gridTemplateColumns="repeat(4, minmax(0,1fr))"
                justifyContent="space-between"
                rowGap="20px"
                columnGap="1.33%"
                sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
            >
                {data.map(
                    ({ _id, name, description, salary, skills, endDate, isActive }) => (
                        <JobCard
                            key={_id}
                            _id={_id}
                            name={name}
                            description={description}
                            salary={salary}
                            skills={skills}
                            endDate={endDate}
                            isActive={isActive}
                        />
                    )
                )}
            </Box>
        </Box>
    );
};

export default Jobs;
