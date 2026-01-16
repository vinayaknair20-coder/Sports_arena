import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { LayoutDashboard, MapPin, Trophy, ShoppingBag, Settings, User, Bell } from 'lucide-react';
import api from '../services/api';

const DashboardPage = () => {
    const { user, loading } = useAuth();
    const [stats, setStats] = useState({ bookings: 0, tournaments: 0, posts: 0 });

    if (loading) return <div className="pt-32 text-center font-bold">Identifying user...</div>;
    if (!user) return <Navigate to="/login" />;

    const sidebarItems = [
        { name: 'Overview', icon: <LayoutDashboard size={20} />, active: true },
        { name: 'My Bookings', icon: <MapPin size={20} /> },
        { name: 'Tournaments', icon: <Trophy size={20} /> },
        { name: 'Orders', icon: <ShoppingBag size={20} /> },
        { name: 'Profile', icon: <User size={20} /> },
        { name: 'Settings', icon: <Settings size={20} /> },
    ];

    return (
        <div className="pt-24 min-h-screen bg-background flex">
            {/* Sidebar */}
            <div className="hidden lg:flex w-72 border-r border-border p-6 flex-col gap-4 fixed left-0 top-24 bottom-0 glass">
                <div className="mb-8 p-4 bg-surface rounded-2xl border border-border">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center font-black text-xl">
                            {user.username[0].toUpperCase()}
                        </div>
                        <div>
                            <p className="font-bold truncate">{user.username}</p>
                            <p className="text-xs text-text-muted capitalize">{user.role}</p>
                        </div>
                    </div>
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest bg-background p-1 text-center rounded">Verified Account</p>
                </div>

                {sidebarItems.map(item => (
                    <button
                        key={item.name}
                        className={`flex items-center gap-4 p-4 rounded-xl font-bold transition-all ${item.active ? 'bg-primary text-white shadow-lg' : 'hover:bg-white/5 text-text-muted'}`}
                    >
                        {item.icon} {item.name}
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div className="lg:ml-72 flex-grow p-8">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-black mb-1">WELCOME BACK, CHAMP!</h1>
                        <p className="text-text-muted italic">Keep training, keep winning.</p>
                    </div>
                    <button className="p-3 bg-surface border border-border rounded-xl relative">
                        <Bell size={24} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {[
                        { label: 'Active Bookings', val: '0', icon: <MapPin className="text-accent" /> },
                        { label: 'Points Earned', val: '150', icon: <Trophy className="text-primary" /> },
                        { label: 'Recent Activity', val: '2 Posts', icon: <LayoutDashboard className="text-accent" /> },
                    ].map((stat, i) => (
                        <div key={i} className="glass-card p-6 rounded-3xl border-l-4 border-l-primary">
                            <div className="flex justify-between items-start mb-4">
                                {stat.icon}
                                <span className="text-xs font-bold text-text-muted">THIS MONTH</span>
                            </div>
                            <h3 className="text-text-muted font-bold uppercase text-[10px] tracking-widest">{stat.label}</h3>
                            <p className="text-4xl font-black mt-1">{stat.val}</p>
                        </div>
                    ))}
                </div>

                {/* Placeholder for Dynamic Content */}
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="glass-card p-8 rounded-3xl min-h-[400px]">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <MapPin className="text-primary" size={20} /> RECENT BOOKINGS
                        </h2>
                        <div className="flex flex-col items-center justify-center h-full text-center text-text-muted">
                            <p className="mb-4">You haven't booked any turfs yet.</p>
                            <button className="bg-white text-black px-6 py-2 rounded-xl font-bold hover:bg-primary hover:text-white transition-all">
                                Explore Arenas
                            </button>
                        </div>
                    </div>

                    <div className="glass-card p-8 rounded-3xl min-h-[400px]">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Trophy className="text-primary" size={20} /> RECOMMENDED FOR YOU
                        </h2>
                        <div className="flex flex-col gap-4">
                            <div className="bg-background/50 border border-border p-4 rounded-xl flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold">Winter Cup 2026</h4>
                                    <p className="text-xs text-text-muted">Cricket Tournament • Starting Jan 25</p>
                                </div>
                                <button className="text-primary font-bold text-sm">Join</button>
                            </div>
                            <div className="bg-background/50 border border-border p-4 rounded-xl flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold">Weekly Football League</h4>
                                    <p className="text-xs text-text-muted">Football • Every Sat & Sun</p>
                                </div>
                                <button className="text-primary font-bold text-sm">Join</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
