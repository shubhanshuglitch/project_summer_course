import './ContentCard.css'

export default function ContentCard({ item, rank }) {
    const isLive = item.is_live
    return (
        <div className={`content-card ${isLive ? 'live-card' : ''}`}>
            {item.is_prime && <span className="card-badge">Prime</span>}
            {isLive && <span className="live-badge"><span className="live-dot" />LIVE</span>}
            {rank && <span className="rank-number">{rank}</span>}
            <img className="card-img" src={item.image_url} alt={item.title} loading="lazy" />
            <div className="card-play-icon">
                <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
            </div>
            <div className="card-overlay">
                <h3>{item.title}</h3>
                <p>{[item.rating, item.genre, item.year].filter(Boolean).join(' • ')}</p>
            </div>
        </div>
    )
}
