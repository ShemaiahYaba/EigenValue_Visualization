import GetStarted from "@/components/UiComponents/GetStarted";
import React from "react";

const Onboarding: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <p className="dark:text-white text-center text-6xl">
          Welcome to <p className="font-[montez] font-bold">MatrixLAB</p>
        </p>
        <GetStarted />
      </div>
    </>
  );
};

export default Onboarding;
export const dynamic = "force-dynamic"; // This page should always be re-rendered on the server
