-- ============================================
-- PRIME VIDEO CLONE — SUPABASE SCHEMA
-- Run this in the Supabase SQL Editor
-- ============================================

-- Content table: movies, TV shows, and live channels
CREATE TABLE IF NOT EXISTS content (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('movie', 'tvshow', 'channel')),
  genre TEXT,
  year INTEGER,
  rating TEXT,
  imdb_score NUMERIC(3,1),
  duration TEXT,
  seasons INTEGER,
  image_url TEXT,
  banner_url TEXT,
  badge TEXT,
  is_prime BOOLEAN DEFAULT false,
  is_live BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Watchlist table
CREATE TABLE IF NOT EXISTS watchlist (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content_id INTEGER REFERENCES content(id) ON DELETE CASCADE,
  added_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, content_id)
);

-- Continue watching table
CREATE TABLE IF NOT EXISTS continue_watching (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content_id INTEGER REFERENCES content(id) ON DELETE CASCADE,
  progress_percent INTEGER DEFAULT 0,
  last_watched TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, content_id)
);

-- Enable Row Level Security
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE continue_watching ENABLE ROW LEVEL SECURITY;

-- Content is readable by everyone
CREATE POLICY "Content is viewable by everyone" ON content
  FOR SELECT USING (true);

-- Watchlist: users can only see/manage their own
CREATE POLICY "Users manage own watchlist" ON watchlist
  FOR ALL USING (auth.uid() = user_id);

-- Continue watching: users can only see/manage their own
CREATE POLICY "Users manage own continue_watching" ON continue_watching
  FOR ALL USING (auth.uid() = user_id);
