// Page Alarm Landing

"use client";

import AmApps from "@/components/Fragments/Alarm/AmApps";
import AmBanner from "@/components/Fragments/Alarm/AmBanner";
import AmFAQ from "@/components/Fragments/Alarm/AmFAQ";
import AmPackage from "@/components/Fragments/Alarm/AmPackage";
import AmProducts from "@/components/Fragments/Alarm/AmProducts";
import AmProtect from "@/components/Fragments/Alarm/AmProtect";
import AmTrusted from "@/components/Fragments/Alarm/AmTrusted";
import AmPlacement from "@/components/Fragments/Alarm/AmPlacement";
import AmReason from "@/components/Fragments/Alarm/AmReason";
import FloatButton from "@/components/Elements/FloatButton";
import useIsDesktop from "@/components/Hooks/useIsDesktop";
import AmHowWorks from "@/components/Fragments/Alarm/AmHowWorks";
import OverviewGlobal from "@/components/Fragments/Global/OverviewGlobal";

const AlarmLanding = () => {
  const isDesktop = useIsDesktop();
  return (
    <>
      {/* business */}
      {/* <AmBanner translationKey="AlarmBanner" />
      <OverviewGlobal translationKey="AlarmOverview" />
      {isDesktop ? (
        <AmHowWorks translationKey="AlarmReason" />
      ) : (
        <AmReason translationKey="AlarmReason" />
      )}
      <AmProtect translationKey="AlarmProtect" />
      <AmProducts
        translationKey="AlarmProduct"
        listProducts="ProductDetails"
        typeProduct="business"
      />
      <AmPlacement
        translationKey="AlarmCorners"
        listProducts="ProductDetails"
        pinPlacement="pinBusiness"
      />
      <AmApps translationKey="AlarmApps" />
      <AmTrusted translationKey="AlarmTrusted" />
      <AmPackage
        translationKey="AlarmPackage"
        differences="AlarmDifferences"
        listPackages="BusinessPackages"
        packagesBuy="BusinessPackagesBuy"
        packagesRent="BusinessPackagesRent"
      />
      <AmFAQ translationKey="AlarmFAQ" />
      <FloatButton /> */}
    </>
  );
};

export default AlarmLanding;
