import React from "react";
import placeholder from "../../assets/placeholder.png";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { formatDate } from "./helper";

export const companyColumn = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "profileImage",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      const imgSrc = params.row.profileImage
        ? `data:image/jpeg;base64,${params.row.profileImage}`
        : placeholder;
      return (
        <img
          src={imgSrc}
          alt=""
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      );
    },
  },
  {
    field: "companyPerson",
    headerName: "Contact Person",
    width: 200,
    valueGetter: (params) => {
      const firstName = params.row.firstName || "";
      const lastName = params.row.lastName || "";

      if (firstName.trim() === "" && lastName.trim() === "") {
        return "Not Indicated";
      } else {
        return firstName + " " + lastName;
      }
    },
  },

  {
    field: "companyName",
    headerName: "Company Name",
    width: 200,
    valueGetter: (params) => {
      return params.value ? params.value : "Not Indicated";
    },
  },
  {
    field: "companyAddress",
    headerName: "Company Address",
    width: 200,
    valueGetter: (params) => {
      return params.row.companyAddress
        ? params.row.companyAddress
        : "Not Indicated";
    },
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "mobileNumber",
    headerName: "Contact Number",
    width: 200,
    valueGetter: (params) => {
      return params.value ? params.value : "Not Indicated";
    },
  },
];

export const alumniColumns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "idNum", headerName: "ID Number", width: 130 },
  {
    field: "img",
    headerName: "Profile",
    width: 100,
    renderCell: (params) => {
      const imgSrc = params.row.profileImage
        ? `data:image/jpeg;base64,${params.row.profileImage}`
        : placeholder;
      return (
        <img
          src={imgSrc}
          alt=""
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      );
    },
  },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "alumniAddress",
    headerName: "Address",
    width: 150,
    valueGetter: (params) => {
      return params.value ? params.value : "Not Indicated";
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    valueGetter: (params) => {
      return params.value ? params.value : "Not Indicated";
    },
  },
  {
    field: "mobileNumber",
    headerName: "Phone",
    width: 130,
    valueGetter: (params) => {
      return params.value ? params.value : "Not Indicated";
    },
  },
  {
    field: "courses",
    headerName: "Program",
    width: 150,
    renderCell: (params) => {
      const program = params.row.courses
        ? params.row.courses.programCode
        : "No Program Indicated";
      return <div>{program}</div>;
    },
  },
  {
    field: "syGraduated",
    headerName: "Batch",
    width: 70,
    valueGetter: (params) => {
      return params.value ? params.value : "Not Indicated";
    },
  },
  {
    field: "isVerified",
    headerName: "Verified",
    width: 130,
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

export const alumniVerifyColumns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "idNum", headerName: "ID Number", flex: 1 },

  {
    field: "firstName",
    headerName: "First name",
    flex: 1,
  },
  {
    field: "lastName",
    headerName: "Last name",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
];

export const verifyColumns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "companyPerson",
    headerName: "Contact Person",
    width: 200,
    valueGetter: (params) => {
      const firstName = params.row.firstName || "";
      const lastName = params.row.lastName || "";

      if (firstName.trim() === "" && lastName.trim() === "") {
        return "Not Indicated";
      } else {
        return firstName + " " + lastName;
      }
    },
  },
  {
    field: "companyName",
    headerName: "Company Name",
    width: 200,
    valueGetter: (params) => {
      return params.value ? params.value : "Not Indicated";
    },
  },
  {
    field: "companyAddress",
    headerName: "Company Address",
    width: 200,
    valueGetter: (params) => {
      return params.value ? params.value : "Not Indicated";
    },
  },
  {
    field: "email",
    headerName: "Email ",
    width: 200,
  },
  {
    field: "mobileNumber",
    headerName: "Contact Number",
    width: 200,
    valueGetter: (params) => {
      return params.value ? params.value : "Not Indicated";
    },
  },
];

export const verifyJobColumn = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "position",
    headerName: "Title",
    width: 200,
    valueGetter: (params) => {
      return params.value ? params.value : "Not Indicated";
    },
  },
  {
    field: "location",
    headerName: "Job Location",
    width: 200,
    valueGetter: (params) => {
      return params.value ? params.value : "Not Indicated";
    },
  },
  {
    field: "salary",
    headerName: "Expected Salary",
    width: 200,
    valueGetter: (params) => {
      return params.value ? params.value : "Not Indicated";
    },
  },
  {
    field: "slots",
    headerName: "Slots ",
    width: 200,
    valueGetter: (params) => {
      return params.value ? params.value : "Not Indicated";
    },
  },
  {
    field: "companyName",
    headerName: "Posted by",
    width: 200,
    valueGetter: (params) => {
      if (params.row.company && params.row.company.companyName) {
        return params.row.company.companyName;
      } else {
        return "Not Indicated";
      }
    },
  },
  {
    field: "expiration_Date",
    headerName: "End of Application ",
    width: 200,
    valueGetter: (params) => {
      return params.value ? formatDate(params.value) : "Not Indicated";
    },
  },
];

export const ViewCandidatesColumns = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "img",
    headerName: "Profile",
    width: 100,
    renderCell: (params) => {
      const imgSrc = params.row.alumni.profileImage
        ? `data:image/jpeg;base64,${params.row.alumni.profileImage}`
        : placeholder;
      return (
        <img
          src={imgSrc}
          alt=""
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      );
    },
  },
  {
    field: "firstName",
    headerName: "First name",
    flex: 1,
    valueGetter: (params) => {
      return params.row.alumni.firstName;
    },
  },
  {
    field: "lastName",
    headerName: "Last name",
    flex: 1,
    valueGetter: (params) => {
      return params.row.alumni.lastName;
    },
  },
  {
    field: "alumniAddress",
    headerName: "Address",
    flex: 1,
    valueGetter: (params) => {
      return params.row.alumni.alumniAddress
        ? params.row.alumni.alumniAddress
        : "Not indicated";
    },
  },
  {
    field: "email",
    headerName: "Email",
    flex: 2,
    valueGetter: (params) => {
      return params.row.alumni.email;
    },
  },
  {
    field: "mobileNumber",
    headerName: "Contact Number",
    flex: 1,
    valueGetter: (params) => {
      return params.row.alumni.mobileNumber
        ? params.row.alumni.mobileNumber
        : "Not indicated";
    },
  },
  {
    field: "isEmployed",
    headerName: "Employment Status",
    width: 130,
    type: "boolean",
    renderCell: (params) => {
      const isVerified = params.row.alumni.isEmployed;
      return <div>{isVerified ? "Employed" : "Unemployed"}</div>;
    },
  },
  {
    field: "occupation",
    headerName: "Current Occupation",
    flex: 1,
    valueGetter: (params) => {
      return params.row.alumni.occupation
        ? params.row.alumni.occupation
        : "Not indicated";
    },
  },
  {
    field: "candidateDate",
    headerName: "Date Match",
    flex: 1,
    renderCell: (params) => (
      <div title={formatDate(params.value)}>{formatDate(params.value)}</div>
    ),
  },
  {
    field: "score",
    headerName: "Percentage Match",
    flex: 1,
    renderCell: (params) => (
      <div
        style={{
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {params.value}
      </div>
    ),
  },
  {
    field: "explanation",
    headerName: "Match Analyzation",
    flex: 2,
  },
];
