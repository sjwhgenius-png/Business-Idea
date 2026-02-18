import React, { useEffect, useMemo, useState } from "react";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import { apiGet, apiPatch } from "../lib/api.js";
import { getLocalLeads } from "../lib/storage.js";
import { useToast } from "../components/Toast.jsx";

const STATUS = ["New", "Contacted", "Booked", "Won", "Lost"];

export default function Dashboard() {
  const toast = useToast();
  const [serverLeads, setServerLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await apiGet("/api/lead-list");
      setServerLeads(data.leads || []);
    } catch {
      // If functions not running locally, dashboard still works with demo leads.
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const demoLeads = useMemo(() => getLocalLeads(), []);
  const merged = useMemo(() => {
    // show server leads first, then demo leads
    const map = new Map();
    for (const l of serverLeads) map.set(l.id, { ...l, source: "server" });
    for (const l of demoLeads) if (!map.has(l.id)) map.set(l.id, { ...l, source: "demo" });
    return Array.from(map.values()).sort((a,b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
  }, [serverLeads, demoLeads]);

  async function setStatus(lead, status) {
    if (lead.source !== "server") {
      toast.show("Demo lead (local) — server update disabled.");
      return;
    }
    try {
      await apiPatch("/api/lead-update", { id: lead.id, status });
      toast.show(`Updated: ${status}`);
      await load();
    } catch {
      toast.show("Update failed.");
    }
  }

  return (
    <div className="container">
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <h2>Lead Inbox</h2>
          <div className="muted">Server leads (via Netlify Functions) + demo leads (local)</div>
        </div>
        <Button variant="secondary" onClick={load} disabled={loading}>{loading ? "Refreshing..." : "Refresh"}</Button>
      </div>

      <div className="grid grid-3">
        {merged.map(lead => (
          <Card key={lead.id}>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <strong>{lead.job || "Unknown job"}</strong>
              <span className="badge">{lead.status || "New"}</span>
            </div>
            <div className="muted" style={{ marginTop: 6 }}>
              {lead.suburb || "—"} • {lead.urgency || "—"}
            </div>
            <div className="muted" style={{ marginTop: 6 }}>
              Caller: {lead.caller || "—"}
            </div>
            {lead.notes && <div className="muted" style={{ marginTop: 6 }}>{lead.notes}</div>}
            <hr />
            <div className="row" style={{ flexWrap: "wrap" }}>
              {STATUS.map(s => (
                <button
                  key={s}
                  className="btn secondary"
                  style={{ padding: "8px 10px", borderRadius: 10 }}
                  onClick={() => setStatus(lead, s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 10 }}>
              <small>Source: {lead.source}</small>
            </div>
          </Card>
        ))}
        {merged.length === 0 && (
          <Card>
            <strong>No leads yet</strong>
            <div className="muted">Run the demo to generate a lead.</div>
          </Card>
        )}
      </div>
    </div>
  );
}
