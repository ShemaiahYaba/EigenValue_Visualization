import React from "react";

const Onboarding: React.FC = () => {
  return (
    <>
      <div className="flex items-center justify-center h-full bg-">
        <p className="dark:text-white text-center text-6xl">
          Welcome to <p className="font-[montez] font-bold">MatrixLAB</p>
        </p>
      </div>
    </>
  );
};

export default Onboarding;
export const dynamic = "force-dynamic"; // This page should always be re-rendered on the server
