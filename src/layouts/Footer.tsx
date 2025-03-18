import React from "react";
import "@/utils/ImageDeclaration.d.ts";
import LogoWhite from "@/components/LogoWhite.tsx";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white text-sm rounded-t-[70px]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}

          <div>
            <LogoWhite />
            <p className="mt-4 text-gray-200 font-[poppins]">
              Making the world a better place through Algebra
            </p>

            <div className="flex space-x-4 mt-4 bg-amber-300">
              <a href="#" className="hover:text-white" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="hover:text-white" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-white" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-white" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white font-semibold">Solutions</h3>
            <ul className="mt-4 space-y-2">
              {[
                "Marketing",
                "Analytics",
                "Automation",
                "Commerce",
                "Insights",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 lg:hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold">Support</h3>
            <ul className="mt-4 space-y-2">
              {["Submit ticket", "Documentation", "Guides"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 lg:hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="flex flex-col md:flex-row md:justify-between md:space-x-8">
            <div className="mt-6 md:mt-0">
              <h3 className="text-white font-semibold">Legal</h3>
              <ul className="mt-4 space-y-2">
                {["Terms of Service", "Privacy Policy", "License", "About"].map(
                  (item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-400 lg:hover:text-white">
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-500 ">
            &copy; {new Date().getFullYear()} Maverick BUILDS. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
