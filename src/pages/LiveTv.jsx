import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import FeaturedBanner from '../components/FeaturedBanner'
import CategoryTabs from '../components/CategoryTabs'
import ContentRow from '../components/ContentRow'

const TABS = ['All Channels', 'Sports', 'News', 'Entertainment', 'Kids']

export default function LiveTv() {
    const [featured, setFeatured] = useState(null)
    const [channels, setChannels] = useState([])
    const [activeTab, setActiveTab] = useState('All Channels')

    useEffect(() => {
        async function load() {
            const { data: feat } = await supabase
                .from('content')
                .select('*')
                .eq('type', 'channel')
                .eq('is_featured', true)
                .limit(1)
                .single()
            setFeatured(feat)

            const { data: ch } = await supabase
                .from('content')
                .select('*')
                .eq('type', 'channel')
                .order('sort_order')
            setChannels(ch || [])
        }
        load()
    }, [])

    const sports = channels.filter(c => c.genre === 'Sports')
    const news = channels.filter(c => c.genre === 'News')
    const entertainment = channels.filter(c => c.genre === 'Entertainment')
    const kids = channels.filter(c => c.genre === 'Kids')

    const filtered = activeTab === 'All Channels'
        ? channels
        : channels.filter(c => c.genre === activeTab)

    // Build a featured object for the live banner hero
    const liveFeatured = featured || {
        title: 'Live Sports & Entertainment',
        description: 'Watch live sports, breaking news, entertainment, and more. Stream live channels 24/7 with Prime Video.',
        banner_url: 'https://images.unsplash.com/photo-1461896836934-bd45ba8b0e28?w=1920&q=80',
        image_url: 'https://images.unsplash.com/photo-1461896836934-bd45ba8b0e28?w=1920&q=80'
    }

    return (
        <>
            <FeaturedBanner item={liveFeatured} liveBadge />
            <CategoryTabs tabs={TABS} active={activeTab} onSelect={setActiveTab} />
            {activeTab !== 'All Channels' ? (
                <ContentRow title={activeTab} items={filtered} viewAll />
            ) : (
                <>
                    <ContentRow title="Live Sports" items={sports} viewAll />
                    <ContentRow title="News Channels" items={news} viewAll />
                    <ContentRow title="Entertainment Channels" items={entertainment} viewAll />
                    {kids.length > 0 && <ContentRow title="Kids" items={kids} viewAll />}
                </>
            )}
        </>
    )
}
