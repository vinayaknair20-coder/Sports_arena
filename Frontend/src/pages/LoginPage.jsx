import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { LogIn, User, Lock, ArrowRight } from 'lucide-react';

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
        <div className="min-h-screen flex items-center justify-center py-24 px-4" style={{ background: 'var(--background)' }}>
            <div className="card" style={{ maxWidth: '440px', width: '100%', padding: '3rem' }}>
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center mb-4 text-primary">
                        <LogIn size={48} />
                    </div>
                    <h1 className="text-3xl font-black uppercase tracking-tight" style={{ color: 'var(--secondary)' }}>Access Arena</h1>
                    <p className="text-muted font-bold text-xs tracking-[0.3em]">TURFS • SHOP • LEAGUES • SOCIAL</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2" size={20} style={{ color: 'var(--text-secondary)' }} />
                        <input
                            type="text"
                            placeholder="USERNAME"
                            className="input-field"
                            style={{ paddingLeft: '3.5rem', fontWeight: 'bold' }}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2" size={20} style={{ color: 'var(--text-secondary)' }} />
                        <input
                            type="password"
                            placeholder="PASSWORD"
                            className="input-field"
                            style={{ paddingLeft: '3.5rem', fontWeight: 'bold' }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary py-4 mt-2"
                    >
                        {loading ? 'AUTHENTICATING...' : (
                            <span className="flex items-center gap-2">LOG IN <ArrowRight size={20} /></span>
                        )}
                    </button>
                </form>

                <p className="text-center mt-10 text-xs font-black uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
                    New Athlete? <Link to="/register" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--primary)' }}>Create Profile</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
