import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

import LandingPage from "@/pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ErrorPage from "./pages/ErrorPage";
import AuthGuard from "./components/AuthGuard";
import ProfilePage from "./pages/ProfilePage";

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
