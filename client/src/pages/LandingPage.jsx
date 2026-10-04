import {
  ChartLineUp,
  TrendUp,
  Calculator,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  ChartBar,
  Target,
  CurrencyInr,
} from "@phosphor-icons/react";

import { useClerk } from "@clerk/clerk-react";

export default function LandingPage() {
  const { openSignIn, openSignUp } = useClerk();

  return (
    <div className="space-y-20 py-6 sm:py-10">

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-14 shadow-sm sm:px-10 lg:px-16 dark:border-slate-800 dark:bg-slate-900">

        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
            <ChartLineUp size={19} weight="bold" />
            Smart IPO Tracking
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            Your IPOs.
            <span className="text-indigo-600"> Your Investments.</span>
            <br />
            One Simple Tracker.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-400">
            IPO Tracker helps you keep all your IPO applications, allotments,
            profits and losses in one place — so you always know where your
            money is and how your investments are performing.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            {/* Get Started */}
            <button
              type="button"
              onClick={() => openSignUp()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
            >
              Get Started
              <ArrowRight size={19} weight="bold" />
            </button>

            {/* Login */}
            <button
              type="button"
              onClick={() => openSignIn()}
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Login to Tracker
            </button>

          </div>
        </div>
      </section>

      {/* Problem */}
      <section>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Why IPO Tracker?
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            Managing IPO investments shouldn't be complicated.
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-400">
            When you apply for multiple IPOs, it becomes difficult to remember
            which IPOs you applied for, which ones were allotted, and how much
            profit or loss you made after listing.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          <InfoCard
            icon={<ChartBar size={25} weight="duotone" />}
            title="Too Many IPOs"
            description="Keep track of all your IPO applications without maintaining spreadsheets or notes."
          />

          <InfoCard
            icon={<Target size={25} weight="duotone" />}
            title="Hard to Track Results"
            description="Know exactly which IPOs were allotted and which applications were not."
          />

          <InfoCard
            icon={<CurrencyInr size={25} weight="duotone" />}
            title="Profit & Loss"
            description="Calculate your potential listing gains or losses quickly and easily."
          />
        </div>
      </section>

      {/* Features */}
      <section>
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Features
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            Everything you need to track your IPOs
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Feature
            icon={<ChartLineUp size={25} weight="duotone" />}
            title="Track Applications"
            text="Record and manage all your IPO applications from one dashboard."
          />

          <Feature
            icon={<CheckCircle size={25} weight="duotone" />}
            title="Allotment Tracking"
            text="Separate your allotted and non-allotted IPOs so you always know the result."
          />

          <Feature
            icon={<TrendUp size={25} weight="duotone" />}
            title="Listing Performance"
            text="Track how your allotted IPOs perform after listing."
          />

          <Feature
            icon={<Calculator size={25} weight="duotone" />}
            title="P/L Calculator"
            text="Calculate your estimated profit or loss based on issue and selling prices."
          />

          <Feature
            icon={<ShieldCheck size={25} weight="duotone" />}
            title="Simple & Private"
            text="Keep your investment tracking organized in your own account."
          />

          <Feature
            icon={<ChartBar size={25} weight="duotone" />}
            title="Clean Dashboard"
            text="Get a simple overview of your IPO activity without unnecessary complexity."
          />
        </div>
      </section>

      {/* Motivation */}
      <section className="rounded-3xl border border-indigo-200 bg-indigo-50 px-6 py-12 text-center dark:border-indigo-500/20 dark:bg-indigo-500/5 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-indigo-600 text-white">
            <Target size={25} weight="bold" />
          </div>

          <h2 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">
            The motivation behind IPO Tracker
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-400">
            IPO investing can be exciting, but keeping track of multiple
            applications, allotments and returns can quickly become confusing.
            I wanted to build a simple tool that makes this process easier.
          </p>

          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
            IPO Tracker was created with one simple idea:
            <span className="font-semibold text-slate-900 dark:text-white">
              {" "}make IPO investment tracking simple, organized and easy to understand.
            </span>
          </p>
        </div>
      </section>

      {/* How it works */}
      <section>
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            How It Works
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            Start tracking in three simple steps
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Step
            number="01"
            title="Create your account"
            text="Sign up and create your personal IPO tracking space."
          />

          <Step
            number="02"
            title="Add your IPOs"
            text="Record the IPOs you applied for and update their allotment status."
          />

          <Step
            number="03"
            title="Track your returns"
            text="Use the dashboard and calculator to understand your IPO performance."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="pb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Ready to organize your IPO investments?
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-slate-500 dark:text-slate-400">
          Create your free account and start tracking your IPO journey today.
        </p>

        {/* Start Tracking */}
        <button
          type="button"
          onClick={() => openSignUp()}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Start Tracking
          <ArrowRight size={19} weight="bold" />
        </button>
      </section>
    </div>
  );
}

function InfoCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
        {text}
      </p>
    </div>
  );
}

function Step({ number, title, text }) {
  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <span className="text-sm font-bold text-indigo-600">
        {number}
      </span>

      <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
        {text}
      </p>
    </div>
  );
}