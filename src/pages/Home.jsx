import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import HeroCarousel from '../components/HeroCarousel'
import ContentRow from '../components/ContentRow'

export default function Home() {
    const [featured, setFeatured] = useState([])
    const [movies, setMovies] = useState([])
    const [tvShows, setTvShows] = useState([])
    const [topRated, setTopRated] = useState([])

    useEffect(() => {
        async function load() {
            // Featured — for hero carousel
            const { data: feat } = await supabase
                .from('content')
                .select('*')
                .eq('is_featured', true)
                .order('sort_order')
            setFeatured(feat || [])

            // Movies
            const { data: mov } = await supabase
                .from('content')
                .select('*')
                .eq('type', 'movie')
                .eq('is_prime', true)
                .order('sort_order')
                .limit(10)
            setMovies(mov || [])

            // TV Shows
            const { data: tv } = await supabase
                .from('content')
                .select('*')
                .eq('type', 'tvshow')
                .eq('is_prime', true)
                .order('sort_order')
                .limit(10)
            setTvShows(tv || [])

            // Top Rated movies
            const { data: top } = await supabase
                .from('content')
                .select('*')
                .eq('type', 'movie')
                .order('imdb_score', { ascending: false })
                .limit(10)
            setTopRated(top || [])
        }
        load()
    }, [])

    return (
        <>
            <HeroCarousel slides={featured} />
            <ContentRow title="Popular TV Shows" items={tvShows} viewAll />
            <ContentRow title="Top 10 in India Today" items={topRated.slice(0, 10)} showRank viewAll />
            <ContentRow title="Prime Original Movies" items={movies} viewAll />
            <ContentRow title="Recently Added" items={[...movies].reverse().slice(0, 8)} viewAll />
        </>
    )
}
