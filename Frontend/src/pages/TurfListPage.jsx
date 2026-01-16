import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { MapPin, Clock, Search } from 'lucide-react';
import { toast } from 'react-toastify';

const TurfListPage = () => {
    const [turfs, setTurfs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchTurfs();
    }, []);

    const fetchTurfs = async () => {
        try {
            const res = await api.get('/api/turfs/turfs/');
            setTurfs(res.data);
        } catch (err) {
            toast.error('Failed to fetch arena data');
        } finally {
            setLoading(false);
        }
    };

    const filteredTurfs = turfs.filter(turf =>
        turf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        turf.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="pt-32 pb-24 px-4 container">
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
                <div>
                    <h1 className="text-5xl font-black uppercase tracking-tighter" style={{ color: 'var(--secondary)' }}>
                        CHAMPION <span className="text-primary italic">ARENAS</span>
                    </h1>
                    <p className="text-muted font-bold uppercase tracking-widest text-xs mt-2">Available Slots & Bookings</p>
                </div>
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--primary)' }} size={20} />
                    <input
                        type="text"
                        placeholder="Search Arena / Location..."
                        className="input-field"
                        style={{ paddingLeft: '3.5rem', fontWeight: 'bold', border: '2px solid var(--surface-alt)' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 font-black text-2xl animate-pulse text-secondary">LOADING CHAMPIONS...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredTurfs.map((turf) => (
                        <div key={turf.id} className="card p-0 overflow-hidden group">
                            <div className="h-64 relative bg-secondary">
                                {turf.image ? (
                                    <img src={turf.image} alt={turf.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/10"><MapPin size={64} /></div>
                                )}
                                <div className="absolute top-4 right-4 bg-primary text-white font-black px-4 py-2 text-sm">
                                    ₹{turf.price_per_hour}/hr
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-black uppercase">{turf.name}</h3>
                                    <div className="bg-accent text-secondary px-2 py-1 text-[10px] font-black uppercase">Active</div>
                                </div>
                                <div className="flex items-center gap-2 text-muted mb-6 font-bold text-sm">
                                    <MapPin size={16} className="text-primary" />
                                    {turf.location}
                                </div>
                                <div className="flex justify-between items-center border-t border-surface-alt pt-6">
                                    <div className="flex items-center gap-2 text-xs font-black">
                                        <Clock size={16} className="text-primary" />
                                        {turf.available_from} - {turf.available_to}
                                    </div>
                                    <button className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.75rem' }}>
                                        BOOK SLOT
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TurfListPage;
