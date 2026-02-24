import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './AuthModal.css'

export default function AuthModal({ mode, onClose, onSwitch }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { signIn, signUp } = useAuth()

    if (!mode) return null

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            if (mode === 'login') {
                await signIn(email, password)
            } else {
                await signUp(email, password)
            }
            onClose()
            setEmail('')
            setPassword('')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal-overlay show" onClick={onClose}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                <h2>{mode === 'login' ? 'Sign In' : 'Create Account'}</h2>
                <p className="modal-subtitle">{mode === 'login' ? 'Welcome back to Prime Video' : 'Join Prime Video'}</p>
                {error && <div className="modal-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="authEmail">Email</label>
                        <input id="authEmail" type="email" placeholder="your@email.com" required value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="authPassword">Password</label>
                        <input id="authPassword" type="password" placeholder={mode === 'signup' ? 'At least 6 characters' : 'Enter password'} required value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                    </button>
                </form>
                <p className="modal-footer-text">
                    {mode === 'login' ? (
                        <>New here? <a href="#" onClick={(e) => { e.preventDefault(); onSwitch('signup') }}>Create account</a></>
                    ) : (
                        <>Have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitch('login') }}>Sign in</a></>
                    )}
                </p>
            </div>
        </div>
    )
}
