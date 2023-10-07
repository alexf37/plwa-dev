import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { router } from "./App.tsx";
import { RouterProvider } from "@tanstack/react-router";

const rootElement = document.getElementById("root")!;

const root = ReactDOM.createRoot(rootElement);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
