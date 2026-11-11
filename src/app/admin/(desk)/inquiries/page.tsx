"use client";

import { FormEvent, useState } from "react";
import { Modal } from "@/components/modal";
import { KINDS, type Kind } from "@/lib/content";
import { formatDay, statusLabel } from "@/lib/format";
import { useDesk, type Inquiry, type InquiryStatus } from "@/lib/store";

const statuses: InquiryStatus[] = ["new", "review", "briefed", "closed"];

export default function InquiriesPage() {
  const { inquiries, saveInquiry, removeInquiry, role } = useDesk();
  const [draft, setDraft] = useState<Inquiry | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [notice, setNotice] = useState("");

  function close() {
    setDraft(null);
    setConfirm(false);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!draft) return;
    try {
      await saveInquiry(draft);
      setNotice("The brief is updated.");
      close();
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "The brief could not be saved.");
    }
  }

  return (
    <div>
      <p className="eyebrow">Briefs</p>
      <h1 className="display mt-3 text-4xl text-green">What arrived.</h1>
      <p className="mt-3 max-w-[var(--measure)]">A brief from the site lands here. Open it when you are ready to answer.</p>
      {notice ? <p className="mt-4 text-forest">{notice}</p> : null}
      <ul className="mt-10">
        {inquiries.length === 0 ? <li className="border-t border-stone py-8">No briefs yet.</li> : null}
        {inquiries.map((item) => (
          <li key={item.id} className="grid items-start gap-4 border-t border-stone py-6 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="font-semibold text-green">{item.name}</p>
              <p>{item.organisation}</p>
              <p className="mt-2 text-sm">{item.email}</p>
            </div>
            <div className="lg:col-span-6">
              <p className="eyebrow">{item.kind}</p>
              <p className="mt-3">{item.brief}</p>
              <p className="ui mt-3 text-sm text-forest">
                {item.city} · {item.date ? formatDay(item.date) : "Date open"} · {statusLabel[item.status]}
              </p>
            </div>
            <button
              type="button"
              className="btn btn-solid lg:col-span-3"
              onClick={() => {
                setDraft({ ...item });
                setConfirm(false);
              }}
            >
              Open
            </button>
          </li>
        ))}
      </ul>

      <Modal open={draft !== null} title={draft ? draft.organisation || "Brief" : "Brief"} onClose={close}>
        {draft && confirm ? (
          <div>
            <p>Remove this brief from {draft.organisation}?</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="btn btn-solid"
                onClick={() => {
                  void removeInquiry(draft.id)
                    .then(() => {
                      setNotice("The brief is off the desk.");
                      close();
                    })
                    .catch((err: unknown) => {
                      setConfirm(false);
                      setNotice(err instanceof Error ? err.message : "The brief could not be removed.");
                    });
                }}
              >
                Remove the brief
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setConfirm(false)}>
                Keep it
              </button>
            </div>
          </div>
        ) : draft ? (
          <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
            <label className="field">
              <span>Name</span>
              <input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
            </label>
            <label className="field">
              <span>Organisation</span>
              <input value={draft.organisation} onChange={(event) => setDraft({ ...draft, organisation: event.target.value })} />
            </label>
            <label className="field">
              <span>Email</span>
              <input type="email" value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} />
            </label>
            <label className="field">
              <span>Phone</span>
              <input value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} />
            </label>
            <label className="field">
              <span>Kind</span>
              <select value={draft.kind} onChange={(event) => setDraft({ ...draft, kind: event.target.value as Kind })}>
                {KINDS.map((kind) => (
                  <option key={kind}>{kind}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Date</span>
              <input type="date" value={draft.date} onChange={(event) => setDraft({ ...draft, date: event.target.value })} />
            </label>
            <label className="field">
              <span>City</span>
              <input value={draft.city} onChange={(event) => setDraft({ ...draft, city: event.target.value })} />
            </label>
            <label className="field">
              <span>Status</span>
              <select
                value={draft.status}
                onChange={(event) => setDraft({ ...draft, status: event.target.value as InquiryStatus })}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {statusLabel[status]}
                  </option>
                ))}
              </select>
            </label>
            <label className="field md:col-span-2">
              <span>Brief</span>
              <textarea value={draft.brief} onChange={(event) => setDraft({ ...draft, brief: event.target.value })} />
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:col-span-2">
              <button type="submit" className="btn btn-solid">
                Save the brief
              </button>
              {role === "owner" ? (
                <button type="button" className="ui min-h-11 cursor-pointer text-sm text-wine" onClick={() => setConfirm(true)}>
                  Remove this brief
                </button>
              ) : null}
            </div>
          </form>
        ) : null}
      </Modal>
    </div>
  );
}
