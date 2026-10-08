import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "@/app/router";
import { TreeProvider } from "@/app/tree/TreeProvider";
import "@/styles/global.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element missing");
}

createRoot(rootElement).render(
  <StrictMode>
    <TreeProvider>
      <AppRouter />
    </TreeProvider>
  </StrictMode>,
);
