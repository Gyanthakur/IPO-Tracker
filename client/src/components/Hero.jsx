import { Link } from "react-router-dom";
import {
  ChartLineUp,
  TrendUp,
  Calculator,
  ArrowUpRight,
  WhatsappLogo,
  Briefcase,
  ChartBar,
} from "@phosphor-icons/react";

export default function Hero() {
  return (
    <section className="mb-8 space-y-5">

      {/* Welcome Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            <ChartLineUp size={20} weight="bold" />
            IPO TRACKER
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Track your IPO investments smarter.
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Keep track of your applications, allotments, listing prices,
            profits and losses — all from one simple dashboard.
          </p>
        </div>

        {/* Quick Calculator */}
        <Link
          to="/calculator"
          className="group inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
        >
          <Calculator size={19} weight="bold" />
          Calculate P/L
          <ArrowUpRight
            size={17}
            weight="bold"
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* Applied */}
        <Link
          to="/applied"
          className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500"
        >
          <div className="flex items-start justify-between">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <Briefcase size={23} weight="duotone" />
            </div>

            <ArrowUpRight
              size={18}
              className="text-slate-400 transition group-hover:text-indigo-500"
            />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
            Applied IPOs
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            View and manage your IPO applications.
          </p>
        </Link>

        {/* Allotted */}
        <Link
          to="/allotted"
          className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500"
        >
          <div className="flex items-start justify-between">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <TrendUp size={23} weight="duotone" />
            </div>

            <ArrowUpRight
              size={18}
              className="text-slate-400 transition group-hover:text-emerald-500"
            />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
            Allotted IPOs
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track your allotted IPOs and listing performance.
          </p>
        </Link>

        {/* Analysis */}
        <Link
          to="/calculator"
          className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-purple-500"
        >
          <div className="flex items-start justify-between">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
              <ChartBar size={23} weight="duotone" />
            </div>

            <ArrowUpRight
              size={18}
              className="text-slate-400 transition group-hover:text-purple-500"
            />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
            P/L Analysis
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Calculate your potential profit or loss.
          </p>
        </Link>
      </div>

      {/* Help / Query */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5 dark:border-slate-800 dark:bg-slate-900/60">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400">
            <WhatsappLogo size={22} weight="fill" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Have a query?
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Feel free to contact me regarding any IPO Tracker query.
            </p>
          </div>
        </div>

        <a
          href="https://wa.me/918957818597?text=Hey%20%F0%9F%91%8B%2C%20I%20have%20a%20query%20regarding%20the%20IPO%20Tracker."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#20bd5a]"
        >
          Ask a Query
          <ArrowUpRight size={17} weight="bold" />
        </a>
      </div>
    </section>
  );
}