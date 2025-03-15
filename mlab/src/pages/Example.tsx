import React, { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";

const LocalPreloader = () => <Preloader />;

const CustomButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
}> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="px-6 py-3 mt-6 text-lg font-bold text-white bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform"
  >
    {children}
  </button>
);

const MlabUiMockup = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-blue-900 to-purple-900 text-white">
      {loading ? (
        <LocalPreloader />
      ) : (
        <div className="text-center">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            Welcome to MatrixLAB
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Interactive visualization of eigenvalues & eigenvectors.
          </p>
          <CustomButton onClick={() => alert("Let’s go!")}>
            Get Started
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default MlabUiMockup;
