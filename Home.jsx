import React, { useState } from "react";
import Card from "../components/Card.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import { useToast } from "../components/Toast.jsx";

export default function Home() {
  const toast = useToast();
  const [form, setForm] = useState({ business: "", name: "", phone: "", email: "", trade: "Plumber" });
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      // For now: Netlify Forms-style fallback is optional.
      // We’ll just “pretend” and keep it simple; you can wire this to a DB later.
      await new Promise(r => setTimeout(r, 700));
      toast.show("Waitlist submitted (demo).");
      setForm({ business: "", name: "", phone: "", email: "", trade: "Plumber" });
      window.location.hash = "#waitlist";
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="grid" style={{ gap: 18 }}>
        <div className="grid grid-2">
          <div>
            <h1 style={{ fontSize: 44, lineHeight: 1.05 }}>
              Turn missed calls into <span style={{ color: "#ffffff" }}>booked jobs</span>.
            </h1>
            <p className="muted" style={{ fontSize: 16, marginTop: 10 }}>
              Instant SMS reply + AI lead qualification + booking flow. Built for Aussie tradies who are always on-site.
            </p>

            <div className="grid grid-3" style={{ marginTop: 16 }}>
              <Card><strong>⚡ Instant reply</strong><div className="muted">Missed call → SMS in 2 seconds</div></Card>
              <Card><strong>🧠 Qualify leads</strong><div className="muted">Job type, suburb, urgency, photos</div></Card>
              <Card><strong>📅 Book faster</strong><div className="muted">Booking link or callback window</div></Card>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
              <a className="btn" href="/demo">Try the demo</a>
              <a className="btn secondary" href="#waitlist">Join waitlist</a>
            </div>

            <hr />

            <Card>
              <strong>What you can charge (later):</strong>
              <div className="muted" style={{ marginTop: 6 }}>
                $99/mo basic • $199/mo AI qualify + booking • $299/mo follow-ups + reviews
              </div>
            </Card>
          </div>

          <Card>
            <h2 style={{ marginBottom: 10 }}>How it works</h2>
            <ol className="muted" style={{ marginTop: 0, paddingLeft: 18 }}>
              <li>Customer calls your number</li>
              <li>If you miss it, they get a friendly SMS instantly</li>
              <li>AI asks 2–4 quick questions</li>
              <li>You receive a clean summary + optional booking</li>
            </ol>

            <hr />

            <div id="waitlist">
              <h3>Join the waitlist</h3>
              <form onSubmit={submit} className="grid" style={{ marginTop: 10 }}>
                <div className="grid grid-2">
                  <div>
                    <label>Business name</label>
                    <Input value={form.business} onChange={e => setForm({ ...form, business: e.target.value })} placeholder="e.g. Smith Plumbing" required />
                  </div>
                  <div>
                    <label>Trade</label>
                    <select value={form.trade} onChange={e => setForm({ ...form, trade: e.target.value })}>
                      <option>Plumber</option>
                      <option>Electrician</option>
                      <option>Roofer</option>
                      <option>Landscaper</option>
                      <option>Painter</option>
                      <option>Pest Control</option>
                      <option>Aircon</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-2">
                  <div>
                    <label>Your name</label>
                    <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="First name" required />
                  </div>
                  <div>
                    <label>Phone</label>
                    <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="04xx xxx xxx" required />
                  </div>
                </div>

                <div>
                  <label>Email</label>
                  <Input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@domain.com" required />
                </div>

                <Button disabled={loading}>{loading ? "Submitting..." : "Join waitlist"}</Button>
                <small>Demo build: stores nothing yet. We’ll connect a database later.</small>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
