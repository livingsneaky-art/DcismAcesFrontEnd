import React, { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery, Button } from "@mui/material";
import Header from "../../../components/header";
import { useDispatch, useSelector } from "react-redux";
import { GetJobPosts } from "../../../services/admin_company";
import JobCard from "../../../components/cards";
import { SkipNext, SkipPrevious } from "@mui/icons-material";

const Jobs = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6); // Number of posts per page

  const posts = useSelector((state) => state.companiesSlice.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    GetJobPosts(dispatch);
  }, [dispatch]);

  const verifiedPost = posts.filter((post) => post.status);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = verifiedPost.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="JOB LIST" subtitle="See the different job postings." />
      {verifiedPost.length === 0 ? (
        <Typography>No Data Available</Typography>
      ) : (
        <Box
          my="20px"
          display="grid"
          gridTemplateColumns={`repeat(${isNonMobile ? 3 : 1}, minmax(0,1fr))`}
          rowGap="20px"
          columnGap="20px"
        >
          {currentPosts.map((job, key) => (
            <JobCard key={key} job={job} />
          ))}
        </Box>
      )}
      <Box display="flex" justifyContent="center">
        {currentPage > 1 && (
          <Button
            variant="contained"
            size="medium"
            style={{
              backgroundColor: "#221769",
              color: "#dbf5ee",
            }}
            onClick={prevPage}
            startIcon={<SkipPrevious />}
          >
            Previous
          </Button>
        )}
        {currentPage < Math.ceil(verifiedPost.length / postsPerPage) && (
          <Button
            variant="contained"
            size="medium"
            style={{
              backgroundColor: "#221769",
              color: "#dbf5ee",
            }}
            onClick={nextPage}
            startIcon={<SkipNext />}
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Jobs;
