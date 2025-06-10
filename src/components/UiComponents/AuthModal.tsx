import React from "react";
import AuthForm from "@/pages/Onboarding/AuthForm";

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(2px)",
      }}
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-blue-500 hover:text-gray-700 text-2xl"
          aria-label="Close"
        >
          &times;
        </button>
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthModal;
