"use-client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import { Indie_Flower } from "next/font/google";

interface NavLink {
  title: string;
  path: string;
}
const indieFlower = Indie_Flower({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-indieFlower",
});

const navLinks: NavLink[] = [
  {
    title: "About",
    path: "#about",
  },
  {
    title: "CV",
    path: "#cv",
  },
  {
    title: "Gallery",
    path: "#gallery",
  },
];

const Navbar: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-10">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <div className={indieFlower.variable}>
          <Link
            href={"/"}
            className="font-indieFlower text-xl md:text-3xl text-white font-semibold"
          >
            Sepy
          </Link>
        </div>
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
};

export default Navbar;
