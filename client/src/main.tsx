import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/ThemeProvider.tsx";
import ClientThemeWrapper from "./components/theme/ClientThemeWrapper.tsx";
import SharedLayout from "./layouts/SharedLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ClientThemeWrapper>
        <SharedLayout>
          <RouterProvider router={App} />
        </SharedLayout>
      </ClientThemeWrapper>
    </ThemeProvider>

    <Toaster richColors />
  </StrictMode>
);
