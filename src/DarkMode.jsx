import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MoonIcon, SunIcon, DesktopComputerIcon } from "@heroicons/react/solid";

export default function DarkMode() {
  return (
    <div className="fixed top-0 right-0 flex pt-4 pr-2 sm:pr-4">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full p-1 bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition delay-75 hover:scale-110 hover:text-gray-400 dark:hover:text-white">
            <MoonIcon className="h-7 w-7" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    onClick={() => {
                      localStorage.theme = "light";
                      document.documentElement.classList.remove("dark");
                    }}
                  >
                    <SunIcon className="w-7 h-7 mr-2" />
                    Light Mode
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    onClick={() => {
                      localStorage.theme = "dark";
                      document.documentElement.classList.add("dark");
                    }}
                  >
                    <MoonIcon className="w-7 h-7 mr-2" />
                    Tribe Mode
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    onClick={() => {
                      localStorage.removeItem("theme");
                      if (
                        localStorage.theme === "dark" ||
                        (!("theme" in localStorage) &&
                          window.matchMedia("(prefers-color-scheme: dark)")
                            .matches)
                      ) {
                        document.documentElement.classList.add("dark");
                      } else {
                        document.documentElement.classList.remove("dark");
                      }
                    }}
                  >
                    <DesktopComputerIcon className="w-7 h-7 mr-2" />
                    Use System Settings
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
