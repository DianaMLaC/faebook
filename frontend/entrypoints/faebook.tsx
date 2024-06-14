import { createRoot } from "react-dom/client"
import React from "react"
import Root from "../components/root"

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("root")
  if (rootEl) {
    console.log("hey this is typescript")
    const root = createRoot(rootEl)
    root.render(<Root />)
  } else {
    console.error("could not find #root div")
  }
})
