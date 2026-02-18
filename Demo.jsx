import React, { useState } from "react";
import Card from "../components/Card.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import { addLocalLead, getLocalLeads } from "../lib/storage.js";
import { useToast } from "../components/Toast.jsx";

function nowIso() {
  return new Date().toISOString();
}

export default function Demo() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [leads, setLeads] = useState(getLocalLeads());
  const [lead, setLead] = useState({
    caller: "",
    job: "",
    suburb: "",
    urgency: "Today",
    notes: ""
  });

  function reset() {
    setStep(1);
    setLead({ caller: "", job: "", suburb: "", urgency: "Today", notes: "" });
  }

  function simulateMissedCall() {
    if (!lead.caller) return toast.show("Add a caller number.");
    setStep(2);
    toast.show("Missed call → SMS sent (demo).");
  }

  function finishQualification() {
    if (!lead.job || !lead.suburb) return toast.show("Add job + suburb.");
    const record = {
      id: crypto.randomUUID(),
      createdAt: nowIso(),
      status: "New",
      ...lead
    };
    const updated = addLocalLead(record);
    setLeads(updated);
    toast.show("Lead captured + sent to dashboard (demo).");
    setStep(3);
  }

  return (
    <div className="container">
      <div className="grid grid-2">
        <Card>
          <h2>Demo: Missed call → qualified lead</h2>
          <p className="muted">This simulates the exact flow you’ll connect to Twilio later.</p>

          <hr />

          {step === 1 && (
            <div className="grid">
              <div>
                <label>Caller phone</label>
                <Input value={lead.caller} onChange={e => setLead({ ...lead, caller: e.target.value })} placeholder="+61400 000 000" />
              </div>
              <Button onClick={simulateMissedCall}>Simulate missed call</Button>
              <small>Step 1 sends an instant SMS in the real product.</small>
            </div>
          )}

          {step === 2 && (
            <div className="grid">
              <div className="badge">AI Receptionist: quick questions</div>

              <div>
                <label>What job do you need?</label>
                <Input value={lead.job} onChange={e => setLead({ ...lead, job: e.target.value })} placeholder="e.g. blocked drain, hot water, switchboard..." />
              </div>

              <div className="grid grid-2">
                <div>
                  <label>Suburb</label>
                  <Input value={lead.suburb} onChange={e => setLead({ ...lead, suburb: e.target.value })} placeholder="e.g. Blacktown" />
                </div>
                <div>
                  <label>Urgency</label>
                  <select value={lead.urgency} onChange={e => setLead({ ...lead, urgency: e.target.value })}>
                    <option>ASAP</option>
                    <option>Today</option>
                    <option>Tomorrow</option>
                    <option>This week</option>
                  </select>
                </div>
              </div>

              <div>
                <label>Extra notes (optional)</label>
                <textarea className="input" rows={4} value={lead.notes} onChange={e => setLead({ ...lead, notes: e.target.value })} placeholder="Gate code, parking, photo mentioned..." />
              </div>

              <div className="row" style={{ justifyContent: "space-between" }}>
                <Button variant="secondary" onClick={reset}>Back</Button>
                <Button onClick={finishQualification}>Create lead</Button>
              </div>

              <small>In production this is SMS chat + optional booking link.</small>
            </div>
          )}

          {step === 3 && (
            <div className="grid">
              <div className="badge">✅ Done</div>
              <p className="muted">Open the Dashboard to see the lead inbox.</p>
              <div className="row">
                <a className="btn" href="/dashboard">Go to Dashboard</a>
                <Button variant="secondary" onClick={reset}>Create another</Button>
              </div>
            </div>
          )}
        </Card>

        <Card>
          <h3>Recent demo leads</h3>
          <p className="muted">Stored in your browser for the demo.</p>
          <hr />
          <div className="grid">
            {leads.slice(0, 6).map(l => (
              <div key={l.id} className="card" style={{ padding: 12 }}>
                <div className="row" style={{ justifyContent: "space-between" }}>
                  <strong>{l.job || "—"}</strong>
                  <span className="badge">{l.status}</span>
                </div>
                <div className="muted" style={{ marginTop: 6 }}>
                  {l.suburb} • {l.urgency} • {l.caller}
                </div>
              </div>
            ))}
            {leads.length === 0 && <div className="muted">No leads yet — run the demo.</div>}
          </div>
        </Card>
      </div>
    </div>
  );
}
