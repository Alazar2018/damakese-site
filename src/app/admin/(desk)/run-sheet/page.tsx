"use client";

import { FormEvent, useMemo, useState } from "react";
import { Modal } from "@/components/modal";
import { statusLabel } from "@/lib/format";
import { useDesk, type RunItem } from "@/lib/store";

function emptyLine(eventId: string): RunItem {
  return { id: "", eventId, time: "09:00", task: "", owner: "Floor", state: "open" };
}

export default function RunSheetPage() {
  const { events, run, addRun, saveRun, removeRun, setRunState, role } = useDesk();
  const [eventId, setEventId] = useState(events[0]?.id ?? "");
  const [draft, setDraft] = useState<RunItem | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const active = eventId || events[0]?.id || "";
  const rows = useMemo(
    () => run.filter((item) => item.eventId === active).slice().sort((a, b) => a.time.localeCompare(b.time)),
    [run, active],
  );

  function close() {
    setDraft(null);
    setConfirm(false);
    setError("");
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!draft) return;
    if (!draft.eventId || draft.task.trim().length < 3) {
      setError("Name the task, and the day it belongs to.");
      return;
    }
    try {
      if (draft.id) await saveRun(draft);
      else {
        const { id: _id, ...rest } = draft;
        await addRun(rest);
      }
      setNotice("The sheet is updated.");
      close();
    } catch (err) {
      setError(err instanceof Error ? err.message : "The line could not be saved.");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Run sheet</p>
          <h1 className="display mt-3 text-4xl text-green">The order of the day.</h1>
        </div>
        <button
          type="button"
          className="btn btn-solid"
          onClick={() => {
            setDraft(emptyLine(active));
            setConfirm(false);
            setError("");
          }}
          disabled={!active}
        >
          Add a line
        </button>
      </div>
      <label className="field mt-8 max-w-md">
        <span>Day</span>
        <select value={active} onChange={(event) => setEventId(event.target.value)}>
          {events.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      {notice ? <p className="mt-4 text-forest">{notice}</p> : null}
      <ol className="mt-8">
        {rows.length === 0 ? <li className="border-t border-stone py-6">Nothing on this sheet yet.</li> : null}
        {rows.map((item) => (
          <li key={item.id} className="grid items-center gap-3 border-t border-stone py-4 md:grid-cols-[5rem_1fr_8rem_auto]">
            <p className="ui">{item.time}</p>
            <p>{item.task}</p>
            <p className="text-sm text-forest">
              {item.owner} · {statusLabel[item.state]}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  void setRunState(item.id, item.state === "done" ? "open" : "done").catch(() =>
                    setNotice("That line could not be marked."),
                  );
                }}
              >
                {item.state === "done" ? "Reopen" : "Mark done"}
              </button>
              <button
                type="button"
                className="btn btn-solid"
                onClick={() => {
                  setDraft({ ...item });
                  setConfirm(false);
                  setError("");
                }}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ol>

      <Modal open={draft !== null} title={draft?.id ? "Edit the line" : "Add a line"} onClose={close}>
        {draft && confirm ? (
          <div>
            <p>Remove “{draft.task}” from the sheet?</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="btn btn-solid"
                onClick={() => {
                  void removeRun(draft.id)
                    .then(() => {
                      setNotice("The line is off the sheet.");
                      close();
                    })
                    .catch((err: unknown) => {
                      setConfirm(false);
                      setError(err instanceof Error ? err.message : "The line could not be removed.");
                    });
                }}
              >
                Remove the line
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setConfirm(false)}>
                Keep it
              </button>
            </div>
          </div>
        ) : draft ? (
          <form onSubmit={onSubmit} className="grid gap-4">
            <label className="field">
              <span>Day</span>
              <select value={draft.eventId} onChange={(event) => setDraft({ ...draft, eventId: event.target.value })}>
                {events.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Time</span>
              <input type="time" value={draft.time} onChange={(event) => setDraft({ ...draft, time: event.target.value })} />
            </label>
            <label className="field">
              <span>Task</span>
              <input value={draft.task} onChange={(event) => setDraft({ ...draft, task: event.target.value })} />
            </label>
            <label className="field">
              <span>Owner</span>
              <input value={draft.owner} onChange={(event) => setDraft({ ...draft, owner: event.target.value })} />
            </label>
            <label className="field">
              <span>State</span>
              <select
                value={draft.state}
                onChange={(event) => setDraft({ ...draft, state: event.target.value as RunItem["state"] })}
              >
                <option value="open">{statusLabel.open}</option>
                <option value="done">{statusLabel.done}</option>
                <option value="blocked">{statusLabel.blocked}</option>
              </select>
            </label>
            {error ? <p className="text-wine">{error}</p> : null}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button type="submit" className="btn btn-solid">
                {draft.id ? "Save the line" : "Add to the sheet"}
              </button>
              {draft.id && role === "owner" ? (
                <button type="button" className="ui min-h-11 cursor-pointer text-sm text-wine" onClick={() => setConfirm(true)}>
                  Remove this line
                </button>
              ) : null}
            </div>
          </form>
        ) : null}
      </Modal>
    </div>
  );
}
