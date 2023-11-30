import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const DataTable = (props) => {
  return (
    <>
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
        rows={props.rows}
        getRowId={(row) => row.id}
        columns={[...props.columns, props.lastColumn]}
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
    </>
  );
};

export default DataTable;
