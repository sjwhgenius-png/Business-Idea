import React from "react";
export default function Button({ children, variant = "primary", ...props }) {
  const cls = variant === "secondary" ? "btn secondary" : "btn";
  return <button className={cls} {...props}>{children}</button>;
}
