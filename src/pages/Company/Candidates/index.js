import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import {
  SendInviteCandidate,
  ViewAllCandidates,
} from "../../../services/company";
import { getJobsError } from "../../../app/companyUserSlice";
import { Button, CircularProgress } from "@mui/material";
import { ViewCandidatesColumns } from "../../../components/constant/adminColumnHeaders";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ForwardToInbox } from "@mui/icons-material";

const CompanyCandidates = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [invitationLoading, setInvitationLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ViewAllCandidates(dispatch, id);
        setCandidates(data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
        dispatch(getJobsError(error.response?.data));
      }
    };

    fetchData();
  }, [dispatch, id, invitationLoading]);

  const handleSendInvite = async (jobId, alumniId) => {
    try {
      setInvitationLoading(true);

      const isSuccess = await SendInviteCandidate(dispatch, jobId, alumniId);

      if (isSuccess) {
        toast.success("Invitation sent successfully!");
      }
    } catch (error) {
      console.error("Error sending invite:", error);
    } finally {
      setInvitationLoading(false);
    }
  };

  const handleDownload = (file, firstName, lastName) => {
    const linkSource = `data:application/pdf;base64,${file}`;
    const downloadLink = document.createElement("a");
    const fileName = `moa-${firstName} ${lastName}.pdf`;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const columns = [
    ...ViewCandidatesColumns,
    {
      field: "resume",
      headerName: "Uploaded Resume",
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            {params.row.alumni.resume ? (
              <button
                className="border-[1px] rounded-3xl p-2 mt-2 inline-block mx-1 bg-slate-100"
                onClick={() =>
                  handleDownload(
                    params.row.alumni.resume,
                    params.row.alumni.firstName,
                    params.row.alumni.lastName,
                  )
                }
              >
                Download Resume
              </button>
            ) : (
              <span style={{ color: "gray" }}>No Resume</span>
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              size="small"
              style={{
                backgroundColor:
                  params.row.status || !params.row.job.isActive
                    ? "#aaa"
                    : "#221769",
                color: "#dbf5ee",
              }}
              onClick={() =>
                handleSendInvite(params.row.jobId, params.row.alumniId)
              }
              disabled={
                !params.row.job.isActive ||
                invitationLoading ||
                params.row.status
              }
              startIcon={<ForwardToInbox />}
            >
              {invitationLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Invite"
              )}
            </Button>
          </>
        );
      },
    },
  ];

  const filtered_candidates = candidates
    ? candidates.filter((candidate) => candidate.jobId === Number(id))
    : [];

  return (
    <div className="bg-slate-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="container mx-auto flex flex-col sm:flex-row py-4 gap-2 items-center justify-center">
        <div className="mx-4 sm:mx-0 bg-white p-4 space-y-2 w-full">
          <h1 className="Uppercase text-xl font-bold">List of Candidates</h1>
          <p>These are the list of alumni that matches your post.</p>

          {loading ? (
            <div className="flex items-center justify-center">
              <CircularProgress color="primary" />
            </div>
          ) : (
            <div style={{ width: "100%", overflowX: "auto" }}>
              {filtered_candidates.length === 0 ? (
                <p>No candidates available.</p>
              ) : (
                <DataGrid
                  sx={{
                    padding: "20px",
                    "& .MuiDataGrid-toolbarContainer": {
                      flexDirection: "row-reverse",
                      color: "#221769",
                    },
                    "& .MuiButtonBase-root": {
                      color: "#221769",
                    },
                  }}
                  rows={filtered_candidates}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10,
                      },
                    },
                  }}
                  slots={{ toolbar: GridToolbar }}
                  slotProps={{
                    toolbar: {
                      showQuickFilter: true,
                      quickFilterProps: { debounceMs: 500 },
                    },
                  }}
                  pageSizeOptions={[10]}
                  checkboxSelection
                  disableRowSelectionOnClick
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyCandidates;
