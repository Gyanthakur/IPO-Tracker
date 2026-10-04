import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import {
  FacebookLogo,
  TwitterLogo,
  LinkedinLogo,
  GithubLogo,
  GitBranch,
  WhatsappLogo,
  ChartLineUp,
  ArrowUpRight,
} from "@phosphor-icons/react";

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/profile.php?id=100026766931684",
      icon: FacebookLogo,
      color: "text-[#1877F2]",
    },
    {
      name: "X",
      url: "https://x.com/gps_96169",
      icon: TwitterLogo,
      color: isDark ? "text-white" : "text-black",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/gyan-pratap-singh-275785236/",
      icon: LinkedinLogo,
      color: "text-[#0A66C2]",
    },
    {
      name: "GitHub",
      url: "https://github.com/gyanthakur",
      icon: GithubLogo,
      color: isDark ? "text-white" : "text-black",
    },
    {
      name: "Edemy LMS",
      url: "https://github.com/Gyanthakur/Edemy-LMS",
      icon: GitBranch,
      color: "text-red-500",
    },
    {
  name: "WhatsApp",
  url: "https://wa.me/918957818597?text=Hey%20Gyan%20%F0%9F%91%8B%2C%20I%20have%20a%20query%20regarding%20the%20IPO%20Tracker.",
  icon: WhatsappLogo,
  color: "text-[#25D366]",
},
  ];

  return (
    <footer
      className={`border-t transition-colors duration-300 ${
        isDark
          ? "border-slate-800 bg-slate-950 text-slate-300"
          : "border-slate-200 bg-slate-50 text-slate-600"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">

        {/* Main Footer */}
        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xl font-bold"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white">
                <ChartLineUp size={22} weight="bold" />
              </span>

              <span
                className={isDark ? "text-white" : "text-slate-900"}
              >
                IPO<span className="text-indigo-600">Tracker</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6">
              Track upcoming IPOs, monitor market trends, and stay updated
              with the latest IPO information — all in one place.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    aria-label={social.name}
                    className={`group grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 hover:-translate-y-1 hover:scale-110 ${
                      isDark
                        ? "border-slate-700 bg-slate-900 hover:border-slate-600"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <Icon
                      size={21}
                      weight="fill"
                      className={`${social.color} transition-transform duration-300 group-hover:scale-110`}
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className={`mb-4 text-sm font-semibold uppercase tracking-wider ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Quick Links
            </h3>

            <div className="space-y-3 text-sm">
              <Link
                to="/"
                className="block transition-colors hover:text-indigo-600"
              >
                Home
              </Link>

              <Link
                to="/ipos"
                className="block transition-colors hover:text-indigo-600"
              >
                IPOs
              </Link>

              <Link
                to="/watchlist"
                className="block transition-colors hover:text-indigo-600"
              >
                Watchlist
              </Link>

              <Link
                to="/market"
                className="block transition-colors hover:text-indigo-600"
              >
                Market
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3
              className={`mb-4 text-sm font-semibold uppercase tracking-wider ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Connect With Me
            </h3>

            <p className="max-w-xs text-sm leading-6">
              Follow me on social platforms for projects, development
              updates, and tech content.
            </p>

            <a
              href="https://github.com/gyanthakur"
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 ${
                isDark
                  ? "bg-white/10 text-white hover:bg-white/15"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              View GitHub
              <ArrowUpRight size={17} weight="bold" />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div
          className={`mt-10 flex flex-col gap-3 border-t pt-6 text-sm sm:flex-row sm:items-center sm:justify-between ${
            isDark ? "border-slate-800" : "border-slate-200"
          }`}
        >
          <p>
            © {new Date().getFullYear()} IPO Tracker. All rights reserved.
          </p>

          <p>
            Built with ❤️ by{" "}
            <span
              className={`font-semibold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Gyan Pratap Singh
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;