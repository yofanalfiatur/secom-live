"use client";

import AmBanner from "@/components/Fragments/Alarm/AmBanner";
import AmFAQ from "@/components/Fragments/Alarm/AmFAQ";
import AmHowWorks from "@/components/Fragments/Alarm/AmHowWorks";
import AmReason from "@/components/Fragments/Alarm/AmReason";
import OverviewGlobal from "@/components/Fragments/Global/OverviewGlobal";
import SolDtHighlight from "@/components/Fragments/Solution-Detail/SolDtHighlight";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import useIsDesktop from "@/components/Hooks/useIsDesktop";

export default function SolutionDetailPage({ params }) {
  const t = useTranslations();
  const isDesktop = useIsDesktop();
  //   const careerDetails = t.raw("CareerDetail"); // ambil array CareerDetail
  //   const career = careerDetails.find((c) => c.id === params.id);

  //   if (!career) {
  //     notFound();
  //   }

  return (
    <>
      {/* <AmBanner translationKey="AlarmBanner" />
      <OverviewGlobal translationKey="AlarmOverview" />
      {isDesktop ? (
        <AmHowWorks translationKey="AlarmReason" />
      ) : (
        <AmReason translationKey="AlarmReason" />
      )}
      <SolDtHighlight
        translationKey="SolutionDetailHighlight"
        SolDetailDocument="SolutionDetailDocument"
      />
      <AmFAQ translationKey="AlarmFAQ" /> */}
    </>
  );
}
