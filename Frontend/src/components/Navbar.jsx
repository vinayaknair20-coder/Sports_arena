import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav style={{
            background: 'rgba(10, 10, 10, 0.9)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            padding: '1.5rem 0',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
            <div className="container flex items-center justify-between">
                <Link to="/" className="text-2xl font-black" style={{ color: 'white', textDecoration: 'none', letterSpacing: '-0.02em' }}>
                    <span style={{ color: 'var(--primary)' }}>SPORT</span>ARENA
                </Link>

                {/* Desktop Menu */}
                <div className="hidden-mobile flex items-center gap-10">
                    {['Turfs', 'Tournaments', 'Shop', 'Social'].map((link) => (
                        <Link
                            key={link}
                            to={`/${link.toLowerCase()}`}
                            className="nav-link-lux"
                            style={{
                                fontSize: '0.7rem',
                                fontWeight: '800',
                                textTransform: 'uppercase',
                                letterSpacing: '0.2em',
                                textDecoration: 'none',
                                color: 'rgba(255,255,255,0.7)',
                                transition: '0.3s ease'
                            }}
                        >
                            {link}
                        </Link>
                    ))}

                    <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }}></div>

                    {user ? (
                        <div className="flex items-center gap-6">
                            <Link to="/dashboard" style={{ color: 'white' }}><LayoutDashboard size={18} /></Link>
                            <button
                                onClick={handleLogout}
                                className="btn-lux"
                                style={{ padding: '0.5rem 1.5rem', fontSize: '0.6rem', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}
                            >
                                LOGOUT
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-8">
                            <Link to="/login" style={{ color: 'white', fontSize: '0.7rem', fontWeight: '800', textDecoration: 'none', letterSpacing: '0.2em' }}>LOGIN</Link>
                            <Link to="/register" className="btn-lux" style={{ padding: '0.75rem 2rem', fontSize: '0.7rem', background: 'white', color: 'black' }}>JOIN</Link>
                        </div>
                    )}
                </div>

                <button className="md-hidden" style={{ background: 'none', color: 'var(--primary)', border: 'none' }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {mobileMenuOpen && (
                <div className="mobile-menu-container" style={{
                    position: 'absolute', top: '100%', left: 0, right: 0,
                    background: 'black', padding: '3rem', borderBottom: '2px solid var(--primary)',
                    display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'center'
                }}>
                    {['Turfs', 'Tournaments', 'Shop', 'Social'].map((link) => (
                        <Link key={link} to={`/${link.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} style={{ color: 'white', fontWeight: '900', textDecoration: 'none', fontSize: '1.2rem', letterSpacing: '0.3em' }}>
                            {link}
                        </Link>
                    ))}
                </div>
            )}

            <style>{`
        .md-hidden { display: none; }
        .nav-link-lux:hover { color: white !important; transform: translateY(-2px); }
        .mobile-menu-container { display: flex; }
        @media (min-width: 901px) {
          .mobile-menu-container { display: none !important; }
        }
        @media (max-width: 900px) {
          .hidden-mobile { display: none; }
          .md-hidden { display: block; }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
