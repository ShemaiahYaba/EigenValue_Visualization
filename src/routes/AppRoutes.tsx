import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Preloader from "@/components/Preloader";
import Layout from "@/components/Layout";
import React, { Suspense } from "react";

const Onboarding = React.lazy(() => import("@/pages/Onboarding"));
const NotFound = React.lazy(() => import("@/components/NotFound"));
const Example = React.lazy(() => import("@/pages/Example"));

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
            <Route path="*" element={<NotFound />} />{" "}
            {/* 404 Not Found route */}
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default AppRoutes;
