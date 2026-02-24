import { useRef } from 'react'
import ContentCard from './ContentCard'
import './ContentRow.css'

export default function ContentRow({ title, items, showRank, viewAll }) {
    const rowRef = useRef(null)

    const scroll = (dir) => {
        if (rowRef.current) {
            rowRef.current.scrollBy({ left: dir * 600, behavior: 'smooth' })
        }
    }

    if (!items || !items.length) return null

    return (
        <section className="content-section">
            <div className="section-header">
                <h2>{title}</h2>
                {viewAll && <a href="#" className="view-all">View All <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg></a>}
            </div>
            <div className="content-row-wrapper">
                <button className="scroll-arrow left" onClick={() => scroll(-1)}>&#8249;</button>
                <div className="content-row" ref={rowRef}>
                    {items.map((item, i) => (
                        <ContentCard key={item.id || i} item={item} rank={showRank ? i + 1 : undefined} />
                    ))}
                </div>
                <button className="scroll-arrow right" onClick={() => scroll(1)}>&#8250;</button>
            </div>
        </section>
    )
}
