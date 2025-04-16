import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BusinessesPage from "./pages/BusinessesPage";
import BusinessesDetailsPage from "./pages/BusinessesDetailsPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import MainLayout from "./components/MainLayout";
import AuthLayout from "./components/AuthLayout";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./components/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import CreateBusinessPage from "./pages/CreateBusinessPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="businesses" element={<BusinessesPage />} />
            <Route path="createBusinesses" element={<CreateBusinessPage />} />

            <Route
              path="businesses/:businessesId"
              element={
                <ProtectedRoute>
                  <BusinessesDetailsPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route path="*/" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
      <Toaster />
    </>
  );
}

export default App;
