import React from "react";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.10)", padding: "18px 0" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div className="muted">Built for Aussie tradies • MVP demo build</div>
        <div className="muted">Stripe later • Twilio later • Database later</div>
      </div>
    </footer>
  );
}
