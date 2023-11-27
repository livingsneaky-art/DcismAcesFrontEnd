import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Header from "../../../components/header";
import { verifyColumns } from "../../../components/constant/adminColumnHeaders";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCompanies,
  RejectCompany,
  Verify_Company,
} from "../../../services/admin_company";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const VerifyCompany = () => {
  const companies = useSelector((state) => state.companiesSlice.companies);
  const dispatch = useDispatch();

  useEffect(() => {
    GetCompanies(dispatch);
  }, [dispatch]);

  const [deleteOccurred, setDeleteOccurred] = useState(false);

  const uniqueCompanies = companies.map((company, index) => {
    return { ...company, id: company.id || index + 1 };
  });

  useEffect(() => {
    if (deleteOccurred) {
      GetCompanies(dispatch);
      setDeleteOccurred(false);
    }
  }, [deleteOccurred, dispatch]);

  const handleVerifyCompany = async (id) => {
    try {
      const credentials = {
        id: id,
        isVerified: true,
      };
      await Verify_Company(dispatch, credentials);
      await GetCompanies(dispatch);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRejectCompany = async (id) => {
    try {
      const credentials = {
        id: id,
        isVerified: false,
      };
      await RejectCompany(dispatch, credentials);
      await GetCompanies(dispatch);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDownload = (file, name) => {
    const linkSource = `data:application/pdf;base64,${file}`;
    const downloadLink = document.createElement("a");
    const fileName = `moa-${name}.pdf`;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const columns = [
    ...verifyColumns,
    {
      field: "moa",
      headerName: "Uploaded Moa",
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            {params.row.moa ? (
              <button
                className="border-[1px] rounded-3xl p-2 mt-2 inline-block mx-1 bg-slate-100"
                onClick={() =>
                  handleDownload(params.row.moa, params.row.companyName)
                }
              >
                Download File
              </button>
            ) : (
              <span style={{ color: "gray" }}>No File Uploaded</span>
            )}
          </div>
        );
      },
    },
    {
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
              onClick={() => handleVerifyCompany(params.row.id)}
              disabled={params.row.isVerified}
            >
              Accept
            </Button>
            <Button
              variant="contained"
              size="medium"
              style={{
                backgroundColor: "#db4f4a",
                color: "#dbf5ee",
              }}
              onClick={() => handleRejectCompany(params.row.id)}
            >
              Decline
            </Button>
          </Box>
        );
      },
    },
  ];

  const isVerifiedCompanies = uniqueCompanies.filter(
    (company) =>
      !company.isVerified && company.moa !== null && company.moa !== "",
  );

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Header
          title="Verification List"
          subtitle="Companies applying for partnership"
        />
        <ToastContainer position="top-right" autoClose={3000} />
      </Box>
      <Box sx={{ marginTop: "1.5rem", width: "100%", height: "70vh" }}>
        {isVerifiedCompanies.length === 0 ? (
          <Typography>No Data Available</Typography>
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
            rows={isVerifiedCompanies}
            getRowId={(row) => row.id}
            columns={columns}
            style={{ width: "100%" }}
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
      </Box>
    </Box>
  );
};

export default VerifyCompany;
