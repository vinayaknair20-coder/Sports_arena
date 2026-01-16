import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { animate, stagger, createTimeline } from 'animejs';
import { ArrowRight, Trophy, MapPin, ShoppingBag, Zap } from 'lucide-react';
import heroMultisport from '../assets/hero-multisport.png';

const HomePage = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Advanced Anime.js v4 Timeline for Hero
        const tl = createTimeline({
            easing: 'easeOutExpo',
        });

        tl.add({
            targets: '.hero-reveal',
            translateY: [120, 0],
            opacity: [0, 1],
            delay: stagger(150),
            duration: 1200,
        });

        tl.add({
            targets: '.hero-btn-wrap',
            scale: [0.95, 1],
            opacity: [0, 1],
            duration: 800,
        }, '-=700');

        tl.add({
            targets: '.hero-bg-img',
            opacity: [0, 0.4],
            duration: 2000,
            easing: 'linear'
        }, 0);

        // Scroll Intersection Observer for Entrance Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    animate(target, {
                        translateY: [40, 0],
                        opacity: [0, 1],
                        easing: 'easeOutExpo',
                        duration: 1000,
                        delay: target.dataset.delay ? parseInt(target.dataset.delay) : 0
                    });
                    observer.unobserve(target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);


    return (
        <div style={{ background: 'var(--bg-light)' }} ref={containerRef}>
            {/* Luxury Hero Section */}
            <section className="hero-editorial">
                <img
                    src={heroMultisport}
                    className="hero-bg-img"
                    alt="Multisport Arena Background"
                    style={{ filter: 'brightness(0.6)' }}
                />

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ overflow: 'hidden', marginBottom: '0.5rem', marginTop: '1rem' }}>
                        <div className="hero-reveal" style={{ color: 'var(--primary)', fontWeight: '900', letterSpacing: '0.6em', fontSize: '0.7rem', textTransform: 'uppercase' }}>
                            Step into the Arena
                        </div>
                    </div>

                    <div style={{ overflow: 'hidden' }}>
                        <h1 className="h-jumbo hero-reveal">COMMAND</h1>
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <h1 className="h-jumbo hero-reveal t-serif-style" style={{ marginTop: '-2rem' }}>SUCCESS.</h1>
                    </div>

                    <div className="hero-reveal" style={{ marginTop: '2.5rem', maxWidth: '600px', lineHeight: '1.6', color: 'rgba(255,255,255,0.7)', fontWeight: '400', fontSize: '1.1rem' }}>
                        The unified digital platform integrating precision turf bookings, curated gear, elite tournaments, and athlete networking into one high-performance sports ecosystem.
                    </div>

                    <div style={{ marginTop: '4rem' }} className="hero-btn-wrap">
                        <Link to="/turfs" className="btn-lux" style={{ border: '1px solid white', color: 'white', background: 'transparent' }}>
                            EXPLORE THE HUB <ArrowRight size={18} style={{ marginLeft: '1rem' }} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Marquee Ticker */}
            <div className="marquee-editorial">
                <div className="marquee-content">
                    <span>UPCOMING: MUMBAI OPEN FINALS @ 8PM</span>
                    <span style={{ color: 'var(--primary)' }}>•</span>
                    <span>NEW VENUE: SKYLINE TURF NOW ACTIVE</span>
                    <span style={{ color: 'var(--primary)' }}>•</span>
                    <span>SHOP: ELITE SERIES GEAR COLLECTION LIVE</span>
                    <span style={{ color: 'var(--primary)' }}>•</span>
                    <span>MEMBER EXCLUSIVE: 15% OFF ALL BOOKINGS</span>
                    <span style={{ color: 'var(--primary)' }}>•</span>
                    <span>UPCOMING: MUMBAI OPEN FINALS @ 8PM</span>
                    <span style={{ color: 'var(--primary)' }}>•</span>
                    <span>NEW VENUE: SKYLINE TURF NOW ACTIVE</span>
                    <span style={{ color: 'var(--primary)' }}>•</span>
                </div>
            </div>

            {/* High-Concept Bento Grid */}
            <section className="pad-v" style={{ background: 'black' }}>
                <div className="container">
                    <div className="flex justify-between items-end m-b-lg" style={{ flexWrap: 'wrap', gap: '2rem' }}>
                        <h2 className="h-section scroll-reveal" style={{ color: 'white' }}>ELITE <br />PILLARS</h2>
                        <Link to="/register" className="btn-lux scroll-reveal" style={{ color: 'var(--primary)', borderColor: 'var(--primary)', padding: '1rem 2rem' }}>JOIN LEAGUE</Link>
                    </div>

                    <div className="grid grid-3">
                        <div className="bento-item scroll-reveal" style={{ background: '#0D0D0D', border: '1px solid #1A1A1A', color: 'white' }} data-delay="100">
                            <MapPin style={{ color: 'var(--primary)', marginBottom: '2rem' }} size={40} />
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '900', marginBottom: '1.5rem' }}>ARENAS</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>Integrated slot management for high-performance venues and natural turf grounds within the ecosystem.</p>
                            <Link to="/turfs" style={{ marginTop: '2.5rem', display: 'inline-block', color: 'white', fontWeight: '900', fontSize: '0.7rem' }}>DISCOVER SLOTS →</Link>
                        </div>
                        <div className="bento-item scroll-reveal" style={{ background: '#0D0D0D', border: '1px solid #1A1A1A', color: 'white' }} data-delay="200">
                            <Trophy style={{ color: 'var(--primary)', marginBottom: '2rem' }} size={40} />
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '900', marginBottom: '1.5rem' }}>LEAGUES</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>Pro-tier tournament hosting with real-time scoring data, fully synced with your athlete profile.</p>
                            <Link to="/tournaments" style={{ marginTop: '2.5rem', display: 'inline-block', color: 'white', fontWeight: '900', fontSize: '0.7rem' }}>VIEW EVENTS →</Link>
                        </div>
                        <div className="bento-item scroll-reveal" style={{ background: '#0D0D0D', border: '1px solid #1A1A1A', color: 'white' }} data-delay="300">
                            <ShoppingBag style={{ color: 'var(--primary)', marginBottom: '2rem' }} size={40} />
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '900', marginBottom: '1.5rem' }}>SHOP</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>A curated athletic store for professional gear, providing the ultimate equipment for every match.</p>
                            <Link to="/shop" style={{ marginTop: '2.5rem', display: 'inline-block', color: 'white', fontWeight: '900', fontSize: '0.7rem' }}>BROWSE GEAR →</Link>
                        </div>
                    </div>
                </div>
            </section>


            {/* Minimalism CTA Expansion */}
            <section className="pad-v" style={{ background: 'var(--bg-dark)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div className="container" style={{ position: 'relative', zIndex: 5, padding: '12rem 0' }}>
                    <h2 className="h-jumbo" style={{ color: 'white', opacity: 0.04, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', pointerEvents: 'none', margin: 0, lineHeight: 1 }}>DOMINATE</h2>
                    <div className="scroll-reveal" style={{ position: 'relative', zIndex: 10 }}>
                        <h2 className="h-section" style={{ color: 'white', marginBottom: '3.5rem', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>CHOOSE YOUR LEGACY.</h2>
                        <Link to="/register" className="btn-lux btn-lux-primary" style={{ border: 'none', background: 'var(--primary)', color: 'white', padding: '1.5rem 4.5rem', fontSize: '1.2rem' }}>
                            CREATE ATHLETE PROFILE
                        </Link>
                    </div>
                </div>
            </section>

            {/* Luxury Footer */}
            <footer style={{ background: '#050505', color: 'white', padding: '8rem 0' }}>
                <div className="container flex justify-between items-start" style={{ flexWrap: 'wrap', gap: '4rem' }}>
                    <div style={{ maxWidth: '300px' }}>
                        <div style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '2rem' }}>
                            <span style={{ color: 'var(--primary)' }}>SPORT</span>ARENA
                        </div>
                        <p style={{ color: '#444', lineHeight: '1.7', fontSize: '0.9rem' }}>
                            A unified digital platform that integrates turf bookings, sports shops, tournaments, and social networking into a single high-performance sports ecosystem.
                        </p>
                    </div>

                    <div className="flex gap-12" style={{ flexWrap: 'wrap' }}>
                        <div>
                            <h4 style={{ color: 'var(--primary)', fontWeight: '900', fontSize: '0.6rem', letterSpacing: '0.4em', marginBottom: '2rem', textTransform: 'uppercase' }}>Resources</h4>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#666', fontWeight: '800', fontSize: '0.7rem' }}>
                                <li>ARENAS</li>
                                <li>TOURNAMENTS</li>
                                <li>PRO SHOP</li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ color: 'var(--primary)', fontWeight: '900', fontSize: '0.6rem', letterSpacing: '0.4em', marginBottom: '2rem', textTransform: 'uppercase' }}>Social</h4>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#666', fontWeight: '800', fontSize: '0.7rem' }}>
                                <li>INSTAGRAM</li>
                                <li>X / TWITTER</li>
                                <li>DISCORD</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container" style={{ marginTop: '6rem', borderTop: '1px solid #111', paddingTop: '3rem', textAlign: 'center' }}>
                    <div style={{ color: '#222', fontWeight: '900', letterSpacing: '0.6em', fontSize: '0.6rem' }}>
                        © 2026 SPORTARENA • ALL RIGHTS RESERVED
                    </div>
                </div>
            </footer>

            <style>{`
        .bento-item { transition: var(--transition); }
        .bento-item:hover { border-color: var(--primary) !important; transform: scale(1.02); }
        .btn-lux:hover { letter-spacing: 0.3em; }
      `}</style>
        </div>
    );
};

export default HomePage;
