import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import {
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  useClerk,
} from "@clerk/clerk-react";

import {
  Sun,
  Moon,
  ChartLineUp,
  Plus,
} from "@phosphor-icons/react";

import { useTheme } from "../context/ThemeContext";
import { useIpoModal } from "../context/IpoModalContext";

export default function Navbar() {
  const { user } = useUser();
  const { openSignIn, openSignUp } = useClerk();

  const { theme, toggle } = useTheme();
  const { openAdd } = useIpoModal();

  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const isAdmin = user?.publicMetadata?.role === "admin";
  const isDark = theme === "dark";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const linkCls = ({ isActive }) =>
    `block rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-indigo-600 text-white"
        : isDark
          ? "text-slate-300 hover:bg-white/10 hover:text-white"
          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    }`;

  const links = (
    <>
      <SignedIn>
        <NavLink to="/" end className={linkCls}>
          Dashboard
        </NavLink>

        <NavLink to="/applied" className={linkCls}>
          Applied
        </NavLink>

        <NavLink to="/allotted" className={linkCls}>
          Allotted
        </NavLink>

        <NavLink to="/not-allotted" className={linkCls}>
          Not Allotted
        </NavLink>

        <NavLink to="/calculator" className={linkCls}>
          Calculator
        </NavLink>

        {isAdmin && (
          <NavLink to="/admin" className={linkCls}>
            Admin
          </NavLink>
        )}
      </SignedIn>
    </>
  );

  return (
    <header
      className={`sticky top-0 z-40 border-b shadow-sm transition-colors ${
        isDark
          ? "border-slate-800 bg-slate-900 text-white"
          : "border-slate-200 bg-white text-slate-900"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-2.5 sm:px-6">

        {/* Logo */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xl font-bold"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white">
              <ChartLineUp size={22} weight="bold" />
            </span>

            <span className={isDark ? "text-white" : "text-slate-900"}>
              IPO<span className="text-indigo-600">Tracker</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="ml-4 hidden flex-1 items-center gap-1 lg:flex">
          {links}
        </nav>

        {/* Right Section */}
        <div className="ml-auto flex items-center gap-2">

          {/* Login / Sign Up - Logged Out */}
          <SignedOut>
            <button
              type="button"
              onClick={() => openSignIn()}
              className={`inline-flex rounded-lg px-3 py-2 text-sm font-semibold transition ${
                isDark
                  ? "text-slate-300 hover:bg-white/10 hover:text-white"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => openSignUp()}
              className="inline-flex items-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Sign Up
            </button>
          </SignedOut>

          {/* Add IPO - Logged In */}
          <SignedIn>
            <button
              type="button"
              onClick={openAdd}
              className="btn btn-primary"
              aria-label="Add IPO"
            >
              <Plus size={18} weight="bold" />

              <span className="hidden sm:inline">
                Add IPO
              </span>
            </button>
          </SignedIn>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggle}
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition ${
              isDark
                ? "border-white/25 hover:bg-white/10"
                : "border-slate-300 hover:bg-slate-100"
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun size={20} weight="bold" />
            ) : (
              <Moon size={20} weight="bold" />
            )}
          </button>

          {/* Clerk User */}
          <SignedIn>
            <UserButton />
          </SignedIn>

          {/* Mobile Menu */}
          <SignedIn>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className={`grid h-9 w-9 place-items-center rounded-lg transition lg:hidden ${
                isDark
                  ? "hover:bg-white/10"
                  : "hover:bg-slate-100"
              }`}
            >
              {open ? (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              ) : (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </SignedIn>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <nav
          className={`flex flex-col gap-1 border-t px-3 pb-3 pt-2 lg:hidden ${
            isDark
              ? "border-white/10"
              : "border-slate-200"
          }`}
        >
          {links}
        </nav>
      )}
    </header>
  );
}