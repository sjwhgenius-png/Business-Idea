import React, { createContext, useContext, useMemo, useState } from "react";
import Card from "./Card.jsx";

const ToastCtx = createContext(null);

export function useToast() {
  return useContext(ToastCtx);
}

export default function ToastProvider({ children }) {
  const [msg, setMsg] = useState(null);

  const api = useMemo(() => ({
    show(text) {
      setMsg(text);
      setTimeout(() => setMsg(null), 2400);
    }
  }), []);

  return (
    <ToastCtx.Provider value={api}>
      {children}
      {msg && (
        <div className="toast">
          <Card><strong>{msg}</strong></Card>
        </div>
      )}
    </ToastCtx.Provider>
  );
}
