import React from "react";

const Onboarding: React.FC = () => {
  return (
    <>
      <div className="dark:bg-gray-800 dark:text-white bg-white text-black h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4 p-2">
          Welcome to the Onboarding Page
        </h1>
        <p className="mb-8 pl-2 pr-28 md:p-0 lg:p-0 ">
          Please follow the instructions to complete your setup.
        </p>
        <h1 className="mb-8 text-8xl font-extralight italic md:text-9xl lg:text-9xl">
          Satoshi
        </h1>
      </div>
    </>
  );
};

export default Onboarding;
