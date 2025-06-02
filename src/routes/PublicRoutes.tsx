import React from "react";
import { Route } from "react-router-dom";
import Layout from "@/components/UiComponents/Layout";

const MadeEasy = React.lazy(() => import("@/pages/Onboarding/MadeEasy"));
const Onboarding = React.lazy(() => import("@/pages/Onboarding/Onboarding"));
const NotFound = React.lazy(() => import("@/components/UiComponents/NotFound"));
const ComingSoon = React.lazy(
  () => import("@/components/UiComponents/ComingSoon")
);

const PublicRoutes = () => {
  return (
    <Route path="/" element={<Layout />}>
      <Route index element={<Onboarding />} />
      <Route path="home/made-easy" element={<MadeEasy />} />
      <Route path="coming-soon" element={<ComingSoon />} />
      <Route path="404" element={<NotFound />} />
    </Route>
  );
};
export default PublicRoutes;
