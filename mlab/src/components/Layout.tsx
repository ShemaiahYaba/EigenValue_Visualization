import React from "react";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}

      {/* Content Area */}
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-grow p-4 overflow-y-auto">{children}</main>

        {/* Footer */}
        <div className="relative">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
