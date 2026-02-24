import './FeaturedBanner.css'

export default function FeaturedBanner({ item, liveBadge }) {
    if (!item) return null
    return (
        <section className="featured-banner">
            <div className="banner-bg" style={{ backgroundImage: `url(${item.banner_url || item.image_url})` }} />
            <div className="featured-info">
                {liveBadge ? (
                    <div className="hero-badge live-badge-hero"><span className="live-dot-big" /> LIVE NOW</div>
                ) : (
                    item.badge && <div className="hero-badge"><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg> {item.badge}</div>
                )}
                <h1 className="hero-title">{item.title}</h1>
                <div className="hero-meta">
                    {item.imdb_score && <span className="imdb">IMDb {item.imdb_score}</span>}
                    {item.rating && <><span className="rating-badge">{item.rating}</span><span className="dot" /></>}
                    {item.year && <><span>{item.year}</span><span className="dot" /></>}
                    {item.duration && <span>{item.duration}</span>}
                    {item.seasons && <><span className="dot" /><span>{item.seasons} Seasons</span></>}
                    {item.genre && <><span className="dot" /><span>{item.genre}</span></>}
                </div>
                <p className="hero-description">{item.description}</p>
                <div className="hero-actions">
                    <button className="btn-primary"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg> {liveBadge ? 'Watch Live' : 'Watch Now'}</button>
                    <button className="btn-secondary"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg> Watchlist</button>
                </div>
            </div>
        </section>
    )
}
