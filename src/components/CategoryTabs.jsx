import './CategoryTabs.css'

export default function CategoryTabs({ tabs, active, onSelect }) {
    return (
        <div className="category-tabs">
            {tabs.map(tab => (
                <button
                    key={tab}
                    className={`category-tab ${active === tab ? 'active' : ''}`}
                    onClick={() => onSelect(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    )
}
