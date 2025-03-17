import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/ThemeProvider.tsx";
import ClientThemeWrapper from "./components/theme/ClientThemeWrapper.tsx";
import SharedLayout from "./layouts/SharedLayout.tsx";
import { ACCESS_TOKEN_CHECKING_INTERVAL } from "./shared/auth-constants.ts";
import storageService from "./services/storage-service.ts";
import authService from "./services/auth-service.ts";
import { AuthResponseData } from "./types/auth.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const checkTokens = async () => {
  if (!storageService.retrieveAccessToken()) {
    return;
  }

  const expiration = storageService.retrieveTokenExpiresDate();
  const now = new Date(Date.now() + ACCESS_TOKEN_CHECKING_INTERVAL);

  if (expiration! < now) {
    try {
      const refreshToken = storageService.retrieveRefreshToken();
      if (!refreshToken) {
        console.log("Refresh token is missing. Please sign in.");
        storageService.deleteUserData();
        return;
      }

      const response = await authService.makeRenewTokensRequest(
        storageService.retrieveRefreshToken() as string
      );

      const responseData = response.data as unknown as AuthResponseData;
      storageService.saveAccessToken(responseData.access);
      storageService.saveRefreshToken(responseData.refresh);
      storageService.saveTokenExpiresDate(responseData.access);
    } catch (error) {
      console.error("Error refreshing access token: ", error);
      storageService.deleteUserData();
    }
  }
};

(async () => {
  await checkTokens();
})();

setInterval(checkTokens, ACCESS_TOKEN_CHECKING_INTERVAL);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ClientThemeWrapper>
          <SharedLayout>
            <RouterProvider router={App} />
          </SharedLayout>
        </ClientThemeWrapper>
      </QueryClientProvider>
    </ThemeProvider>

    <Toaster richColors />
  </StrictMode>
);
