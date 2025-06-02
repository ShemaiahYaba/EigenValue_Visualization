"use client";

import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  CalculatorIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  QuestionMarkCircleIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { TbMatrix } from "react-icons/tb";
import Logo from "@/components/UiComponents/Logo";
import { SearchAndTheme } from "@/layouts/ThemeIcon";

const products = [
  {
    name: "EV-EV Made Easy",
    description: "Understand EigenValues & EigenVectors better",
    href: "/home/made-easy",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "EV-EV Properties & Concepts",
    description: "View some insightful visualizations",
    href: "/home/concepts",
    icon: ChartPieIcon,
  },
  {
    name: "PCA",
    description: "Understand PCA concepts",
    href: "/home/pca",
    icon: SquaresPlusIcon,
  },
  {
    name: "Numerical Methods",
    description: "Visual Convergence of EigenValues",
    href: "/home/numerical-methods",
    icon: CalculatorIcon,
  },
  {
    name: "Matrix Playground",
    description: "Visualize your own matrix and gain insights",
    href: "/home/matrix-playground",
    icon: TbMatrix,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "/coming-soon", icon: PlayCircleIcon },
  { name: "Need Help", href: "/coming-soon", icon: QuestionMarkCircleIcon },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gray-50 outline outline-gray-100 dark:bg-gray-800 dark:outline-gray-950 ">
      <nav
        aria-label="Global"
        className="flex mx-auto max-w-7xl items-center justify-evenly py-2 lg:md:sm:py-4 px-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Logo />
        </div>
        <div className="lg:md:sm:hidden flex justify-end">
          <SearchAndTheme />
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6 dark:text-white" />
          </button>
        </div>

        <PopoverGroup className="hidden lg:flex lg:gap-x-12 ">
          <a
            href="/"
            className="text-sm/6 font-semibold text-gray-900 dark:text-white"
          >
            Home
          </a>
          <a
            href="coming-soon"
            className="text-sm/6 font-semibold text-gray-900 dark:text-white"
          >
            About Us
          </a>
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 dark:text-white">
              Features
              <ChevronDownIcon
                aria-hidden="true"
                className="size-5 flex-none text-gray-400"
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white dark:bg-gray-800 ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div className="flex size-11 flex-none items-center justify-center rounded-xl bg-gray-50 group-hover:bg-white">
                      <item.icon
                        aria-hidden="true"
                        className="size-6 text-gray-600 group-hover:text-gray-600"
                      />
                    </div>
                    <div className="flex-auto">
                      <a
                        href={item.href}
                        className="block font-semibold text-gray-900 dark:text-white"
                      >
                        {item.name}
                        <span className="absolute inset-0 " />
                      </a>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50 dark:bg-gray-900">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    {item.name}
                    <item.icon
                      aria-hidden="true"
                      className="size-5 flex-none text-gray-400"
                    />
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
          <a
            href="coming-soon"
            className="text-sm/6 font-semibold text-gray-900 dark:text-white"
          >
            Meet the Team
          </a>
        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-6">
          <SearchAndTheme />
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-gray-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <div className="ml-4">
              <Logo />
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon
                aria-hidden="true"
                className="size-6 dark:text-white"
              />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6 ">
                <a
                  href="coming-soon"
                  className="-mx-3 block rounded-lg px-3 py-1 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700"
                >
                  About Us
                </a>

                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-1 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                    Features
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-5 flex-none group-data-open:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-1 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>

                <a
                  href="coming-soon"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700"
                >
                  Meet the Team
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};
export default Header;
