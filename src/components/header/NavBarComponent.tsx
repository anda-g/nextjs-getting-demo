"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { AnimatePresence, motion, useScroll } from "motion/react";

export default function NavBarComponent() {
  const { scrollYProgress } = useScroll();
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const path = usePathname();
  return (
    <>
      {/* ====== TRIGGER SCROLL ===== */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="h-[2px] w-full bg-gradient-to-r from-blue-400 to-blue-500 z-60 fixed top-0 left-0 origin-left "
      ></motion.div>
      {/* ===== HEADER ===== */}
      <header className="w-full fixed top-0 z-50 h-16 px-5 md:px-20 flex justify-center items-center border-b-2 bg-white border-gray-200">
        <nav className="w-full flex items-center justify-between ">
          {/* ====== LOGO ====== */}
          <Link href={"/"} className="font-bold text-lg">
            Kuika
          </Link>
          {/* ====== MENU DESKTOP ====== */}
          <ul className="md:flex gap-5 z-50 hidden">
            {menuItem.map((menu, index) => (
              <motion.li whileTap={{ scale: 0.99 }} key={index}>
                <Link
                  className={`text-sm ${
                    path === menu.path ? "text-blue-600" : ""
                  }`}
                  href={menu.path}
                >
                  {menu.item}
                </Link>
              </motion.li>
            ))}
          </ul>
          {/* ====== LOGIN & SIGNUP DESKTOP ====== */}
          <ul className="md:flex hidden gap-3 items-center justify-center">
            <li
              onClick={() => setLoginOpen(!loginOpen)}
              className="text-sm cursor-pointer"
            >
              Log in
            </li>
            <li className="h-9 w-[1px] rounded-full bg-blue-100"></li>
            <li>
              <button
                onClick={() => setSignUpOpen(!signUpOpen)}
                className="bg-blue-600 rounded-md py-2 px-3 text-white text-sm cursor-pointer"
              >
                Sign up
              </button>
            </li>
          </ul>

          {/* ====== HAMBURGER MENU BUTTON ====== */}
          <button onClick={() => setNavOpen(!navOpen)} className="md:hidden">
            <svg
              className="w-6 h-6 text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0 }}
                transition={{ duration: 0.3 }}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </nav>
      </header>
      {/* ====== MOBILE MENU ====== */}
      {
        <AnimatePresence initial={false}>
          {navOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col fixed top-16 left-0 px-5 w-full h-fit pb-5 rounded-b-md bg-white z-10"
            >
              <ul className="flex flex-col ">
                {menuItem.map((menu, index) => (
                  <li key={index} className="py-2">
                    <Link
                      onClick={() => setNavOpen(false)}
                      className={`text-sm ${
                        path === menu.path ? "text-blue-600" : ""
                      }`}
                      href={menu.path}
                    >
                      {menu.item}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col justify-center">
                <li
                  onClick={() => {
                    setNavOpen(false);
                    setLoginOpen(!loginOpen);
                  }}
                  className="text-sm cursor-pointer py-2"
                >
                  Log in
                </li>
                <li>
                  <button
                    onClick={() => {
                      setNavOpen(false);
                      setSignUpOpen(!signUpOpen);
                    }}
                    className="rounded-md py-1.5 px-3 mt-2 text-white bg-black text-sm cursor-pointer"
                  >
                    Sign up
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      }
      {/* ====== LOGIN MODAL ====== */}
      {loginOpen && (
        <div
          id="authentication-modal"
          aria-hidden="true"
          className="fixed overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center w-full md:inset-0 h-full bg-neutral-500/50"
        >
          <motion.div
            initial={{ opacity: 0, y: 500, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative p-4 w-full max-w-md max-h-full"
          >
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Log in to our platform
                </h3>
                <button
                  onClick={() => setLoginOpen(false)}
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form className="space-y-4" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                          required
                        />
                      </div>
                      <label
                        htmlFor="remember"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                    <a
                      href="#"
                      className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                    >
                      Lost Password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Login to your account
                  </button>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered?{" "}
                    <span
                      onClick={() => {
                        setLoginOpen(false);
                        setSignUpOpen(true);
                      }}
                      className="text-blue-700 hover:underline dark:text-blue-500 cursor-pointer"
                    >
                      Create account
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {/* ====== SIGN UP MODAL ====== */}
      {signUpOpen && (
        <div
          id="authentication-modal"
          aria-hidden="true"
          className="fixed overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center w-full md:inset-0 h-full bg-neutral-500/50"
        >
          <motion.div
            initial={{ opacity: 0, y: 500, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative p-4 w-full max-w-md max-h-full"
          >
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Sign up to our platform
                </h3>
                <button
                  onClick={() => setSignUpOpen(false)}
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form className="space-y-4" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your name
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="cf-password"
                      id="cf-password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Sign up your account
                  </button>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Already have an account?{" "}
                    <span
                      onClick={() => {
                        setSignUpOpen(false);
                        setLoginOpen(true);
                      }}
                      className="text-blue-700 hover:underline dark:text-blue-500 cursor-pointer"
                    >
                      Log in
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

type Menu = {
  path: string;
  item: string;
};

const menuItem: Menu[] = [
  {
    path: "/",
    item: "Home",
  },
  {
    path: "/product",
    item: "Product",
  },
  {
    path: "/about",
    item: "About",
  },
];
