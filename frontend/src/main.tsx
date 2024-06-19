import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./i18n";
import router from "@/router/router.tsx";
import { RouterProvider } from "react-router-dom";
import { UserContextProvider } from "@/store/UserContext.tsx";
import ThemeProvider from "@/ThemeProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserContextProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </UserContextProvider>
  </React.StrictMode>,
);
