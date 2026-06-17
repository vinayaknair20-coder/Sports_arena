import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { ArrowRight, Briefcase, Lock, Mail, MapPin, Phone, Shield, User } from 'lucide-react';
import loginBg from '../assets/login-bg.png';
import loginSide from '../assets/login-side.png';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'player',
        phone: '',
        address: ''
    });
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register(formData);
            toast.success('Account created successfully!');
            navigate('/dashboard');
        } catch (err) {
            toast.error('Registration failed. Username or email might be taken.');
        } finally {
            setLoading(false);
        }
    };

    const roles = [
        { id: 'player', label: 'Player', icon: <User size={16} /> },
        { id: 'turf_owner', label: 'Turf Owner', icon: <MapPin size={16} /> },
        { id: 'shop_owner', label: 'Shop Owner', icon: <Briefcase size={16} /> },
        { id: 'tournament_host', label: 'Host', icon: <Shield size={16} /> },
    ];

    const inputStyle = {
        width: '100%',
        borderRadius: '12px',
        padding: '1rem 1rem 1rem 3rem',
        background: '#f8f8f8',
        border: '1px solid #ececec',
        color: '#111',
        fontWeight: 700,
        fontSize: '0.9rem'
    };

    const labelStyle = {
        fontWeight: 900,
        fontSize: '0.68rem',
        color: '#000',
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
        marginBottom: '0.55rem'
    };

    const iconStyle = {
        position: 'absolute',
        left: '1rem',
        top: '2.45rem',
        color: 'var(--primary)',
        pointerEvents: 'none'
    };

    return (
        <div className="register-layout-wrapper" style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            backgroundImage: `url(${loginBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundColor: '#121212',
            overflow: 'hidden'
        }}>
            <div className="register-navbar-spacer" style={{ height: '72px', width: '100%', flexShrink: 0 }}></div>

            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.65rem 1.5rem',
                minHeight: 0
            }}>
                <div className="register-panel-container" style={{
                    background: '#fff',
                    display: 'flex',
                    maxWidth: '1100px',
                    width: '100%',
                    borderRadius: '50px',
                    overflow: 'hidden',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                    maxHeight: 'calc(100vh - 88px)',
                    position: 'relative',
                    zIndex: 10
                }}>
                    <div className="register-form-panel" style={{
                        flex: '1.35',
                        padding: '2rem 4rem 1.45rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        overflowY: 'auto',
                        minWidth: '420px'
                    }}>
                        <div style={{ marginBottom: '1.35rem' }}>
                            <div style={{
                                color: 'var(--primary)',
                                fontWeight: 900,
                                letterSpacing: '0.35em',
                                textTransform: 'uppercase',
                                fontSize: '0.62rem',
                                marginBottom: '0.55rem'
                            }}>Join SportArena</div>
                            <h1 style={{
                                fontSize: 'clamp(2.15rem, 4.4vw, 3.6rem)',
                                fontWeight: 900,
                                margin: 0,
                                color: '#000',
                                letterSpacing: '-0.04em',
                                lineHeight: 0.9
                            }}>Create Profile.</h1>
                            <p style={{ color: '#666', marginTop: '0.85rem', fontWeight: 600, fontSize: '0.92rem', lineHeight: 1.35 }}>
                                Build your access point for bookings, leagues, gear, and the athlete network.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="register-form-grid">
                            <div className="register-field">
                                <label style={labelStyle}>Username</label>
                                <User size={18} style={iconStyle} />
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Your arena name"
                                    style={inputStyle}
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="register-field">
                                <label style={labelStyle}>Email</label>
                                <Mail size={18} style={iconStyle} />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    style={inputStyle}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="register-field">
                                <label style={labelStyle}>Password</label>
                                <Lock size={18} style={iconStyle} />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Create password"
                                    style={inputStyle}
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="register-field">
                                <label style={labelStyle}>Phone</label>
                                <Phone size={18} style={iconStyle} />
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone number"
                                    style={inputStyle}
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="register-field register-field-wide">
                                <label style={labelStyle}>Address</label>
                                <MapPin size={18} style={iconStyle} />
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Your city or full address"
                                    style={inputStyle}
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="register-field-wide">
                                <p style={labelStyle}>Select Your Role</p>
                                <div className="register-role-grid">
                                    {roles.map((role) => {
                                        const active = formData.role === role.id;

                                        return (
                                            <button
                                                key={role.id}
                                                type="button"
                                                className="register-role-button"
                                                style={{
                                                    background: active ? '#000' : '#f8f8f8',
                                                    color: active ? '#fff' : '#222',
                                                    borderColor: active ? '#000' : '#ececec'
                                                }}
                                                onClick={() => setFormData({ ...formData, role: role.id })}
                                            >
                                                <span style={{ color: active ? 'var(--primary)' : '#777', display: 'inline-flex' }}>{role.icon}</span>
                                                {role.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="register-submit-button"
                            >
                                {loading ? 'CREATING...' : 'Create Profile'}
                                <ArrowRight size={18} />
                            </button>
                        </form>

                        <p style={{ marginTop: '1rem', fontSize: '0.82rem', color: '#444', fontWeight: 600 }}>
                            Already a champion? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 900, textDecoration: 'none', borderBottom: '2px solid var(--primary)' }}>Log in here</Link>
                        </p>
                    </div>

                    <div className="register-image-panel" style={{
                        flex: '0.9',
                        minWidth: '320px',
                        padding: '1.2rem',
                        display: 'flex',
                        minHeight: 0,
                        background: '#fff'
                    }}>
                        <div style={{
                            flex: 1,
                            backgroundColor: '#fff',
                            backgroundImage: `url(${loginSide})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '40px',
                            position: 'relative',
                            overflow: 'hidden',
                            minHeight: 0
                        }}>
                            <div style={{
                                position: 'absolute',
                                left: '2.45rem',
                                right: '1.25rem',
                                bottom: '3.25rem',
                                color: '#fff'
                            }}>
                                <div style={{ color: 'var(--primary)', fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', marginBottom: '0.65rem' }}>Elite Access</div>
                                <div style={{ maxWidth: '86%', fontSize: '1.25rem', fontWeight: 900, lineHeight: 1.08, letterSpacing: 0 }}>Your next match starts here.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .register-form-grid {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 0.9rem 1.15rem;
                }

                .register-field {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                }

                .register-field-wide {
                    grid-column: 1 / -1;
                }

                .register-field input:focus {
                    outline: none;
                    border-color: var(--primary) !important;
                    box-shadow: 0 0 0 4px rgba(211, 47, 47, 0.1);
                }

                .register-role-grid {
                    display: grid;
                    grid-template-columns: repeat(4, minmax(0, 1fr));
                    gap: 0.75rem;
                }

                .register-role-button {
                    min-height: 46px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    border: 1px solid;
                    border-radius: 12px;
                    font-size: 0.72rem;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    cursor: pointer;
                    transition: all 0.25s ease;
                }

                .register-role-button:hover {
                    border-color: var(--primary) !important;
                    transform: translateY(-2px);
                }

                .register-submit-button {
                    grid-column: 1 / -1;
                    min-height: 54px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.8rem;
                    background: #000;
                    color: #fff;
                    border: none;
                    border-radius: 12px;
                    padding: 1rem;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 0.18em;
                    margin-top: 0.35rem;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    font-size: 0.78rem;
                }

                .register-submit-button:hover:not(:disabled) {
                    background: var(--primary);
                }

                .register-submit-button:disabled {
                    opacity: 0.55;
                    cursor: not-allowed;
                }

                @media (max-width: 980px) {
                    .register-layout-wrapper {
                        height: auto !important;
                        min-height: 100vh !important;
                        overflow: auto !important;
                    }

                    .register-navbar-spacer {
                        height: 88px !important;
                    }

                    .register-panel-container {
                        max-width: 680px !important;
                        border-radius: 34px !important;
                        max-height: none !important;
                    }

                    .register-form-panel {
                        min-width: 0 !important;
                        padding: 2.5rem !important;
                        overflow-y: visible !important;
                    }

                    .register-image-panel {
                        display: none !important;
                    }
                }

                @media (max-width: 620px) {
                    .register-layout-wrapper {
                        background-attachment: scroll !important;
                    }

                    .register-panel-container {
                        border-radius: 26px !important;
                    }

                    .register-form-panel {
                        padding: 2rem 1.25rem !important;
                    }

                    .register-form-grid,
                    .register-role-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default RegisterPage;
