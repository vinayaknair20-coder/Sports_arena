import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Bell,
    CalendarDays,
    ChevronRight,
    Dumbbell,
    LayoutDashboard,
    MapPin,
    Medal,
    ShoppingBag,
    Trophy,
    User,
    Zap
} from 'lucide-react';
import heroMultisport from '../assets/hero-multisport.png';

const DashboardPage = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <main className="dashboard-shell" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0a0a0a', color: '#fff' }}>
                <p style={{ fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Loading arena access...</p>
            </main>
        );
    }

    if (!user) return <Navigate to="/login" />;

    const roleLabel = (user.role || 'player').replaceAll('_', ' ');
    const initials = (user.username || 'A').slice(0, 1).toUpperCase();

    const quickActions = [
        { title: 'Book Arena', body: 'Find active turfs and lock your next slot.', to: '/turfs', icon: <MapPin size={22} /> },
        { title: 'Join League', body: 'Enter tournaments built for your sport.', to: '/tournaments', icon: <Trophy size={22} /> },
        { title: 'Gear Up', body: 'Browse equipment before match day.', to: '/shop', icon: <ShoppingBag size={22} /> },
    ];

    const stats = [
        { label: 'Active Bookings', value: '0', hint: 'No current slot', icon: <CalendarDays size={22} /> },
        { label: 'Arena Points', value: '150', hint: 'Starter rank', icon: <Medal size={22} /> },
        { label: 'Match Activity', value: '2', hint: 'This week', icon: <Zap size={22} /> },
    ];

    const upcoming = [
        { name: 'Winter Cup 2026', meta: 'Cricket tournament', action: 'Join', to: '/tournaments' },
        { name: 'Weekly Football League', meta: 'Every Sat and Sun', action: 'View', to: '/tournaments' },
        { name: 'Skyline Turf Slots', meta: 'Evening slots open', action: 'Book', to: '/turfs' },
    ];

    return (
        <main className="dashboard-shell">
            <aside className="dashboard-sidebar">
                <Link to="/" className="dashboard-brand">
                    <span>SPORT</span>ARENA
                </Link>

                <div className="dashboard-user">
                    <div className="dashboard-avatar">{initials}</div>
                    <div>
                        <h2>{user.username}</h2>
                        <p>{roleLabel}</p>
                    </div>
                </div>

                <nav className="dashboard-nav" aria-label="Dashboard navigation">
                    <button className="is-active"><LayoutDashboard size={18} /> Overview</button>
                    <Link to="/turfs"><MapPin size={18} /> Arenas</Link>
                    <Link to="/tournaments"><Trophy size={18} /> Tournaments</Link>
                    <Link to="/shop"><ShoppingBag size={18} /> Shop</Link>
                    <Link to="/social"><User size={18} /> Social</Link>
                </nav>
            </aside>

            <section className="dashboard-main">
                <div className="dashboard-hero">
                    <img src={heroMultisport} alt="" />
                    <div className="dashboard-hero-content">
                        <div className="dashboard-topbar">
                            <p>Player Command Center</p>
                            <button aria-label="Notifications">
                                <Bell size={20} />
                                <span></span>
                            </button>
                        </div>

                        <div className="dashboard-hero-copy">
                            <p className="dashboard-eyebrow">Welcome back, {user.username}</p>
                            <h1>Build your next winning run.</h1>
                            <p className="dashboard-subcopy">
                                Book arenas, enter tournaments, track your activity, and keep your SportArena profile match-ready.
                            </p>
                            <div className="dashboard-hero-actions">
                                <Link to="/turfs">Book a Slot <ChevronRight size={18} /></Link>
                                <Link to="/tournaments">Find Tournament</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dashboard-grid">
                    <section className="dashboard-panel dashboard-profile-panel">
                        <div className="dashboard-section-title">
                            <Dumbbell size={20} />
                            <h2>Player Profile</h2>
                        </div>
                        <div className="profile-row">
                            <span>Email</span>
                            <strong>{user.email || 'Not added'}</strong>
                        </div>
                        <div className="profile-row">
                            <span>Phone</span>
                            <strong>{user.phone || 'Not added'}</strong>
                        </div>
                        <div className="profile-row">
                            <span>Location</span>
                            <strong>{user.address || 'Not added'}</strong>
                        </div>
                    </section>

                    <section className="dashboard-stats">
                        {stats.map((stat) => (
                            <article key={stat.label} className="dashboard-stat-card">
                                <div>{stat.icon}</div>
                                <span>{stat.label}</span>
                                <strong>{stat.value}</strong>
                                <p>{stat.hint}</p>
                            </article>
                        ))}
                    </section>

                    <section className="dashboard-panel dashboard-wide">
                        <div className="dashboard-section-title">
                            <Zap size={20} />
                            <h2>Quick Actions</h2>
                        </div>
                        <div className="quick-action-grid">
                            {quickActions.map((action) => (
                                <Link to={action.to} key={action.title} className="quick-action">
                                    <span>{action.icon}</span>
                                    <strong>{action.title}</strong>
                                    <p>{action.body}</p>
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section className="dashboard-panel dashboard-wide">
                        <div className="dashboard-section-title">
                            <Trophy size={20} />
                            <h2>Recommended Next</h2>
                        </div>
                        <div className="recommended-list">
                            {upcoming.map((item) => (
                                <Link to={item.to} key={item.name} className="recommended-item">
                                    <div>
                                        <strong>{item.name}</strong>
                                        <p>{item.meta}</p>
                                    </div>
                                    <span>{item.action}</span>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </section>

            <style>{`
                .dashboard-shell {
                    min-height: 100vh;
                    background: #0a0a0a;
                    color: #111;
                    display: flex;
                    padding-top: 72px;
                }

                .dashboard-sidebar {
                    width: 280px;
                    flex-shrink: 0;
                    background: #050505;
                    border-right: 1px solid rgba(255,255,255,0.08);
                    color: #fff;
                    padding: 2rem 1.35rem;
                    position: sticky;
                    top: 72px;
                    height: calc(100vh - 72px);
                }

                .dashboard-brand {
                    display: inline-flex;
                    color: #fff;
                    text-decoration: none;
                    font-size: 1.45rem;
                    font-weight: 900;
                    letter-spacing: -0.03em;
                    margin-bottom: 2rem;
                }

                .dashboard-brand span {
                    color: var(--primary);
                }

                .dashboard-user {
                    display: flex;
                    align-items: center;
                    gap: 0.9rem;
                    padding: 1rem;
                    border: 1px solid rgba(255,255,255,0.08);
                    background: #101010;
                    margin-bottom: 1.5rem;
                }

                .dashboard-avatar {
                    width: 48px;
                    height: 48px;
                    display: grid;
                    place-items: center;
                    background: var(--primary);
                    color: #fff;
                    font-weight: 900;
                    font-size: 1.35rem;
                }

                .dashboard-user h2 {
                    font-size: 1rem;
                    margin: 0;
                    font-weight: 900;
                }

                .dashboard-user p {
                    color: #888;
                    margin: 0.25rem 0 0;
                    text-transform: capitalize;
                    font-size: 0.75rem;
                    font-weight: 800;
                }

                .dashboard-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 0.35rem;
                }

                .dashboard-nav a,
                .dashboard-nav button {
                    min-height: 48px;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: rgba(255,255,255,0.72);
                    text-decoration: none;
                    border: none;
                    background: transparent;
                    font: inherit;
                    font-size: 0.74rem;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 0.14em;
                    padding: 0 1rem;
                    cursor: pointer;
                }

                .dashboard-nav .is-active,
                .dashboard-nav a:hover {
                    background: #fff;
                    color: #050505;
                }

                .dashboard-main {
                    flex: 1;
                    min-width: 0;
                    background: #f6f6f6;
                    padding: 1.35rem;
                }

                .dashboard-hero {
                    min-height: 340px;
                    position: relative;
                    overflow: hidden;
                    background: #050505;
                    color: #fff;
                }

                .dashboard-hero img {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    opacity: 0.32;
                }

                .dashboard-hero-content {
                    position: relative;
                    z-index: 1;
                    min-height: 340px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 1.5rem;
                }

                .dashboard-topbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 1rem;
                }

                .dashboard-topbar p,
                .dashboard-eyebrow {
                    color: var(--primary);
                    font-size: 0.68rem;
                    font-weight: 900;
                    letter-spacing: 0.32em;
                    text-transform: uppercase;
                    margin: 0;
                }

                .dashboard-topbar button {
                    width: 44px;
                    height: 44px;
                    border: 1px solid rgba(255,255,255,0.18);
                    background: rgba(0,0,0,0.35);
                    color: #fff;
                    display: grid;
                    place-items: center;
                    position: relative;
                    cursor: pointer;
                }

                .dashboard-topbar button span {
                    position: absolute;
                    top: 10px;
                    right: 11px;
                    width: 8px;
                    height: 8px;
                    background: var(--primary);
                    border-radius: 999px;
                }

                .dashboard-hero-copy {
                    max-width: 720px;
                }

                .dashboard-hero-copy h1 {
                    font-size: clamp(3rem, 7vw, 6.75rem);
                    line-height: 0.86;
                    letter-spacing: -0.05em;
                    text-transform: uppercase;
                    font-weight: 900;
                    margin: 0.75rem 0 1.1rem;
                }

                .dashboard-subcopy {
                    max-width: 560px;
                    color: rgba(255,255,255,0.72);
                    line-height: 1.55;
                    font-weight: 600;
                    margin: 0;
                }

                .dashboard-hero-actions {
                    display: flex;
                    gap: 0.85rem;
                    flex-wrap: wrap;
                    margin-top: 1.4rem;
                }

                .dashboard-hero-actions a {
                    min-height: 48px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.55rem;
                    color: #050505;
                    background: #fff;
                    text-decoration: none;
                    font-size: 0.72rem;
                    font-weight: 900;
                    letter-spacing: 0.16em;
                    text-transform: uppercase;
                    padding: 0 1.3rem;
                }

                .dashboard-hero-actions a:first-child {
                    background: var(--primary);
                    color: #fff;
                }

                .dashboard-grid {
                    display: grid;
                    grid-template-columns: minmax(260px, 0.8fr) minmax(0, 1.4fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .dashboard-panel,
                .dashboard-stat-card {
                    background: #fff;
                    border: 1px solid #e9e9e9;
                    padding: 1.2rem;
                }

                .dashboard-section-title {
                    display: flex;
                    align-items: center;
                    gap: 0.65rem;
                    margin-bottom: 1rem;
                    color: var(--primary);
                }

                .dashboard-section-title h2 {
                    color: #050505;
                    font-size: 0.85rem;
                    font-weight: 900;
                    letter-spacing: 0.16em;
                    text-transform: uppercase;
                    margin: 0;
                }

                .profile-row {
                    display: flex;
                    justify-content: space-between;
                    gap: 1rem;
                    padding: 0.95rem 0;
                    border-top: 1px solid #eee;
                }

                .profile-row span {
                    color: #777;
                    font-size: 0.75rem;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                }

                .profile-row strong {
                    max-width: 58%;
                    text-align: right;
                    color: #111;
                    font-size: 0.9rem;
                    overflow-wrap: anywhere;
                }

                .dashboard-stats {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 1rem;
                }

                .dashboard-stat-card {
                    min-height: 160px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .dashboard-stat-card div {
                    color: var(--primary);
                }

                .dashboard-stat-card span {
                    color: #777;
                    font-size: 0.68rem;
                    font-weight: 900;
                    letter-spacing: 0.16em;
                    text-transform: uppercase;
                }

                .dashboard-stat-card strong {
                    font-size: 2.8rem;
                    line-height: 1;
                    font-weight: 900;
                }

                .dashboard-stat-card p {
                    margin: 0;
                    color: #777;
                    font-weight: 700;
                    font-size: 0.86rem;
                }

                .dashboard-wide {
                    grid-column: 1 / -1;
                }

                .quick-action-grid {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 1rem;
                }

                .quick-action {
                    min-height: 150px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    gap: 0.6rem;
                    color: #fff;
                    background: #101010;
                    text-decoration: none;
                    padding: 1rem;
                    transition: 0.25s ease;
                }

                .quick-action:hover {
                    background: var(--primary);
                    transform: translateY(-3px);
                }

                .quick-action span {
                    color: var(--primary);
                    transition: 0.25s ease;
                }

                .quick-action:hover span {
                    color: #fff;
                }

                .quick-action strong {
                    font-size: 1.1rem;
                    font-weight: 900;
                    text-transform: uppercase;
                }

                .quick-action p {
                    margin: 0;
                    color: rgba(255,255,255,0.64);
                    line-height: 1.45;
                    font-weight: 600;
                }

                .recommended-list {
                    display: grid;
                    gap: 0.65rem;
                }

                .recommended-item {
                    min-height: 70px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1rem;
                    color: #111;
                    text-decoration: none;
                    border: 1px solid #eee;
                    padding: 1rem;
                }

                .recommended-item strong {
                    font-weight: 900;
                    text-transform: uppercase;
                }

                .recommended-item p {
                    margin: 0.3rem 0 0;
                    color: #777;
                    font-weight: 700;
                }

                .recommended-item span {
                    color: var(--primary);
                    font-size: 0.72rem;
                    font-weight: 900;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                }

                @media (max-width: 980px) {
                    .dashboard-shell {
                        display: block;
                    }

                    .dashboard-sidebar {
                        position: static;
                        width: 100%;
                        height: auto;
                    }

                    .dashboard-nav {
                        display: grid;
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }

                    .dashboard-grid,
                    .dashboard-stats,
                    .quick-action-grid {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 620px) {
                    .dashboard-main {
                        padding: 0.75rem;
                    }

                    .dashboard-hero-content {
                        padding: 1rem;
                    }

                    .dashboard-hero-copy h1 {
                        font-size: 2.65rem;
                    }

                    .profile-row {
                        display: block;
                    }

                    .profile-row strong {
                        display: block;
                        max-width: none;
                        text-align: left;
                        margin-top: 0.35rem;
                    }
                }
            `}</style>
        </main>
    );
};

export default DashboardPage;
