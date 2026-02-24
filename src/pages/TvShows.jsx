import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import FeaturedBanner from '../components/FeaturedBanner'
import CategoryTabs from '../components/CategoryTabs'
import ContentRow from '../components/ContentRow'

const GENRES = ['All Shows', 'Prime Originals', 'Trending', 'Action', 'Comedy', 'Drama', 'Fantasy', 'Animation']

export default function TvShows() {
    const [featured, setFeatured] = useState(null)
    const [allShows, setAllShows] = useState([])
    const [activeTab, setActiveTab] = useState('All Shows')

    useEffect(() => {
        async function load() {
            const { data: feat } = await supabase
                .from('content')
                .select('*')
                .eq('type', 'tvshow')
                .eq('is_featured', true)
                .limit(1)
                .single()
            setFeatured(feat)

            const { data: shows } = await supabase
                .from('content')
                .select('*')
                .eq('type', 'tvshow')
                .order('sort_order')
            setAllShows(shows || [])
        }
        load()
    }, [])

    const filtered = activeTab === 'All Shows'
        ? allShows
        : activeTab === 'Prime Originals'
            ? allShows.filter(s => s.is_prime)
            : activeTab === 'Trending'
                ? [...allShows].sort((a, b) => (b.imdb_score || 0) - (a.imdb_score || 0))
                : allShows.filter(s => s.genre && s.genre.toLowerCase().includes(activeTab.toLowerCase()))

    const primeOriginals = allShows.filter(s => s.is_prime)
    const trending = [...allShows].sort((a, b) => (b.year || 0) - (a.year || 0)).slice(0, 10)

    return (
        <>
            <FeaturedBanner item={featured} />
            <CategoryTabs tabs={GENRES} active={activeTab} onSelect={setActiveTab} />
            {activeTab !== 'All Shows' ? (
                <ContentRow title={activeTab} items={filtered} viewAll />
            ) : (
                <>
                    <ContentRow title="Popular TV Shows" items={allShows} viewAll />
                    <ContentRow title="New & Trending" items={trending} viewAll />
                    <ContentRow title="Prime Original Series" items={primeOriginals} viewAll />
                </>
            )}
        </>
    )
}
