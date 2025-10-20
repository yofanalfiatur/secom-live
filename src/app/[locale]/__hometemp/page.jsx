"use client";
import HomeAbout from "@/components/Fragments/Home/HAbout";
import HomeBanner from "@/components/Fragments/Home/HBanner";
import HomeSegment from "@/components/Fragments/Home/HSegment";
import HomeValue from "@/components/Fragments/Home/HValue";
import React from "react";

const HomePage = () => {
  return (
    <>
      <HomeBanner translationKey="HomeBanner" />
      <HomeValue translationKey="HomeValue" />
      <HomeSegment translationKey="HomeSegment" />
      <HomeAbout translationKey="HomeAbout" />
    </>
  );
};

export default HomePage;
