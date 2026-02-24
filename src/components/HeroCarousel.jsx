import { useState, useEffect, useRef, useCallback } from 'react'
import './HeroCarousel.css'

export default function HeroCarousel({ slides }) {
    const [current, setCurrent] = useState(0)
    const timerRef = useRef(null)

    const goTo = useCallback((idx) => {
        setCurrent(idx)
        clearInterval(timerRef.current)
        timerRef.current = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000)
    }, [slides.length])

    useEffect(() => {
        if (!slides.length) return
        timerRef.current = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000)
        return () => clearInterval(timerRef.current)
    }, [slides.length])

    if (!slides.length) return null

    return (
        <section className="hero-carousel">
            {slides.map((s, i) => (
                <div key={s.id || i} className={`hero-slide ${i === current ? 'active' : ''}`}>
                    <div className="hero-bg" style={{ backgroundImage: `url(${s.banner_url || s.image_url})` }} />
                    <div className="hero-info">
                        {s.badge && <div className="hero-badge"><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg> {s.badge}</div>}
                        <h1 className="hero-title">{s.title}</h1>
                        <div className="hero-meta">
                            {s.imdb_score && <span className="imdb">IMDb {s.imdb_score}</span>}
                            {s.rating && <><span className="rating-badge">{s.rating}</span><span className="dot" /></>}
                            {s.year && <><span>{s.year}</span><span className="dot" /></>}
                            {s.duration && <span>{s.duration}</span>}
                            {s.seasons && <><span className="dot" /><span>{s.seasons} Seasons</span></>}
                            {s.genre && <><span className="dot" /><span>{s.genre}</span></>}
                        </div>
                        <p className="hero-description">{s.description}</p>
                        <div className="hero-actions">
                            <button className="btn-primary"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg> Watch Now</button>
                            <button className="btn-secondary"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg> Watchlist</button>
                        </div>
                    </div>
                </div>
            ))}
            <div className="hero-dots">
                {slides.map((_, i) => (
                    <button key={i} className={`hero-dot ${i === current ? 'active' : ''}`} onClick={() => goTo(i)} />
                ))}
            </div>
        </section>
    )
}
