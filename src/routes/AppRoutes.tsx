import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Preloader from "@/components/UiComponents/Preloader";
import Layout from "@/components/UiComponents/Layout";
import Sidebar from "@/layouts/Sidebar";
import React, { Suspense } from "react";

const Onboarding = React.lazy(() => import("@/pages/Onboarding"));
const NotFound = React.lazy(() => import("@/components/UiComponents/NotFound"));
const ComingSoon = React.lazy(
  () => import("@/components/UiComponents/ComingSoon")
);
const MadeEasy = React.lazy(() => import("@/pages/MadeEasy"));
const Concepts = React.lazy(() => import("@/pages/Concepts"));
const PCA = React.lazy(() => import("@/pages/PCA"));
const Features = React.lazy(() => import("@/pages/Features"));
const MatrixPlayground = React.lazy(
  () => import("@/pages/Features/MatrixPlayground")
);

function AppRoutes() {
  return (
    <>
      <Router>
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Onboarding />
                </Layout>
              }
            />
            <Route
              path="/home/made-easy"
              element={
                <Layout>
                  <MadeEasy />
                </Layout>
              }
            />
            <Route
              path="/home/concepts"
              element={
                <Layout>
                  <Concepts />
                </Layout>
              }
            />
            <Route
              path="/home/pca"
              element={
                <Layout>
                  <PCA />
                </Layout>
              }
            />

            <Route
              path="/features"
              element={
                <Sidebar>
                  <Features />
                </Sidebar>
              }
            />
            <Route
              path="/matrix-playground"
              element={
                <Sidebar>
                  <MatrixPlayground />
                </Sidebar>
              }
            />

            <Route
              path="/coming-soon"
              element={
                <Layout>
                  <ComingSoon />
                </Layout>
              }
            />
            <Route
              path="*"
              element={
                <Layout>
                  <NotFound />
                </Layout>
              }
            />
            <Route
              path="/404"
              element={
                <Layout>
                  <NotFound />
                </Layout>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default AppRoutes;
