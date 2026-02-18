import React, { useState } from "react";
import Card from "../components/Card.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import { apiPost } from "../lib/api.js";
import { useToast } from "../components/Toast.jsx";

export default function Admin() {
  const toast = useToast();
  const [secret, setSecret] = useState("");
  const [lead, setLead] = useState({
    caller: "",
    job: "",
    suburb: "",
    urgency: "Today",
    notes: ""
  });
  const [loading, setLoading] = useState(false);

  async function createLead() {
    setLoading(true);
    try {
      const res = await apiPost("/api/lead-create", { secret, ...lead });
      toast.show(res.ok ? "Server lead created." : "Denied.");
      if (res.ok) setLead({ caller: "", job: "", suburb: "", urgency: "Today", notes: "" });
    } catch {
      toast.show("Create failed (is Netlify Functions running?).");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="grid grid-2">
        <Card>
          <h2>Admin</h2>
          <p className="muted">
            Use this to create a real “server lead” (stored in function memory). Later we’ll switch to a database.
          </p>
          <hr />

          <div className="grid">
            <div>
              <label>Admin secret</label>
              <Input value={secret} onChange={e => setSecret(e.target.value)} placeholder="Set ADMIN_SECRET in Netlify env" />
            </div>

            <div className="grid grid-2">
              <div>
                <label>Caller</label>
                <Input value={lead.caller} onChange={e => setLead({ ...lead, caller: e.target.value })} placeholder="+61400..." />
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

            <div className="grid grid-2">
              <div>
                <label>Job</label>
                <Input value={lead.job} onChange={e => setLead({ ...lead, job: e.target.value })} placeholder="blocked drain..." />
              </div>
              <div>
                <label>Suburb</label>
                <Input value={lead.suburb} onChange={e => setLead({ ...lead, suburb: e.target.value })} placeholder="Blacktown" />
              </div>
            </div>

            <div>
              <label>Notes</label>
              <textarea className="input" rows={4} value={lead.notes} onChange={e => setLead({ ...lead, notes: e.target.value })} />
            </div>

            <Button onClick={createLead} disabled={loading}>
              {loading ? "Creating..." : "Create server lead"}
            </Button>

            <small>
              Later: Twilio webhooks will call these endpoints automatically.
            </small>
          </div>
        </Card>

        <Card>
          <h3>Next integrations</h3>
          <div className="muted">
            <ul>
              <li>Twilio voice webhook → if missed, trigger SMS</li>
              <li>Twilio SMS webhook → AI qualification</li>
              <li>Database persistence (Supabase/Postgres)</li>
              <li>Stripe subscription gating</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
