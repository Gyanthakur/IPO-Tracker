import { Routes, Route, Navigate } from "react-router-dom";

import {
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/clerk-react";

import { IpoModalProvider } from "./context/IpoModalContext";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import IpoPage from "./pages/IpoPage";
import CalculatorPage from "./pages/CalculatorPage";
import AdminPage from "./pages/AdminPage";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import LandingPage from "./pages/LandingPage";

function Protected({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>

      <SignedOut>
        <LandingPage />
      </SignedOut>
    </>
  );
}

function AdminOnly({ children }) {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  return user?.publicMetadata?.role === "admin"
    ? children
    : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <IpoModalProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />

        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-3 py-4 sm:px-6 sm:py-6">

          {/* Logged-out landing page */}
          <SignedOut>
            <LandingPage />
          </SignedOut>

          {/* Logged-in hero */}
          <SignedIn>
            <Hero />
          </SignedIn>

          <Routes>

            {/* Dashboard */}
            <Route
              path="/"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            />

            {/* Applied */}
            <Route
              path="/applied"
              element={
                <Protected>
                  <IpoPage status="applied" />
                </Protected>
              }
            />

            {/* Allotted */}
            <Route
              path="/allotted"
              element={
                <Protected>
                  <IpoPage status="allotted" />
                </Protected>
              }
            />

            {/* Not Allotted */}
            <Route
              path="/not-allotted"
              element={
                <Protected>
                  <IpoPage status="not_allotted" />
                </Protected>
              }
            />

            {/* Calculator */}
            <Route
              path="/calculator"
              element={
                <Protected>
                  <CalculatorPage />
                </Protected>
              }
            />

            {/* Admin */}
            <Route
              path="/admin"
              element={
                <Protected>
                  <AdminOnly>
                    <AdminPage />
                  </AdminOnly>
                </Protected>
              }
            />

            {/* Fallback */}
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />

          </Routes>
        </main>

        <Footer />
      </div>
    </IpoModalProvider>
  );
}