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
import ValidatorPage from "./pages/ValidatorPage";
import HistoryPage from "./pages/HistoryPage";
import AddFunds from "./pages/AddFunds";
import PaymentSuccess from "./pages/PaymentSuccess";

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
        path="/history"
        element={<AuthGuard element={<HistoryPage />} requireStaff={false} />}
      />
      <Route
        path="/validator"
        element={<AuthGuard element={<ValidatorPage />} requireAdmin={true} />}
      />
        <Route
        path="/add-funds"
        element={<AuthGuard element={<AddFunds />}/>}
      />
         <Route
        path="/payment-success"
        element={<AuthGuard element={<PaymentSuccess />}/>}
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
