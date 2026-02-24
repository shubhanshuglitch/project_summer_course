import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import FeaturedBanner from '../components/FeaturedBanner'
import CategoryTabs from '../components/CategoryTabs'
import ContentRow from '../components/ContentRow'

const GENRES = ['All Movies', 'Prime Originals', 'Action', 'Sci-Fi', 'Drama', 'Crime', 'Comedy', 'Adventure']

export default function Movies() {
    const [featured, setFeatured] = useState(null)
    const [allMovies, setAllMovies] = useState([])
    const [activeTab, setActiveTab] = useState('All Movies')

    useEffect(() => {
        async function load() {
            const { data: feat } = await supabase
                .from('content')
                .select('*')
                .eq('type', 'movie')
                .eq('is_featured', true)
                .limit(1)
                .single()
            setFeatured(feat)

            const { data: mov } = await supabase
                .from('content')
                .select('*')
                .eq('type', 'movie')
                .order('sort_order')
            setAllMovies(mov || [])
        }
        load()
    }, [])

    const filtered = activeTab === 'All Movies'
        ? allMovies
        : activeTab === 'Prime Originals'
            ? allMovies.filter(m => m.is_prime)
            : allMovies.filter(m => m.genre && m.genre.toLowerCase().includes(activeTab.toLowerCase()))

    const primeOriginals = allMovies.filter(m => m.is_prime)
    const topRated = [...allMovies].sort((a, b) => (b.imdb_score || 0) - (a.imdb_score || 0)).slice(0, 10)
    const newReleases = [...allMovies].sort((a, b) => (b.year || 0) - (a.year || 0)).slice(0, 10)

    return (
        <>
            <FeaturedBanner item={featured} />
            <CategoryTabs tabs={GENRES} active={activeTab} onSelect={setActiveTab} />
            {activeTab !== 'All Movies' ? (
                <ContentRow title={activeTab} items={filtered} viewAll />
            ) : (
                <>
                    <ContentRow title="Prime Original Movies" items={primeOriginals} viewAll />
                    <ContentRow title="New Releases" items={newReleases} viewAll />
                    <ContentRow title="Top Rated Movies" items={topRated} viewAll />
                </>
            )}
        </>
    )
}
