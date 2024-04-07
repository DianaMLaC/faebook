import { createRoot } from "react-dom/client"
import React from "react"
// import Root from "./components/root"

const Root = () => <h1>React rendered root</h1>

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("root")
  if (rootEl) {
    const root = createRoot(rootEl)

    root.render(<Root />)
  } else {
    console.error("could not find #root div")
  }
})