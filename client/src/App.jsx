import { Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { IpoModalProvider } from './context/IpoModalContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import IpoPage from './pages/IpoPage';
import CalculatorPage from './pages/CalculatorPage';
import AdminPage from './pages/AdminPage';
import Footer from './components/Footer';
import Hero from './components/Hero';

function Protected({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut><Navigate to="/sign-in" replace /></SignedOut>
    </>
  );
}

function AdminOnly({ children }) {
  const { user, isLoaded } = useUser();
  if (!isLoaded) return null;
  return user?.publicMetadata?.role === 'admin' ? children : <Navigate to="/" replace />;
}

const Center = ({ children }) => <div className="flex justify-center py-8">{children}</div>;

export default function App() {
  return (
  <IpoModalProvider>
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-3 py-4 sm:px-6 sm:py-6">
        <Hero/>
       <Routes>
        <Route path="/sign-in/*" element={<Center><SignIn routing="path" path="/sign-in" /></Center>} />
        <Route path="/sign-up/*" element={<Center><SignUp routing="path" path="/sign-up" /></Center>} />
        <Route path="/" element={<Protected><Dashboard /></Protected>} />
        <Route path="/applied" element={<Protected><IpoPage status="applied" /></Protected>} />
        <Route path="/allotted" element={<Protected><IpoPage status="allotted" /></Protected>} />
        <Route path="/not-allotted" element={<Protected><IpoPage status="not_allotted" /></Protected>} />
        <Route path="/calculator" element={<Protected><CalculatorPage /></Protected>} />
        <Route path="/admin" element={<Protected><AdminOnly><AdminPage /></AdminOnly></Protected>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </main>

      <Footer />
    </div>
  </IpoModalProvider>
);
}