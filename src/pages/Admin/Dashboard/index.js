import React, { useEffect } from "react";
import "./index.scss";
import TopBox from "../../../components/charts/topBox";
import { Box } from "@mui/material";
import ChartBox from "../../../components/charts/chartBox";
import PieChartBox from "../../../components/charts/pieChartBox";
import PieGraphBox from "../../../components/charts/pieGraphBox";
import Header from "../../../components/header";
import LineChartBox from "../../../components/charts/lineChartBox";
import { useDispatch, useSelector } from "react-redux";
import { getStatistics } from "../../../services/dashboard";
import userIcon from "../../../assets/userIcon.svg";
import alumniIcon from "../../../assets/alumniIcon.svg";
import companyIcon from "../../../assets/companyIcon.svg";
import { GetAdminProfile } from "../../../services/admin_alumni";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    totalAlumni,
    totalCompany,
    sumOfUsers,
    totalEmployed,
    totalUnEmployed,
    commonJobs,
    totalEmployedByProgram,
  } = useSelector((state) => state.adminDashboard);

  useEffect(() => {
    getStatistics(dispatch);
    GetAdminProfile(dispatch);
  }, [dispatch]);

  const generateChartData = (data) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const averageUsersPerDay = data / 7;

    const chartData = daysOfWeek.map((day) => ({
      name: day,
      users: Math.round(averageUsersPerDay),
    }));

    return chartData;
  };

  const chartBoxUsers = {
    color: "#8884d8",
    icon: userIcon,
    title: "Total Users",
    number: sumOfUsers,
    link: "/dashboard",
    dataKey: "users",
    percentage: 100,
    chartData: generateChartData(sumOfUsers),
  };

  const chartBoxAlumni = {
    color: "skyblue",
    icon: alumniIcon,
    title: "Total Alumni",
    number: totalAlumni,
    link: "/alumni",
    dataKey: "alumni",
    percentage:
      totalAlumni !== 0 ? ((totalAlumni / sumOfUsers) * 100).toFixed(2) : 0,
    chartData: generateChartData(totalAlumni),
  };

  const chartBoxCompanies = {
    color: "gold",
    icon: companyIcon,
    title: "Total Companies",
    number: totalCompany,
    link: "/companies",
    dataKey: "companies",
    percentage:
      totalCompany !== 0 ? ((totalCompany / sumOfUsers) * 100).toFixed(2) : 0,
    chartData: generateChartData(totalCompany),
  };

  const pieChartBox = {
    data: [
      { name: "Employed", value: totalEmployed, color: "#5A6ACF" },
      { name: "UnEmployed", value: totalUnEmployed, color: "#8593ED" },
    ],
  };

  const pieGraphBox = {
    data: totalEmployedByProgram.map(({ programCode, totalCount }) => ({
      course: `Course ${programCode}`,
      employmentRate: totalCount,
    })),
  };

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Header title="Dashboard" subtitle="Graphs and Charts" />
          {/* <Box display="flex" gap="15px">
                        <Button
                            variant="contained"
                            size="medium"
                            style={{ backgroundColor: "#221769" }}
                        >
                            Export Report
                        </Button>
                    </Box> */}
        </Box>
        <div className="dashboard">
          <div className="box1">
            <div className="container">
              <ChartBox {...chartBoxAlumni} />
              <ChartBox {...chartBoxCompanies} />
              <ChartBox {...chartBoxUsers} />
            </div>
          </div>
          <div className=" box box2">
            <PieChartBox {...pieChartBox} />
          </div>
          <div className=" box box2">
            <PieGraphBox {...pieGraphBox} />
          </div>
          <div className=" box box2">
            <TopBox data={commonJobs} />
          </div>
          <div className=" box box2">
            <LineChartBox />
          </div>
        </div>
      </Box>
    </>
  );
};

export default Dashboard;
