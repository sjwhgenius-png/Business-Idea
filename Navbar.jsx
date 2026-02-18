import React from "react";
import { Link, NavLink } from "react-router-dom";

const navStyle = ({ isActive }) => ({
  opacity: isActive ? 1 : 0.75,
  fontWeight: 900
});

export default function Navbar() {
  return (
    <header style={{ borderBottom: "1px solid rgba(255,255,255,0.10)", position: "sticky", top: 0, backdropFilter: "blur(12px)", background: "rgba(11,15,25,0.72)", zIndex: 10 }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="badge">⚡ Missed Call → Booked Job</span>
        </Link>

        <nav style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <NavLink to="/demo" style={navStyle}>Demo</NavLink>
          <NavLink to="/dashboard" style={navStyle}>Dashboard</NavLink>
          <NavLink to="/admin" style={navStyle}>Admin</NavLink>
          <a className="btn secondary" href="#waitlist">Join Waitlist</a>
        </nav>
      </div>
    </header>
  );
}

