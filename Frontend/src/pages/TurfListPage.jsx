import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CalendarDays, Clock, MapPin, Search, X, Zap } from 'lucide-react';
import { toast } from 'react-toastify';

const today = new Date().toISOString().slice(0, 10);

const addHours = (time, hours) => {
    if (!time) return '';
    const [rawHour, rawMinute] = time.split(':').map(Number);
    const totalMinutes = rawHour * 60 + rawMinute + hours * 60;
    const nextHour = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
    const nextMinute = (totalMinutes % 60).toString().padStart(2, '0');
    return `${nextHour}:${nextMinute}`;
};

const formatTime = (time) => (time ? time.slice(0, 5) : '--:--');

const TurfListPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [turfs, setTurfs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTurf, setSelectedTurf] = useState(null);
    const [bookingForm, setBookingForm] = useState({
        date: today,
        start_time: '18:00',
        duration: 1,
    });

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

    const filteredTurfs = turfs.filter((turf) =>
        turf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        turf.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const endTime = useMemo(
        () => addHours(bookingForm.start_time, Number(bookingForm.duration)),
        [bookingForm.start_time, bookingForm.duration]
    );

    const estimatedTotal = useMemo(() => {
        if (!selectedTurf) return 0;
        return Number(selectedTurf.price_per_hour) * Number(bookingForm.duration);
    }, [selectedTurf, bookingForm.duration]);

    const openBooking = (turf) => {
        if (!user) {
            toast.info('Log in to book an arena.');
            navigate('/login');
            return;
        }

        setSelectedTurf(turf);
        setBookingForm({
            date: today,
            start_time: formatTime(turf.available_from),
            duration: 1,
        });
    };

    const submitBooking = async (event) => {
        event.preventDefault();
        if (!selectedTurf) return;

        setBooking(true);
        try {
            await api.post('/api/turfs/bookings/', {
                turf: selectedTurf.id,
                date: bookingForm.date,
                start_time: bookingForm.start_time,
                end_time: endTime,
            });
            toast.success('Arena booked successfully.');
            setSelectedTurf(null);
            navigate('/dashboard');
        } catch (err) {
            const message = err.response?.data?.non_field_errors?.[0] || err.response?.data?.detail || 'Booking failed. Try another slot.';
            toast.error(message);
        } finally {
            setBooking(false);
        }
    };

    return (
        <main className="arena-page">
            <section className="arena-hero">
                <div>
                    <p>Available Slots and Bookings</p>
                    <h1>Champion Arenas</h1>
                </div>
                <div className="arena-search">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Search arena or location"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                </div>
            </section>

            {loading ? (
                <div className="arena-loading">Loading arenas...</div>
            ) : (
                <section className="arena-grid">
                    {filteredTurfs.map((turf) => (
                        <article key={turf.id} className="arena-card">
                            <div className="arena-card-media">
                                {turf.image ? (
                                    <img src={turf.image} alt={turf.name} />
                                ) : (
                                    <MapPin size={58} />
                                )}
                                <span>Rs {Number(turf.price_per_hour).toFixed(0)}/hr</span>
                            </div>
                            <div className="arena-card-body">
                                <div>
                                    <p>{turf.location}</p>
                                    <h2>{turf.name}</h2>
                                </div>
                                <p className="arena-description">{turf.description}</p>
                                <div className="arena-meta">
                                    <span><Clock size={16} /> {formatTime(turf.available_from)} - {formatTime(turf.available_to)}</span>
                                    <span><Zap size={16} /> Active</span>
                                </div>
                                <button onClick={() => openBooking(turf)}>Book Slot</button>
                            </div>
                        </article>
                    ))}
                </section>
            )}

            {!loading && filteredTurfs.length === 0 && (
                <div className="arena-empty">
                    <MapPin size={42} />
                    <h2>No arenas found</h2>
                    <p>Try a different search term.</p>
                </div>
            )}

            {selectedTurf && (
                <div className="booking-backdrop" role="presentation">
                    <form className="booking-modal" onSubmit={submitBooking}>
                        <button type="button" className="booking-close" onClick={() => setSelectedTurf(null)} aria-label="Close booking">
                            <X size={20} />
                        </button>
                        <p className="booking-eyebrow">Confirm Booking</p>
                        <h2>{selectedTurf.name}</h2>
                        <p className="booking-location"><MapPin size={16} /> {selectedTurf.location}</p>

                        <div className="booking-fields">
                            <label>
                                <span>Date</span>
                                <input
                                    type="date"
                                    min={today}
                                    value={bookingForm.date}
                                    onChange={(event) => setBookingForm({ ...bookingForm, date: event.target.value })}
                                    required
                                />
                            </label>
                            <label>
                                <span>Start Time</span>
                                <input
                                    type="time"
                                    value={bookingForm.start_time}
                                    onChange={(event) => setBookingForm({ ...bookingForm, start_time: event.target.value })}
                                    required
                                />
                            </label>
                            <label>
                                <span>Duration</span>
                                <select
                                    value={bookingForm.duration}
                                    onChange={(event) => setBookingForm({ ...bookingForm, duration: event.target.value })}
                                >
                                    <option value="1">1 hour</option>
                                    <option value="2">2 hours</option>
                                    <option value="3">3 hours</option>
                                </select>
                            </label>
                        </div>

                        <div className="booking-summary">
                            <div>
                                <span>Ends At</span>
                                <strong>{endTime}</strong>
                            </div>
                            <div>
                                <span>Total</span>
                                <strong>Rs {estimatedTotal.toFixed(0)}</strong>
                            </div>
                        </div>

                        <button className="booking-submit" disabled={booking}>
                            <CalendarDays size={18} />
                            {booking ? 'Booking...' : 'Confirm Slot'}
                        </button>
                    </form>
                </div>
            )}

            <style>{`
                .arena-page {
                    min-height: 100vh;
                    background: #f6f6f6;
                    padding: 7rem 2rem 4rem;
                    color: #111;
                }

                .arena-hero {
                    max-width: 1400px;
                    margin: 0 auto 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: end;
                    gap: 1.5rem;
                }

                .arena-hero p,
                .booking-eyebrow {
                    color: var(--primary);
                    font-size: 0.68rem;
                    font-weight: 900;
                    letter-spacing: 0.32em;
                    text-transform: uppercase;
                    margin: 0 0 0.65rem;
                }

                .arena-hero h1 {
                    font-size: clamp(3rem, 8vw, 6.5rem);
                    line-height: 0.85;
                    letter-spacing: -0.05em;
                    text-transform: uppercase;
                    font-weight: 900;
                    margin: 0;
                }

                .arena-search {
                    width: min(420px, 100%);
                    min-height: 56px;
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    background: #fff;
                    border: 1px solid #e8e8e8;
                    padding: 0 1rem;
                    color: var(--primary);
                }

                .arena-search input {
                    width: 100%;
                    border: none;
                    outline: none;
                    color: #111;
                    font: inherit;
                    font-weight: 800;
                    background: transparent;
                }

                .arena-grid {
                    max-width: 1400px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 1rem;
                }

                .arena-card {
                    background: #fff;
                    border: 1px solid #e8e8e8;
                    overflow: hidden;
                }

                .arena-card-media {
                    height: 250px;
                    position: relative;
                    background: #0a0a0a;
                    color: rgba(255,255,255,0.18);
                    display: grid;
                    place-items: center;
                }

                .arena-card-media img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .arena-card-media span {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: var(--primary);
                    color: #fff;
                    font-size: 0.75rem;
                    font-weight: 900;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    padding: 0.65rem 0.8rem;
                }

                .arena-card-body {
                    padding: 1.25rem;
                }

                .arena-card-body > div:first-child p {
                    color: #777;
                    font-size: 0.7rem;
                    font-weight: 900;
                    letter-spacing: 0.16em;
                    text-transform: uppercase;
                    margin: 0 0 0.45rem;
                }

                .arena-card-body h2 {
                    font-size: 1.5rem;
                    font-weight: 900;
                    text-transform: uppercase;
                    margin: 0;
                }

                .arena-description {
                    color: #666;
                    line-height: 1.5;
                    font-weight: 600;
                    min-height: 66px;
                    margin: 1rem 0;
                }

                .arena-meta {
                    display: flex;
                    justify-content: space-between;
                    gap: 0.8rem;
                    border-top: 1px solid #eee;
                    padding-top: 1rem;
                    margin-bottom: 1rem;
                    color: #555;
                    font-size: 0.78rem;
                    font-weight: 900;
                    text-transform: uppercase;
                }

                .arena-meta span {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                }

                .arena-meta svg {
                    color: var(--primary);
                }

                .arena-card-body button,
                .booking-submit {
                    width: 100%;
                    min-height: 52px;
                    border: none;
                    background: #050505;
                    color: #fff;
                    font: inherit;
                    font-size: 0.78rem;
                    font-weight: 900;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: 0.25s ease;
                }

                .arena-card-body button:hover,
                .booking-submit:hover:not(:disabled) {
                    background: var(--primary);
                }

                .arena-loading,
                .arena-empty {
                    max-width: 1400px;
                    margin: 0 auto;
                    background: #fff;
                    padding: 3rem;
                    text-align: center;
                    font-weight: 900;
                }

                .arena-empty svg {
                    color: var(--primary);
                }

                .arena-empty h2 {
                    margin: 1rem 0 0.25rem;
                    text-transform: uppercase;
                }

                .arena-empty p {
                    margin: 0;
                    color: #777;
                }

                .booking-backdrop {
                    position: fixed;
                    inset: 0;
                    z-index: 200;
                    background: rgba(0,0,0,0.72);
                    display: grid;
                    place-items: center;
                    padding: 1rem;
                }

                .booking-modal {
                    width: min(560px, 100%);
                    background: #fff;
                    color: #111;
                    padding: 2rem;
                    position: relative;
                    box-shadow: 0 30px 70px rgba(0,0,0,0.45);
                }

                .booking-close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    width: 42px;
                    height: 42px;
                    border: none;
                    background: #f2f2f2;
                    color: #111;
                    display: grid;
                    place-items: center;
                    cursor: pointer;
                }

                .booking-modal h2 {
                    font-size: clamp(2rem, 6vw, 3.5rem);
                    line-height: 0.9;
                    letter-spacing: -0.04em;
                    text-transform: uppercase;
                    font-weight: 900;
                    margin: 0 3rem 0.8rem 0;
                }

                .booking-location {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    color: #666;
                    font-weight: 800;
                    margin: 0 0 1.4rem;
                }

                .booking-location svg {
                    color: var(--primary);
                }

                .booking-fields {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 0.8rem;
                }

                .booking-fields label {
                    display: flex;
                    flex-direction: column;
                    gap: 0.45rem;
                }

                .booking-fields span,
                .booking-summary span {
                    color: #777;
                    font-size: 0.68rem;
                    font-weight: 900;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                }

                .booking-fields input,
                .booking-fields select {
                    min-height: 50px;
                    border: 1px solid #e8e8e8;
                    background: #f8f8f8;
                    color: #111;
                    padding: 0 0.8rem;
                    font: inherit;
                    font-weight: 800;
                }

                .booking-fields input:focus,
                .booking-fields select:focus {
                    outline: none;
                    border-color: var(--primary);
                    box-shadow: 0 0 0 4px rgba(211, 47, 47, 0.1);
                }

                .booking-summary {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 0.8rem;
                    margin: 1rem 0;
                }

                .booking-summary div {
                    background: #f8f8f8;
                    border: 1px solid #eee;
                    padding: 1rem;
                }

                .booking-summary strong {
                    display: block;
                    margin-top: 0.35rem;
                    font-size: 1.4rem;
                    font-weight: 900;
                }

                .booking-submit {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.7rem;
                }

                .booking-submit:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                @media (max-width: 980px) {
                    .arena-hero {
                        display: block;
                    }

                    .arena-search {
                        margin-top: 1.4rem;
                    }

                    .arena-grid {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }
                }

                @media (max-width: 660px) {
                    .arena-page {
                        padding: 6rem 1rem 3rem;
                    }

                    .arena-grid,
                    .booking-fields,
                    .booking-summary {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </main>
    );
};

export default TurfListPage;
