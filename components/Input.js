import React from "react";

export default function Input({ type, required, value, onChange }) {
  return (
    <input
      type={type}
      required={required}
      className="border rounder px-3 py-1 w-80"
      value={value}
      onChange={onChange}
    />
  );
}
