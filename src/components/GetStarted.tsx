import React from "react";

interface GetStartedProps {
  onClick?: () => void;
}

const GetStarted: React.FC<GetStartedProps> = ({ onClick }) => {
  return (
    <>
      <div className="flex flex-col pt-10 items-center justify-center">
        <a
          href="/"
          onClick={onClick}
          className="rounded-2xl bg-black dark:bg-gray-900 px-6 py-4 text-sm font-semibold text-white shadow-xs md:hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:hover:bg-gray-700"
        >
          Get Started
        </a>
      </div>
    </>
  );
};

export default GetStarted;
