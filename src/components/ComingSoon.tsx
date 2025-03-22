import React from "react";
import coming_soon from "@/assets/illustrations/coming-soon.svg";

const ComingSoon: React.FC = () => {
  return (
    <>
      <div className="min-h-full lg:md:sm:grid lg:md:sm:grid-cols-2 lg:md:sm:gap-0 lg:px-32">
        <main className="grid place-items-center p-6 sm:py-32 lg:px-8 lg:md:m-0 sm:-mt-30">
          <div className="text-center">
            <p className="text-3xl font-[montez] text-center font-semibold text-gray-900 dark:text-gray-50">
              Hey, Mathematician
              <span className="">🚧</span>
            </p>
            <h1 className="mt-6 text-5xl font-semibold tracking-tighter text-balance text-black dark:text-white lg:md:sm:text-6xl ">
              Hang tight, we're on our way!
            </h1>
            <p className="mt-6 text-base font-medium text-pretty text-gray-600 dark:text-gray-400 sm:text-xl/8 text-center">
              The MLAB development team is working really hard to ensure the
              best is delivered to our most valued user.
            </p>
            <div className="mt-6 flex items-center justify-center gap-x-6">
              <a
                href="/"
                className="rounded-xl bg-black dark:bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs md:hover:bg-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:hover:bg-gray-700"
              >
                Go back home
              </a>
              <a
                href="/coming-soon"
                className="text-sm font-semibold text-gray-900 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-50"
              >
                Suggest a feature <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </main>
        <div className="flex items-center justify-center py-2 sm:-mt-28 lg:md:m-0">
          <div className="rounded-full bg-white dark:bg-gray-50 flex items-center justify-center w-80 h-80 lg:w-[512px] lg:h-[512px] md:sm:w-96 md:sm:h-96 shadow-lg dark:shadow-gray-700">
            <img
              src={coming_soon}
              alt="Coming Soon"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ComingSoon;
