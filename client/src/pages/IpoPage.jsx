import { useState } from "react";

import useApi from "../api/useApi";
import { useIpoList } from "../hooks/useIpoData";
import { useIpoModal } from "../context/IpoModalContext";

import IpoCard from "../components/IpoCard";
import Loading from "../components/Loading";

import { allotmentReached, inr } from "../utils/pnl";

const META = {
  applied: {
    title: "📝 Applied IPOs",
    empty: "No applications yet. Click “Add IPO” when you apply for one.",
  },
  allotted: {
    title: "✅ Allotted IPOs",
    empty: "Nothing allotted yet.",
  },
  not_allotted: {
    title: "❌ Not Allotted IPOs",
    empty: "Nothing here.",
  },
};

function Section({ title, sub, tone = "", children }) {
  return (
    <section className="space-y-3">
      <h3 className={`text-base font-semibold ${tone}`}>
        {title} {sub && <span className="text-sm font-normal">{sub}</span>}
      </h3>

      {children}
    </section>
  );
}

export default function IpoPage({ status }) {
  const api = useApi();
  const { openAdd } = useIpoModal();

  const [applicant, setApplicant] = useState("");

  const { ipos, loading, error, reload } = useIpoList({
    status,
    applicant,
  });

  const meta = META[status];

  const update = async (id, body) => {
    try {
      await api.put(`/ipos/${id}`, body);
      reload();
    } catch (e) {
      alert(e.response?.data?.message || "Update failed");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this IPO?")) return;

    try {
      await api.delete(`/ipos/${id}`);
      reload();
    } catch (e) {
      alert(e.response?.data?.message || "Delete failed");
    }
  };

  const cards = (list) =>
    list.length === 0 ? (
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Nothing in this section.
      </p>
    ) : (
      <div className="space-y-3">
        {list.map((i) => (
          <IpoCard
            key={i._id}
            ipo={i}
            onUpdate={update}
            onDelete={remove}
          />
        ))}
      </div>
    );

  const sum = (l) =>
    l.reduce((a, i) => a + Math.abs(i.pnl), 0);

  const byAllot = (a, b) =>
    (a.allotmentDate || "").localeCompare(
      b.allotmentDate || ""
    );

  let body;

  // Loading state
  if (loading) {
    body = <Loading />;
  }

  // Empty state
  else if (ipos.length === 0) {
    body = (
      <p className="card text-center text-slate-500 dark:text-slate-400">
        {meta.empty}
      </p>
    );
  }

  // Applied IPOs
  else if (status === "applied") {
    const sorted = [...ipos].sort(byAllot);

    const due = sorted.filter(allotmentReached);
    const waiting = sorted.filter(
      (i) => !allotmentReached(i)
    );

    body = (
      <div className="space-y-6">
        {due.length > 0 && (
          <Section
            title="🔔 Allotment result due"
            sub={`(${due.length})`}
            tone="text-indigo-600 dark:text-indigo-300"
          >
            {cards(due)}
          </Section>
        )}

        <Section
          title="⏳ Waiting for allotment"
          sub={`(${waiting.length})`}
        >
          {cards(waiting)}
        </Section>
      </div>
    );
  }

  // Allotted IPOs
  else if (status === "allotted") {
    const gain = ipos.filter(
      (i) => i.pnl != null && i.pnl >= 0
    );

    const loss = ipos.filter(
      (i) => i.pnl != null && i.pnl < 0
    );

    const pending = ipos.filter(
      (i) => i.pnl == null
    );

    body = (
      <div className="space-y-6">
        <Section
          title="⏳ Awaiting listing price"
          sub={`(${pending.length})`}
        >
          {cards(pending)}
        </Section>

        <Section
          title="📗 Gain"
          sub={`- ${inr(sum(gain))}`}
          tone="text-emerald-600 dark:text-emerald-400"
        >
          {cards(gain)}
        </Section>

        <Section
          title="📕 Loss"
          sub={`- ${inr(sum(loss))}`}
          tone="text-red-600 dark:text-red-400"
        >
          {cards(loss)}
        </Section>
      </div>
    );
  }

  // Not allotted
  else {
    body = cards(ipos);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-bold sm:text-2xl">
          {meta.title}
        </h2>

        <button
          onClick={openAdd}
          className="btn btn-primary"
        >
          + Add IPO
        </button>
      </div>

      <input
        className="input"
        placeholder="Filter by applicant name"
        value={applicant}
        onChange={(e) => setApplicant(e.target.value)}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      {body}
    </div>
  );
}