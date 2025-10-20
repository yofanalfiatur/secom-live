import TestFragment from "@/components/Fragments/TestFragments/TestFragment";
import { getPageData } from "@/libs/api";

export default async function TestPage(props) {
  const params = await props.params;
  const locale = params.locale;

  //server side
  const response = await getPageData("homepage");
  const pageData = response.data[locale];

  const sections = pageData.sections.reduce((acc, section) => {
    acc[section.component] = section.fields;
    return acc;
  }, {});

  const bannerData = Object.values(sections.home_banner?.slides || []);

  return <TestFragment data={bannerData} />;
}
