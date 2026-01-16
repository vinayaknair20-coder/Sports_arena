import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TurfListPage from './pages/TurfListPage';
import TournamentListPage from './pages/TournamentListPage';
import ShopPage from './pages/ShopPage';
import SocialFeedPage from './pages/SocialFeedPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/turfs" element={<TurfListPage />} />
            <Route path="/tournaments" element={<TournamentListPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/social" element={<SocialFeedPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
          <ToastContainer position="bottom-right" theme="dark" pauseOnFocusLoss={false} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
