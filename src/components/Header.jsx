import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Header.css'

export default function Header({ onOpenModal }) {
    const [scrolled, setScrolled] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const { user, signOut } = useAuth()
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const close = (e) => {
            if (!e.target.closest('.profile-wrapper')) setDropdownOpen(false)
            if (!e.target.closest('.search-container')) setSearchOpen(false)
        }
        document.addEventListener('click', close)
        return () => document.removeEventListener('click', close)
    }, [])

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/movies', label: 'Movies' },
        { path: '/tvshows', label: 'TV Shows' },
        { path: '/livetv', label: 'Live TV' },
    ]

    return (
        <header className={`pv-header ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-left">
                <Link to="/" className="logo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg" alt="Prime Video" />
                </Link>
                <nav className="nav-links">
                    {navItems.map(item => (
                        <Link key={item.path} to={item.path} className={location.pathname === item.path ? 'active' : ''}>
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="header-right">
                <div className="search-container">
                    <button className="search-toggle" onClick={(e) => { e.stopPropagation(); setSearchOpen(!searchOpen) }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                        <span>Search</span>
                    </button>
                    <div className={`search-input-wrap ${searchOpen ? 'open' : ''}`}>
                        <input type="text" placeholder="Search..." />
                        <button><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg></button>
                    </div>
                </div>
                <div className="profile-wrapper" style={{ position: 'relative' }}>
                    <button className="profile-btn" onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen) }}>
                        <div className="profile-avatar">{user ? user.email[0].toUpperCase() : 'U'}</div>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                    </button>
                    {dropdownOpen && (
                        <div className="profile-dropdown show">
                            <div className="profile-dropdown-header">
                                <div className="profile-avatar">{user ? user.email[0].toUpperCase() : 'U'}</div>
                                <span>{user ? user.email : 'Guest'}</span>
                            </div>
                            {user ? (
                                <a href="#" onClick={(e) => { e.preventDefault(); signOut(); setDropdownOpen(false) }}>Sign Out</a>
                            ) : (
                                <>
                                    <a href="#" onClick={(e) => { e.preventDefault(); onOpenModal('login'); setDropdownOpen(false) }}>Sign In</a>
                                    <a href="#" onClick={(e) => { e.preventDefault(); onOpenModal('signup'); setDropdownOpen(false) }}>Create Account</a>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
