import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { UserPlus, User, Mail, Lock, Phone, MapPin, Briefcase } from 'lucide-react';

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
        { id: 'tournament_host', label: 'Host', icon: <Briefcase size={16} /> },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center pt-32 pb-16 px-4 bg-gradient-to-b from-background to-surface">
            <div className="glass-card p-10 rounded-3xl w-full max-w-2xl animate-fade-in">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-2xl mb-4">
                        <UserPlus className="text-primary" size={32} />
                    </div>
                    <h1 className="text-3xl font-black">CREATE ACCOUNT</h1>
                    <p className="text-text-muted">Join the ultimate sports arena</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="md:col-span-2 relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                        <input
                            type="text"
                            name="address"
                            placeholder="Your Address"
                            className="w-full bg-background border border-border rounded-xl py-3 pl-12 px-4 focus:ring-2 focus:ring-primary outline-none"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <p className="text-sm font-bold text-text-muted mb-3 uppercase tracking-wider">Select your role</p>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            {roles.map((role) => (
                                <button
                                    key={role.id}
                                    type="button"
                                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${formData.role === role.id ? 'bg-primary border-primary text-white' : 'bg-background border-border text-text-muted'
                                        }`}
                                    onClick={() => setFormData({ ...formData, role: role.id })}
                                >
                                    {role.icon} {role.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="md:col-span-2 bg-primary hover:bg-primary-dark py-4 rounded-xl font-black text-xl shadow-lg mt-4 disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'GET STARTED'}
                    </button>
                </form>

                <p className="text-center mt-8 text-text-muted">
                    Already a champion? <Link to="/login" className="text-primary font-bold hover:underline">Log in here</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
