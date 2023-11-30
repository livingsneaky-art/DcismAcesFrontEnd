import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Header from "../../../components/header";
import { companyColumn } from "../../../components/constant/adminColumnHeaders";
import { useDispatch, useSelector } from "react-redux";
import { GetCompanies } from "../../../services/admin_company";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ToastContainer } from "react-toastify";

import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

const Companies = () => {
  const companies = useSelector((state) => state.companiesSlice.companies);
  const dispatch = useDispatch();
  useEffect(() => {
    GetCompanies(dispatch);
  }, [dispatch]);

  const uniqueCompanies = companies.map((company, index) => {
    return { ...company, id: company.id || index + 1 };
  });

  const handleDownload = (file, name) => {
    const linkSource = `data:application/pdf;base64,${file}`;
    const downloadLink = document.createElement("a");
    const fileName = `moa-${name}.pdf`;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const columns = [
    ...companyColumn,
    {
      field: "moa",
      headerName: "Uploaded Moa",
      width: 150,
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
      field: "isVerified",
      headerName: "Partnered Status",
      width: 150,
      type: "boolean",
      renderCell: (params) => {
        const isVerified = params.value;
        const style = {
          color: isVerified ? "green" : "red",
        };

        return (
          <div style={style}>{isVerified ? <CheckIcon /> : <CloseIcon />}</div>
        );
      },
    },
  ];

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Header title="Companies" subtitle="List of Afflitiated Companies" />
          <ToastContainer position="top-right" autoClose={3000} />
        </Box>
        <Box sx={{ marginTop: "1.5rem", width: "100%", height: "70vh" }}>
          {companies.length === 0 ? (
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
              rows={uniqueCompanies}
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
    </>
  );
};

export default Companies;
