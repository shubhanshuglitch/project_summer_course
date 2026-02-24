import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'
import Home from './pages/Home'
import Movies from './pages/Movies'
import TvShows from './pages/TvShows'
import LiveTv from './pages/LiveTv'
import { useState } from 'react'

export default function App() {
    const [modal, setModal] = useState(null) // 'login' | 'signup' | null

    return (
        <AuthProvider>
            <Header onOpenModal={setModal} />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/tvshows" element={<TvShows />} />
                    <Route path="/livetv" element={<LiveTv />} />
                </Routes>
            </main>
            <Footer />
            <AuthModal mode={modal} onClose={() => setModal(null)} onSwitch={setModal} />
        </AuthProvider>
    )
}
