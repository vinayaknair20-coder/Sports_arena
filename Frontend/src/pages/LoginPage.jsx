import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { LogIn, User, Lock, ArrowRight } from 'lucide-react';
import loginBg from '../assets/login-bg.png';
import loginSide from '../assets/login-side.png';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(username, password);
            toast.success('Login Successful! Welcome to the Arena.');
            navigate('/dashboard');
        } catch (err) {
            toast.error('Invalid Credentials. Access Denied.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-layout-wrapper"
            style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                backgroundImage: `url(${loginBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                backgroundColor: '#121212',
                overflow: 'hidden' // Force static page, no scrolling
            }}>

            {/* Balanced Spacer for Fixed Navbar */}
            <div style={{ height: '70px', width: '100%', flexShrink: 0 }}></div>

            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
                overflow: 'hidden'
            }}>
                <div className="login-panel-container" style={{
                    background: 'rgba(255, 255, 255, 1)',
                    display: 'flex',
                    maxWidth: '1000px',
                    width: '100%',
                    borderRadius: '50px',
                    overflow: 'hidden',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                    maxHeight: 'min(85vh, 700px)', // Prevent card from being too tall
                    flexWrap: 'nowrap', // Keep side-by-side unless mobile
                    position: 'relative',
                    zIndex: 10
                }}>

                    {/* Left Panel: Form */}
                    <div style={{
                        flex: '1.2',
                        padding: '4rem 4rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        minWidth: '350px'
                    }}>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1rem', color: '#000', letterSpacing: '-0.04em' }}>Welcome!</h1>
                        <p style={{ color: '#666', marginBottom: '2.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Access your elite sports ecosystem.</p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="flex flex-col gap-2">
                                <label style={{ fontWeight: '800', fontSize: '0.75rem', color: '#000', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Username / Email</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    style={{ borderRadius: '12px', padding: '1.2rem', background: '#f8f8f8', border: '1px solid #eee' }}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label style={{ fontWeight: '800', fontSize: '0.75rem', color: '#000', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Password</label>
                                <input
                                    type="password"
                                    className="input-field"
                                    style={{ borderRadius: '12px', padding: '1.2rem', background: '#f8f8f8', border: '1px solid #eee' }}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    background: '#000',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '1.2rem',
                                    fontWeight: '900',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em',
                                    marginTop: '1rem',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem'
                                }}
                                onMouseEnter={(e) => e.target.style.background = 'var(--primary)'}
                                onMouseLeave={(e) => e.target.style.background = '#000'}
                            >
                                {loading ? 'AUTHENTICATING...' : 'Login'}
                            </button>
                        </form>

                        <p style={{ marginTop: '3rem', fontSize: '0.85rem', color: '#444', fontWeight: '600' }}>
                            New Athlete? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '900', textDecoration: 'none', borderBottom: '2px solid var(--primary)' }}>Create Profile</Link>
                        </p>
                    </div>

                    {/* Right Panel: Image */}
                    <div style={{
                        flex: '1',
                        minWidth: '350px',
                        padding: '1.2rem',
                        display: 'flex'
                    }}>
                        <div style={{
                            flex: '1',
                            backgroundImage: `url(${loginSide})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '40px'
                        }}></div>
                    </div>
                </div>
            </div>

            <style>{`
                .input-field:focus {
                    outline: none;
                    border-color: var(--primary) !important;
                    box-shadow: 0 0 0 4px rgba(211, 47, 47, 0.1);
                }
                @media (max-width: 768px) {
                    .login-panel-container { margin-top: 2rem; border-radius: 30px !important; }
                    h1 { font-size: 2.5rem !important; }
                    .login-layout-wrapper { padding: 1rem !important; }
                }
            `}</style>
        </div>
    );
};

export default LoginPage;
