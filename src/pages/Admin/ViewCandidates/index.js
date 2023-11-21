import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { ViewAllCandidates } from "../../../services/admin_company";
import { getCandidatesError } from "../../../app/companiesSlice";
import { ViewCandidatesColumns } from "../../../components/constant/adminColumnHeaders";

const ViewCandidates = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ViewAllCandidates(dispatch, id);
        console.log(data);
        setCandidates(data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
        dispatch(getCandidatesError(error.response?.data));
      }
    };

    fetchData();
  }, [dispatch, id]);

  const filtered_candidates = candidates
    ? candidates.filter((candidate) => candidate.jobId === Number(id))
    : [];

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto flex flex-col sm:flex-row py-4 gap-2 items-center justify-center">
        <div className="mx-4 sm:mx-0 bg-white p-4 space-y-2 w-full">
          <h1 className="Uppercase text-xl font-bold">List of Candidates</h1>
          <p>These are the list of alumni that matches this job post.</p>

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
                  columns={ViewCandidatesColumns}
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

export default ViewCandidates;
