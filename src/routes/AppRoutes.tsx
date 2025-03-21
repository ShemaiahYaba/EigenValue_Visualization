import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Preloader from "@/components/Preloader";
import Layout from "@/components/Layout";
import React, { Suspense } from "react";

const Onboarding = React.lazy(() => import("@/pages/Onboarding/Onboarding"));
const NotFound = React.lazy(() => import("@/components/NotFound"));
const ComingSoon = React.lazy(() => import("@/components/ComingSoon"));
const MatrixPlayground = React.lazy(
  () => import("@/components/MatrixPlayGround")
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
              path="/matrix-playground"
              element={
                <Layout>
                  <MatrixPlayground />
                </Layout>
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
            />{" "}
            {/* 404 Not Found route */}
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default AppRoutes;
