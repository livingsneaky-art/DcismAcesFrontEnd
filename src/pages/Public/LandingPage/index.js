import React from "react";
import Navbar from "../../../components/landingpage/navbar";
import HomeBanner from "../../../components/landingpage/homebanner";
import Companies from "../../../components/landingpage/companies";
import Discover from "../../../components/landingpage/discover";
import Category from "../../../components/landingpage/category";
import Learn from "../../../components/landingpage/learn";
import GooglePlay from "../../../components/landingpage/googleplay";
import Footer from "../../../components/landingpage/footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HomeBanner />
      <Companies />
      <Discover />
      <Category />
      <Learn />
      <GooglePlay />
      <Footer />
    </>
  );
};

export default LandingPage;
