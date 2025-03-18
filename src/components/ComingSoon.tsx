import React from "react";
import coming_soon from "@/assets/illustrations/coming-soon.svg";

const ComingSoon: React.FC = () => {
  return (
    <>
      <div className="bg-white lg:md:sm:grid lg:md:sm:grid-cols-2 lg:md:sm:gap-0 lg:md:sm:-mt-20 lg:px-32 lg:-mb-4 ">
        <main className="grid min-h-full place-items-center bg-white dark:bg-gray-800 px-6 py-24 sm:py-32 lg:px-8 -mt-24 lg:md:m-0 sm:-mt-30">
          <div className="text-center">
            <p className="text-4xl font-[montez] text-center font-semibold text-gray-900">
              <span className="text-4xl text-gray-900 font-bold">🚧</span>
              Hey, Champ...
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tighter lg:tracking-tight md:tracking-tight sm:tracking-tight text-balance text-black sm:text-7xl">
              Hang tight, we're on our way!
            </h1>
            <p className="mt-6 text-lg font-medium text-pretty text-gray-600 md:text-gray-500 lg:md:text-gray-500 sm:md:text-gray-500 sm:text-xl/8 lg:text-center md:text-center sm:text-center text-left">
              The MLAB development team is working really hard to ensure the
              best is delivered to our most valued user.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/"
                className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs md:hover:bg-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
                Go back home
              </a>
              <a href="#" className="text-sm font-semibold text-gray-900">
                Suggest a feature <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </main>
        <div className="bg:flex lg:items-center lg:justify-center lg:py-24 lg:px-8 md:flex md:items-center md:justify-center md:py-24 md:px-10 sm:flex sm:items-center sm:justify-center sm:py-24 md:-mt-20">
          <img
            src={coming_soon}
            alt="coming-soon"
            className="dark:hidden lg:w-auto lg:h-auto md:w-auto md:h-auto sm:w-auto sm:h-auto lg:m-0 md:-mt-30 sm:-mt-52 sm:-mb-20 -mt-20"
          />
          <div className="hidden dark:relative dark:w-96 dark:h-96 dark:bg-white dark:rounded-full dark:flex dark:items-center dark:justify-center">
            <img
              src={coming_soon}
              alt="coming-soon"
              className="lg:w-auto lg:h-auto md:w-auto md:h-auto sm:w-auto sm:h-auto lg:m-0 md:-mt-30 sm:-mt-52 sm:-mb-20 -mt-20"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ComingSoon;
