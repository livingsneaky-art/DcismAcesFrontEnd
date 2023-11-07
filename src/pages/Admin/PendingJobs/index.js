import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import Header from "../../../components/header";
import DataTable from "../../../components/dataTable";
import { verifyJobColumn } from "../../../components/constant/adminColumnHeaders";
import { useDispatch, useSelector } from "react-redux";
import { GetUnverifiedJobs, Verify_JobPost } from "../../../services/admin_company";


const PendingJobs = () => {
    const unverified_post = useSelector((state) => state.companiesSlice.unverified_post);
    const dispatch = useDispatch();

    useEffect(() => {
        GetUnverifiedJobs(dispatch)
    }, [dispatch])

    const uniquePost = unverified_post.map((job, index) => {
        return { ...job, id: job.id || index + 1 };
    });

    const handleAcceptJobPost = async (id) => {
        try {
            const credentials = {
                Id: id,
                Status: true
            };
            await Verify_JobPost(dispatch, credentials);
            GetUnverifiedJobs(dispatch);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const customLastColumn = {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
            return (
                <Box display="flex" gap="1rem">
                    <Button
                        variant="contained"
                        size="medium"
                        style={{
                            backgroundColor: "#4cceac",
                            color: "#dbf5ee",
                        }}
                        onClick={() => handleAcceptJobPost(params.row.id)}

                    >
                        Post
                    </Button>
                    <Button
                        variant="contained"
                        size="medium"
                        style={{
                            backgroundColor: "#db4f4a",
                            color: "#dbf5ee",
                        }}
                    >
                        Reject
                    </Button>
                </Box>
            );
        },
    };

    return (
        <Box m="1.5rem 2.5rem">
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Header
                    title="Pending Job Posting"
                    subtitle="Companies wanted to post jobs"
                />
            </Box>
            <Box sx={{ marginTop: "1.5rem", width: "100%", height: "70vh" }}>
                {unverified_post.length === 0 ? (
                    <Typography>No Data Available</Typography>
                ) : (
                    <DataTable
                        columns={verifyJobColumn}
                        rows={uniquePost}
                        lastColumn={customLastColumn}
                    />
                )}
            </Box>

        </Box>
    );
};

export default PendingJobs;
