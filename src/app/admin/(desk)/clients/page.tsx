"use client";

import { FormEvent, useState } from "react";
import { Modal } from "@/components/modal";
import { useDesk, type Client } from "@/lib/store";

function emptyClient(): Client {
  return { id: "", organisation: "", contact: "", email: "", note: "" };
}

export default function ClientsPage() {
  const { clients, saveClient, addClient, removeClient, role } = useDesk();
  const [draft, setDraft] = useState<Client | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  function close() {
    setDraft(null);
    setConfirm(false);
    setError("");
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!draft) return;
    if (draft.organisation.trim().length < 2 || draft.contact.trim().length < 2) {
      setError("A client needs an organisation and a person.");
      return;
    }
    try {
      if (draft.id) await saveClient(draft);
      else {
        const { id: _id, ...rest } = draft;
        await addClient(rest);
      }
      setNotice("The client list is updated.");
      close();
    } catch (err) {
      setError(err instanceof Error ? err.message : "The client could not be saved.");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Clients</p>
          <h1 className="display mt-3 text-4xl text-green">Who we stay in the room for.</h1>
        </div>
        <button
          type="button"
          className="btn btn-solid"
          onClick={() => {
            setDraft(emptyClient());
            setConfirm(false);
            setError("");
          }}
        >
          Add a client
        </button>
      </div>
      {notice ? <p className="mt-4 text-forest">{notice}</p> : null}
      <ul className="mt-10">
        {clients.map((client) => (
          <li key={client.id} className="grid items-start gap-3 border-t border-stone py-6 md:grid-cols-12">
            <p className="display text-2xl text-green md:col-span-4">{client.organisation}</p>
            <div className="md:col-span-3">
              <p>{client.contact}</p>
              <p className="text-sm">{client.email}</p>
            </div>
            <p className="md:col-span-3">{client.note}</p>
            <button type="button" className="btn btn-solid md:col-span-2" onClick={() => { setDraft({ ...client }); setConfirm(false); setError(""); }}>
              Edit
            </button>
          </li>
        ))}
      </ul>

      <Modal open={draft !== null} title={draft?.id ? "Edit the client" : "Add a client"} onClose={close}>
        {draft && confirm ? (
          <div>
            <p>Remove {draft.organisation} from the desk?</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="btn btn-solid"
                onClick={() => {
                  void removeClient(draft.id)
                    .then(() => {
                      setNotice("The client is off the desk.");
                      close();
                    })
                    .catch((err: unknown) => {
                      setConfirm(false);
                      setError(err instanceof Error ? err.message : "The client could not be removed.");
                    });
                }}
              >
                Remove the client
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setConfirm(false)}>
                Keep them
              </button>
            </div>
          </div>
        ) : draft ? (
          <form onSubmit={onSubmit} className="grid gap-4">
            <label className="field">
              <span>Organisation</span>
              <input value={draft.organisation} onChange={(event) => setDraft({ ...draft, organisation: event.target.value })} />
            </label>
            <label className="field">
              <span>Contact</span>
              <input value={draft.contact} onChange={(event) => setDraft({ ...draft, contact: event.target.value })} />
            </label>
            <label className="field">
              <span>Email</span>
              <input type="email" value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} />
            </label>
            <label className="field">
              <span>Note</span>
              <textarea value={draft.note} onChange={(event) => setDraft({ ...draft, note: event.target.value })} />
            </label>
            {error ? <p className="text-wine">{error}</p> : null}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button type="submit" className="btn btn-solid">
                {draft.id ? "Save the client" : "Add the client"}
              </button>
              {draft.id && role === "owner" ? (
                <button type="button" className="ui min-h-11 cursor-pointer text-sm text-wine" onClick={() => setConfirm(true)}>
                  Remove this client
                </button>
              ) : null}
            </div>
          </form>
        ) : null}
      </Modal>
    </div>
  );
}
