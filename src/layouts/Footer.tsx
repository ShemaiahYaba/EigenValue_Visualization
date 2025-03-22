import React from "react";
import "@/utils/ImageDeclaration.d.ts";
import LogoWhite from "@/components/LogoWhite.tsx";

const features = [
  {
    name: "EV-EV Made Easy",
    href: "/coming-soon",
  },
  {
    name: "EV-EV Properties & Concepts",
    href: "/coming-soon",
  },
  {
    name: "PCA",
    href: "/coming-soon",
  },
  {
    name: "Numerical Methods",
    href: "/coming-soon",
  },
  {
    name: "Matrix Playground",
    href: "/matrix-playground",
  },
];

const support = [
  { name: "Meet The Team", href: "/coming-soon" },
  { name: "Suggest a Feature", href: "/coming-soon" },
  { name: "Help Center", href: "/coming-soon" },
];

const legal = [
  { name: "Terms of Service", href: "/coming-soon" },
  { name: "Privacy Policy", href: "/coming-soon" },
  { name: "License", href: "/coming-soon" },
  { name: "About", href: "/coming-soon" },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-black dark:bg-gray-800 dark:outline dark:outline-gray-950 text-white text-sm rounded-t-[70px]">
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
            <h3 className="text-white font-semibold">Features</h3>
            <ul className="mt-4 space-y-2">
              {features.map((item) => (
                <li>
                  <a
                    href={item.href}
                    className="text-gray-400 lg:hover:text-white"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold">Support</h3>
            <ul className="mt-4 space-y-2">
              {support.map((item) => (
                <li>
                  <a
                    href={item.href}
                    className="text-gray-400 lg:hover:text-white"
                  >
                    {item.name}
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
                {legal.map((item) => (
                  <li>
                    <a
                      href={item.href}
                      className="text-gray-400 lg:hover:text-white"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
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
