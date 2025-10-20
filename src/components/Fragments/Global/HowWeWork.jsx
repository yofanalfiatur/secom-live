"use client";
import React from "react";
import AmHowWorks from "@/components/Fragments/Alarm/AmHowWorks";
import AmReason from "@/components/Fragments/Alarm/AmReason";
import useIsDesktop from "@/components/Hooks/useIsDesktop";

const HowWeWork = ({ dataSection }) => {
  const isDesktop = useIsDesktop();

  return (
    <>
      {isDesktop ? (
        <AmHowWorks dataSection={dataSection} />
      ) : (
        <AmReason dataSection={dataSection} />
      )}
    </>
  );
};

export default HowWeWork;
