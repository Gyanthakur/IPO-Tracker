import { useEffect, useState } from "react";

import { useSummary } from "../hooks/useIpoData";
import { useIpoModal } from "../context/IpoModalContext";
import SummaryCards from "../components/SummaryCards";
import { inr } from "../utils/pnl";
import Loading from "../components/Loading";

export default function Dashboard() {
  const { summary: s, error } = useSummary();

  const { openAdd } = useIpoModal();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (s) {
      setLoading(false);
    }
  }, [s]);

  const rows = Object.entries(s?.byApplicant ?? {});

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold sm:text-2xl">
        Overview
      </h2>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2">

            <button
              onClick={openAdd}
              className="btn btn-primary"
            >
              + Add IPO
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <SummaryCards s={s} />

          {s && (
            <section>
              <h3 className="mb-2 text-base font-semibold">
                By applicant
              </h3>

              {rows.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No listed IPOs yet.
                </p>
              ) : (
                <div className="card overflow-x-auto p-0">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                      <tr>
                        <th className="px-4 py-2.5">
                          Applicant
                        </th>

                        <th className="px-4 py-2.5">
                          Net P/L
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {rows.map(([name, v]) => (
                        <tr
                          key={name}
                          className="border-t border-slate-200 dark:border-slate-800"
                        >
                          <td className="px-4 py-2.5">
                            {name}
                          </td>

                          <td
                            className={`px-4 py-2.5 font-semibold ${
                              v >= 0
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {v >= 0 ? "+" : "-"}
                            {inr(Math.abs(v))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}
        </>
      )}
    </div>
  );
}