import { useState } from "react";
import {
  Calculator,
  TrendUp,
  TrendDown,
  CurrencyInr,
} from "@phosphor-icons/react";

import { calcPnl, inr } from "../utils/pnl";

export default function CalculatorPage() {
  const [issuePrice, setIssuePrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [lotSize, setLotSize] = useState("1");
  const [lots, setLots] = useState("1");

  // Convert values only for calculation
  const calculationData = {
    issuePrice: Number(issuePrice) || 0,
    sellPrice: Number(sellPrice) || 0,
    lotSize: Number(lotSize) || 0,
    lots: Number(lots) || 0,
  };

  const result = calcPnl(calculationData);

  const ready =
    issuePrice.trim() !== "" &&
    sellPrice.trim() !== "" &&
    Number(issuePrice) > 0 &&
    Number(sellPrice) > 0;

  const gain = result.pnl >= 0;

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">

      {/* Header */}
      <div className="text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400">
          <Calculator size={30} weight="bold" />
        </div>

        <h1 className="text-2xl font-bold sm:text-3xl">
          Gain / Loss Calculator
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Calculate your IPO profit or loss instantly.
        </p>
      </div>

      {/* Input Card */}
      <div className="card">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

          {/* Issue Price */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Issue Price (₹)
            </label>

            <div className="relative">
              <CurrencyInr
                size={18}
                weight="bold"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                inputMode="decimal"
                placeholder="e.g. 150"
                value={issuePrice}
                onChange={(e) => setIssuePrice(e.target.value)}
                className="input w-full pl-10"
              />
            </div>
          </div>

          {/* Sell Price */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Listing / Sell Price (₹)
            </label>

            <div className="relative">
              <CurrencyInr
                size={18}
                weight="bold"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                inputMode="decimal"
                placeholder="e.g. 210"
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
                className="input w-full pl-10"
              />
            </div>
          </div>

          {/* Lot Size */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Lot Size (Shares)
            </label>

            <input
              type="text"
              inputMode="numeric"
              placeholder="e.g. 100"
              value={lotSize}
              onChange={(e) => setLotSize(e.target.value)}
              className="input w-full"
            />
          </div>

          {/* Lots */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Number of Lots
            </label>

            <input
              type="text"
              inputMode="numeric"
              placeholder="e.g. 2"
              value={lots}
              onChange={(e) => setLots(e.target.value)}
              className="input w-full"
            />
          </div>
        </div>
      </div>

      {/* Result */}
      {ready && (
        <div
          className={`card border-l-4 ${
            gain
              ? "border-l-emerald-500"
              : "border-l-red-500"
          }`}
        >

          {/* Result Title */}
          <div className="mb-5 flex items-center gap-3">

            <div
              className={`grid h-12 w-12 place-items-center rounded-xl ${
                gain
                  ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400"
                  : "bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400"
              }`}
            >
              {gain ? (
                <TrendUp size={26} weight="bold" />
              ) : (
                <TrendDown size={26} weight="bold" />
              )}
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Calculation Result
              </p>

              <h2
                className={`text-xl font-bold ${
                  gain
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {gain ? "Profit" : "Loss"}
              </h2>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

            <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800/60">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Quantity
              </p>

              <p className="mt-1 text-lg font-bold">
                {result.qty} shares
              </p>
            </div>

            <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800/60">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Invested
              </p>

              <p className="mt-1 text-lg font-bold">
                {inr(result.invested)}
              </p>
            </div>

            <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800/60">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sale Value
              </p>

              <p className="mt-1 text-lg font-bold">
                {inr(result.sold)}
              </p>
            </div>

          </div>

          {/* P/L */}
          <div className="mt-5 rounded-xl bg-slate-100 p-5 text-center dark:bg-slate-800/60">

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total {gain ? "Gain" : "Loss"}
            </p>

            <p
              className={`mt-1 text-3xl font-bold ${
                gain
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {gain ? "+" : "-"}
              {inr(Math.abs(result.pnl))}
            </p>

            <p
              className={`mt-1 text-sm font-semibold ${
                gain
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {result.percent.toFixed(2)}%
            </p>

          </div>
        </div>
      )}

      {/* Initial Message */}
      {!ready && (
        <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
          <Calculator
            size={32}
            weight="duotone"
            className="mx-auto text-slate-400"
          />

          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Enter the issue price and sell price to calculate your
            IPO profit or loss.
          </p>
        </div>
      )}
    </div>
  );
}