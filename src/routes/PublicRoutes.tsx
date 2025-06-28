// src/routes/PublicRoutes.tsx
import React from "react";
import { Route } from "react-router-dom";
import Layout from "@/components/UiComponents/Layout";

const Onboarding = React.lazy(() => import("@/pages/Onboarding/Onboarding"));
const MadeEasy = React.lazy(() => import("@/pages/Onboarding/Hero"));
const Concepts = React.lazy(() => import("@/pages/Concepts"));
const PCA = React.lazy(() => import("@/pages/PCA"));
const ComingSoon = React.lazy(
  () => import("@/components/UiComponents/ComingSoon")
);
const NotFound = React.lazy(() => import("@/components/UiComponents/NotFound"));
const Auth = React.lazy(() => import("@/pages/Onboarding/AuthForm"));
const AboutUs = React.lazy(() => import("@/pages/Onboarding/AboutUs"));
const Resource = React.lazy(() => import("@/pages/Onboarding/Resource"));


const PublicRoutes = () => (
  <Route path="/" element={<Layout />}>
    <Route index element={<Onboarding />} />
    <Route path="auth" element={<Auth />} />
    <Route path="home/made-easy" element={<MadeEasy />} />
    <Route path="home/concepts" element={<Concepts />} />
    <Route path="home/pca" element={<PCA />} />
    <Route path="/about-us" element={<AboutUs />} />
    <Route path="/resources" element={<Resource />} />
    <Route path="coming-soon" element={<ComingSoon />} />
    <Route path="404" element={<NotFound />} />
    
  </Route>
);

export default PublicRoutes;
