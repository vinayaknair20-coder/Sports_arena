import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Trophy, Calendar, Users, Zap } from 'lucide-react';
import { toast } from 'react-toastify';

const TournamentListPage = () => {
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTournaments();
    }, []);

    const fetchTournaments = async () => {
        try {
            const res = await api.get('/api/tournaments/tournaments/');
            setTournaments(res.data);
        } catch (err) {
            toast.error('Failed to fetch tournaments');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'upcoming': return 'bg-accent text-white';
            case 'ongoing': return 'bg-primary text-white';
            case 'completed': return 'bg-text-muted text-white';
            default: return 'bg-border';
        }
    };

    return (
        <div className="pt-32 pb-16 px-4 container">
            <div className="mb-12">
                <h1 className="text-4xl font-black mb-2">LIVE TOURNAMENTS</h1>
                <p className="text-text-muted">Join the battle and become a champion</p>
            </div>

            {loading ? (
                <div className="text-center py-20 text-2xl font-bold">Fetching registrations...</div>
            ) : (
                <div className="grid lg:grid-cols-2 gap-8">
                    {tournaments.map((tournament) => (
                        <div key={tournament.id} className="glass-card rounded-3xl p-8 flex flex-col md:flex-row gap-8 relative overflow-hidden">
                            <div className={`absolute top-0 right-0 px-6 py-2 font-black uppercase text-sm rounded-bl-2xl ${getStatusColor(tournament.status)}`}>
                                {tournament.status}
                            </div>

                            <div className="md:w-1/3 flex flex-col items-center justify-center bg-background/50 rounded-2xl p-6 border border-border">
                                <Trophy size={64} className="text-primary mb-4" />
                                <div className="text-center">
                                    <p className="text-sm text-text-muted uppercase tracking-widest font-bold">Fee</p>
                                    <p className="text-2xl font-black">₹{tournament.registration_fee}</p>
                                </div>
                            </div>

                            <div className="md:w-2/3">
                                <div className="mb-4">
                                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                                        {tournament.sport_type}
                                    </span>
                                    <h3 className="text-2xl font-black">{tournament.name}</h3>
                                </div>

                                <p className="text-text-muted text-sm mb-6">{tournament.description}</p>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="flex items-center gap-3">
                                        <Calendar size={18} className="text-accent" />
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-text-muted">Starts</p>
                                            <p className="text-sm font-bold">{tournament.start_date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Users size={18} className="text-accent" />
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-text-muted">Format</p>
                                            <p className="text-sm font-bold">Standard</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button className="flex-grow bg-primary hover:bg-primary-dark py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95">
                                        Register Now
                                    </button>
                                    <button className="px-5 border border-border hover:bg-white/5 rounded-xl transition-all">
                                        Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {!loading && tournaments.length === 0 && (
                <div className="glass-card p-12 text-center rounded-3xl">
                    <Zap size={48} className="text-text-muted mx-auto mb-4" />
                    <h2 className="text-2xl font-bold">No active tournaments right now.</h2>
                    <p className="text-text-muted mt-2">Check back soon for upcoming sporting events!</p>
                </div>
            )}
        </div>
    );
};

export default TournamentListPage;
