import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Header from "../../../components/header";
import { alumniColumns } from "../../../components/constant/adminColumnHeaders";
import PopUp from "../../../components/popup";
import AlumniForm from "../../../components/forms/AlumniForm";
import { DeleteOutline, EditNote, GroupAdd, Person, ThumbUpAlt } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { DeleteAlumni, GetAlumni, VerifyAlumni } from "../../../services/admin_alumni";
import ConfirmationDialog from "../../../components/popup/confirmationDialog";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DataTable from "../../../components/dataTable";
import AlumniCSVUpload from "../../../components/forms/AlumniCSVUpload";

const Alumni = () => {
    const verifiedAlumni = useSelector((state) => state.alumniSlice.alumni);
    const dispatch = useDispatch();

    const [openPopup, setOpenup] = useState(false);
    const [openEditPopup, setOpenEditPopup] = useState(false);
    const [openCSVUploadPopup, setOpenCSVUploadPopup] = useState(false);
    const [openDeletePopup, setOpenDeletePopup] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [deleteOccurred, setDeleteOccurred] = useState(false);

    useEffect(() => {
        GetAlumni(dispatch)
    }, [dispatch])

    const uniqueAlumni = verifiedAlumni.map((alumnus, index) => {
        return { ...alumnus, id: alumnus.id || index + 1 };
    });

    useEffect(() => {
        if (deleteOccurred) {
            GetAlumni(dispatch);
            setDeleteOccurred(false);
        }
    }, [deleteOccurred, dispatch]);

    const handleAlumni = () => {
        setOpenup(false);
        setOpenEditPopup(false);
    };

    const handleCloseCSVUpload = () => {
        setOpenCSVUploadPopup(false);
    };

    const handleDelete = (id) => {
        DeleteAlumni(dispatch, id)
            .then(() => {
                setDeleteOccurred(true);
            })
            .catch((error) => {
                console.error("Error deleting alumni:", error);
            });

        setOpenDeletePopup(false);
    };

    useEffect(() => {
        if (deleteOccurred) {
            GetAlumni(dispatch);
            setDeleteOccurred(false);
        }
    }, [deleteOccurred, dispatch]);

    const handleVerifyAlumni = async (id) => {
        try {
            const credentials = {
                id: id,
                isVerified: true
            };
            await VerifyAlumni(dispatch, credentials);
            GetAlumni(dispatch);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const ActionColumn = {
        field: "action",
        headerName: "Actions",
        width: 150,
        renderCell: (params) => {
            return (
                <Box display="flex" gap="10px">

                    <IconButton
                        onClick={() => handleVerifyAlumni(params.row.id)}
                        disabled={params.row.isVerified}
                    >
                        <ThumbUpAlt
                            style={{
                                fontSize: "20px",
                                color: params.row.isVerified ? "#aaa" : "#4cceac",
                            }}
                        />
                    </IconButton>

                    <IconButton onClick={() => {
                        setSelectedItemId(params.row.id);
                        setOpenEditPopup(true);
                    }}
                        disabled={!params.row.isVerified}
                    >
                        <EditNote
                            style={{
                                fontSize: "20px",
                                color: !params.row.isVerified ? "#aaa" : "#e6b800",

                            }}
                        />
                    </IconButton>
                    <IconButton onClick={() => {
                        setSelectedItemId(params.row.id);
                        setOpenDeletePopup(true);

                    }}
                        disabled={params.row.isVerified}
                    >
                        <DeleteOutline
                            style={{
                                fontSize: "20px",
                                // color: "#e2726e"
                                color: params.row.isVerified ? "#aaa" : "#e2726e",

                            }}
                        />
                    </IconButton>
                </Box>
            );
        },
    };

    console.log(selectedItemId);

    return (
        <>
            <Box m="1.5rem 2.5rem">
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Header title="Alumni" subtitle="List of Alumni" />
                    <ToastContainer position="top-right" autoClose={3000} />

                    <Box display="flex" gap="15px">
                        <Button
                            variant="contained"
                            size="medium"
                            style={{ backgroundColor: "#221769" }}
                            onClick={() => setOpenup(true)}
                            startIcon={<Person />}
                        >
                            Add Alumni
                        </Button>
                        <Button
                            variant="contained"
                            size="medium"
                            style={{ backgroundColor: "#3da58a" }}
                            onClick={() => setOpenCSVUploadPopup(true)}
                            startIcon={<GroupAdd />}
                        >
                            Upload CSV
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ marginTop: "1.5rem", width: "100%", height: "70vh" }}>
                    {verifiedAlumni.length === 0 ? (
                        <Typography>No Data Available</Typography>
                    ) : (
                        <DataTable
                            columns={alumniColumns}
                            rows={uniqueAlumni}
                            lastColumn={ActionColumn}
                        />
                    )}
                </Box>

            </Box>
            <PopUp
                title="ALUMNI FORM"
                openPopup={openPopup}
                setOpenup={setOpenup}
            >
                <AlumniForm onSubmit={handleAlumni} />
            </PopUp>
            <PopUp
                title="EDIT ALUMNI FORM"
                openPopup={openEditPopup}
                setOpenup={setOpenEditPopup}
            >
                <AlumniForm onSubmit={handleAlumni} id={selectedItemId} />
            </PopUp>
            <PopUp
                title="UPLOAD CSV FILE"
                openPopup={openCSVUploadPopup}
                setOpenup={setOpenCSVUploadPopup}
            >
                <AlumniCSVUpload onSubmit={handleAlumni} onClose={handleCloseCSVUpload} />
            </PopUp>

            <ConfirmationDialog open={openDeletePopup} onClose={handleDelete} onConfirm={() => {
                if (selectedItemId) {
                    handleDelete(selectedItemId);
                }
            }} />
        </>

    );
};

export default Alumni;
