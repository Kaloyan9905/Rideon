import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

import LandingPage from "@/pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ErrorPage from "./pages/ErrorPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import AuthGuard from "./components/AuthGuard";
import PassesPage from "./pages/PassesPage";

const App = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index path="/" element={<LandingPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route
        path="/profile"
        element={<AuthGuard element={<ProfilePage />} requireStaff={false} />}
      />
      <Route
        path="/dashboard"
        element={<AuthGuard element={<DashboardPage />} requireStaff={false} />}
      />
      <Route
        path="/passes"
        element={<AuthGuard element={<PassesPage />} /*requireStaff*/ />}
      />
      <Route
        path="*"
        element={
          <ErrorPage
            statusCode={404}
            message="Page not found!"
            authError={false}
          />
        }
      />
    </>
  )
);

export default App;
