import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./i18n";
import { ThemeContextProvider } from "./store/ThemeContext.tsx";
import router from "@/router/router.tsx";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <RouterProvider router={router} />
    </ThemeContextProvider>
  </React.StrictMode>,
);
