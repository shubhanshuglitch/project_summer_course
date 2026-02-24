import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const supabaseUrl = 'https://jrmnghpvmsfaruulycwk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpybW5naHB2bXNmYXJ1dWx5Y3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NDkwOTcsImV4cCI6MjA4NzUyNTA5N30.YrREwGaZOCaZ01cbiqXOCMhslmuFrx7UusAEqlPpPZg'

const supabase = createClient(supabaseUrl, supabaseKey)

async function seed() {
  console.log('Checking if content table has data...')
  const { data, error } = await supabase.from('content').select('id').limit(1)
  
  if (error) {
    console.log('Content table does not exist yet.')
    console.log('=======================================')
    console.log('IMPORTANT: You need to run the SQL files manually!')
    console.log('1. Go to https://supabase.com/dashboard')
    console.log('2. Open your project')
    console.log('3. Go to SQL Editor')
    console.log('4. Paste and run supabase-schema.sql first')
    console.log('5. Then paste and run supabase-seed.sql')
    console.log('=======================================')
    return
  }

  if (data && data.length > 0) {
    console.log('Content table already has data. Skipping seed.')
    return
  }

  console.log('Content table exists but is empty. Inserting seed data via API...')
  
  // Insert movies
  const movies = [
    { title: 'Dune: Part Two', description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.', type: 'movie', genre: 'Sci-Fi, Adventure', year: 2024, rating: 'PG-13', imdb_score: 8.9, duration: '2h 46m', image_url: 'https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg', banner_url: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=1920&q=80', badge: 'Featured Movie', is_prime: true, is_featured: true, sort_order: 1 },
    { title: 'The Tomorrow War', description: 'A man is drafted to fight in a future war.', type: 'movie', genre: 'Action, Sci-Fi', year: 2021, rating: 'PG-13', imdb_score: 6.7, duration: '2h 18m', image_url: 'https://m.media-amazon.com/images/M/MV5BMDI3Y2RhNGEtYzE0OS00ZjAyLTkyOGYtMGI2OTM5NjljYzI3XkEyXkFqcGc@._V1_.jpg', badge: 'Prime Original', is_prime: true, sort_order: 2 },
    { title: 'Sound of Metal', description: 'A drummer begins to lose his hearing.', type: 'movie', genre: 'Drama, Music', year: 2019, rating: 'R', imdb_score: 7.8, duration: '2h 10m', image_url: 'https://m.media-amazon.com/images/M/MV5BOWI5MWFjODAtY2E0My00ZDYzLTk0ZWEtYzE2MGRkMDUyNmNlXkEyXkFqcGc@._V1_.jpg', badge: 'Prime Original', is_prime: true, sort_order: 3 },
    { title: 'Air', description: 'The story of how Nike created the Air Jordan brand.', type: 'movie', genre: 'Drama, Biography', year: 2023, rating: 'R', imdb_score: 7.4, duration: '1h 52m', image_url: 'https://m.media-amazon.com/images/M/MV5BYTUxYjczMWUtYzlkZC00NTcwLWE3NTgtMDdjMWM0OTM5ZmRiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg', badge: 'Prime Original', is_prime: true, sort_order: 4 },
    { title: 'Without Remorse', description: 'An elite Navy SEAL uncovers an international conspiracy.', type: 'movie', genre: 'Action, Thriller', year: 2021, rating: 'R', imdb_score: 5.8, duration: '1h 49m', image_url: 'https://m.media-amazon.com/images/M/MV5BOTRiMjQ3NWUtOWE3MS00YjIxLTk0ZjctMDRjMGQ0ZjA1NDgzXkEyXkFqcGc@._V1_.jpg', is_prime: true, sort_order: 5 },
    { title: 'The Shawshank Redemption', description: 'Two imprisoned men bond over years, finding redemption.', type: 'movie', genre: 'Drama', year: 1994, rating: 'R', imdb_score: 9.3, duration: '2h 22m', image_url: 'https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_.jpg', sort_order: 10 },
    { title: 'The Godfather', description: 'The aging patriarch transfers control to his reluctant son.', type: 'movie', genre: 'Crime, Drama', year: 1972, rating: 'R', imdb_score: 9.2, duration: '2h 55m', image_url: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg', sort_order: 11 },
    { title: 'The Dark Knight', description: 'Batman must accept great psychological tests to fight injustice.', type: 'movie', genre: 'Action, Crime', year: 2008, rating: 'PG-13', imdb_score: 9.0, duration: '2h 32m', image_url: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg', sort_order: 12 },
    { title: 'Inception', description: 'A thief who steals corporate secrets through dream-sharing technology.', type: 'movie', genre: 'Sci-Fi, Action', year: 2010, rating: 'PG-13', imdb_score: 8.8, duration: '2h 28m', image_url: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg', sort_order: 13 },
    { title: 'Interstellar', description: 'Explorers travel through a wormhole to save humanity.', type: 'movie', genre: 'Sci-Fi, Adventure', year: 2014, rating: 'PG-13', imdb_score: 8.7, duration: '2h 49m', image_url: 'https://m.media-amazon.com/images/M/MV5BOTI4MjdmYzQtNjIyZi00YjE5LTlhMmMtOGFkMTAzMDNjYzEyXkEyXkFqcGc@._V1_.jpg', sort_order: 14 },
    { title: 'John Wick: Chapter 4', description: 'John Wick must face a new enemy with High Table connections.', type: 'movie', genre: 'Action, Crime', year: 2023, rating: 'R', imdb_score: 7.7, duration: '2h 49m', image_url: 'https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_.jpg', sort_order: 7 },
    { title: 'The Batman', description: 'Batman ventures into Gotham underworld to find a sadistic killer.', type: 'movie', genre: 'Action, Crime', year: 2022, rating: 'PG-13', imdb_score: 7.8, duration: '2h 56m', image_url: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg', sort_order: 8 },
    { title: 'Top Gun: Maverick', description: 'Maverick is still pushing the envelope as a top naval aviator.', type: 'movie', genre: 'Action, Drama', year: 2022, rating: 'PG-13', imdb_score: 8.3, duration: '2h 10m', image_url: 'https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg', sort_order: 9 },
    { title: 'Gladiator', description: 'A former Roman General sets out to exact vengeance.', type: 'movie', genre: 'Action, Drama', year: 2000, rating: 'R', imdb_score: 8.5, duration: '2h 35m', image_url: 'https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_.jpg', sort_order: 15 },
    { title: 'Mad Max: Fury Road', description: 'In a post-apocalyptic wasteland, Max teams up with Furiosa.', type: 'movie', genre: 'Action, Adventure', year: 2015, rating: 'R', imdb_score: 8.1, duration: '2h', image_url: 'https://m.media-amazon.com/images/M/MV5BMjMwMzE1OTc0OF5BMl5BanBnXkFtZTgwMDk1MTc5NTE@._V1_.jpg', sort_order: 16 },
    { title: 'The Matrix', description: 'A hacker discovers reality is a simulation and joins a rebellion.', type: 'movie', genre: 'Sci-Fi, Action', year: 1999, rating: 'R', imdb_score: 8.7, duration: '2h 16m', image_url: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg', sort_order: 17 },
  ]

  const tvshows = [
    { title: 'The Boys', description: 'Vigilantes take down corrupt superheroes.', type: 'tvshow', genre: 'Action, Comedy, Crime', year: 2019, rating: 'TV-MA', imdb_score: 8.7, seasons: 4, image_url: 'https://m.media-amazon.com/images/M/MV5BOTVhNzZlNDAtNDc2My00MTA2LWI1YzMtZTk0ZDRkMjJhNTE2XkEyXkFqcGc@._V1_.jpg', banner_url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&q=80', badge: 'Prime Original Series', is_prime: true, is_featured: true, sort_order: 1 },
    { title: 'Jack Ryan', description: 'CIA analyst thrust into a dangerous mission.', type: 'tvshow', genre: 'Action, Drama, Thriller', year: 2018, rating: 'TV-MA', imdb_score: 8.1, seasons: 4, image_url: 'https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg', is_prime: true, sort_order: 2 },
    { title: 'The Wheel of Time', description: 'A sprawling epic fantasy journey.', type: 'tvshow', genre: 'Action, Adventure, Fantasy', year: 2021, rating: 'TV-14', imdb_score: 7.1, seasons: 2, image_url: 'https://m.media-amazon.com/images/M/MV5BMDI5ZWJhOWItYTlhOC00YWRhLTk5NDYtNGIyODI5MjM5YjA4XkEyXkFqcGc@._V1_.jpg', is_prime: true, sort_order: 3 },
    { title: 'Mrs. Maisel', description: 'A 1950s housewife discovers talent for stand-up comedy.', type: 'tvshow', genre: 'Comedy, Drama', year: 2017, rating: 'TV-MA', imdb_score: 8.7, seasons: 5, image_url: 'https://m.media-amazon.com/images/M/MV5BZjBiOGIyY2YtOTA3OC00YzY1LThkYjktMGRkYTNhNTQ1ZjJmXkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg', is_prime: true, sort_order: 4 },
    { title: 'Invincible', description: 'A teenager whose father is the most powerful superhero.', type: 'tvshow', genre: 'Animation, Action, Drama', year: 2021, rating: 'TV-MA', imdb_score: 8.7, seasons: 2, image_url: 'https://m.media-amazon.com/images/M/MV5MDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg', is_prime: true, sort_order: 5 },
    { title: 'Reacher', description: 'Jack Reacher is falsely accused of murder.', type: 'tvshow', genre: 'Action, Crime, Drama', year: 2022, rating: 'TV-MA', imdb_score: 8.1, seasons: 2, image_url: 'https://m.media-amazon.com/images/M/MV5BNGEyOGJiNWEtMTgwMi00ODNmLTliM2ItMjc2NDgxMDY0NDY2XkEyXkFqcGc@._V1_.jpg', is_prime: true, sort_order: 6 },
    { title: 'Fallout', description: 'Post-apocalyptic LA — citizens live in underground bunkers.', type: 'tvshow', genre: 'Action, Adventure, Drama', year: 2024, rating: 'TV-MA', imdb_score: 8.5, seasons: 1, image_url: 'https://m.media-amazon.com/images/M/MV5BNDUzOGI0MzYtZGY2OS00MmI4LWFhMjMtNGU3NWY3OTBhYjUzXkEyXkFqcGc@._V1_.jpg', badge: 'New', is_prime: true, sort_order: 7 },
    { title: 'Citadel', description: 'Global spy action — Citadel agents had their memories wiped.', type: 'tvshow', genre: 'Action, Drama, Sci-Fi', year: 2023, rating: 'TV-MA', imdb_score: 5.7, seasons: 1, image_url: 'https://m.media-amazon.com/images/M/MV5BN2Y3OWQ5NDMtNDY1NC00N2YzLWE2NjYtZWRkOWRjOWI0NjM2XkEyXkFqcGc@._V1_.jpg', is_prime: true, sort_order: 8 },
    { title: 'Homecoming', description: 'A caseworker at an experimental facility.', type: 'tvshow', genre: 'Drama, Mystery, Thriller', year: 2018, rating: 'TV-MA', imdb_score: 7.5, seasons: 2, image_url: 'https://m.media-amazon.com/images/M/MV5BMTk3MjkzODczOF5BMl5BanBnXkFtZTgwNjczMTMxNDM@._V1_.jpg', is_prime: true, sort_order: 9 },
    { title: 'The Grand Tour', description: 'Clarkson, Hammond and May on globe-trotting adventures.', type: 'tvshow', genre: 'Adventure, Comedy', year: 2016, rating: 'TV-PG', imdb_score: 8.7, seasons: 5, image_url: 'https://m.media-amazon.com/images/M/MV5BODIwNDUxNjY2MF5BMl5BanBnXkFtZTgwNjM5MTEwMDE@._V1_.jpg', is_prime: true, sort_order: 10 },
  ]

  const channels = [
    { title: 'Premier League', description: 'Live football from the EPL.', type: 'channel', genre: 'Sports', year: 2024, image_url: 'https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?w=400&q=80', banner_url: 'https://images.unsplash.com/photo-1461896836934-bd45ba8b0e28?w=1920&q=80', is_live: true, is_featured: true, sort_order: 1 },
    { title: 'IPL 2024', description: 'Live cricket from the IPL.', type: 'channel', genre: 'Sports', year: 2024, image_url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&q=80', is_live: true, sort_order: 2 },
    { title: 'NBA Tonight', description: 'Live basketball from the NBA.', type: 'channel', genre: 'Sports', year: 2024, image_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80', is_live: true, sort_order: 3 },
    { title: 'Grand Slam Tennis', description: 'Live Grand Slam tennis matches.', type: 'channel', genre: 'Sports', year: 2024, image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', is_live: true, sort_order: 4 },
    { title: 'Formula 1', description: 'Live F1 races and qualifying.', type: 'channel', genre: 'Sports', year: 2024, image_url: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=400&q=80', is_live: true, sort_order: 5 },
    { title: 'World News Live', description: 'Breaking news 24/7.', type: 'channel', genre: 'News', year: 2024, image_url: 'https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=400&q=80', is_live: true, sort_order: 6 },
    { title: 'Business Today', description: 'Financial markets and business analysis.', type: 'channel', genre: 'News', year: 2024, image_url: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&q=80', is_live: true, sort_order: 7 },
    { title: 'Headlines Now', description: 'Top headlines and breaking news.', type: 'channel', genre: 'News', year: 2024, image_url: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&q=80', is_live: true, sort_order: 8 },
    { title: 'Music TV', description: '24/7 music videos and performances.', type: 'channel', genre: 'Entertainment', year: 2024, image_url: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=400&q=80', is_live: true, sort_order: 10 },
    { title: 'Movie Channel', description: 'Around-the-clock movies.', type: 'channel', genre: 'Entertainment', year: 2024, image_url: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&q=80', is_live: true, sort_order: 11 },
    { title: 'Comedy Central', description: 'Stand-up comedy and funny shows.', type: 'channel', genre: 'Entertainment', year: 2024, image_url: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&q=80', is_live: true, sort_order: 12 },
    { title: 'Kids Zone', description: 'Family-friendly animation and kids shows.', type: 'channel', genre: 'Kids', year: 2024, image_url: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&q=80', is_live: true, sort_order: 13 },
  ]

  // Insert via Supabase API
  const { error: e1 } = await supabase.from('content').insert(movies)
  if (e1) console.error('Error inserting movies:', e1.message)
  else console.log(`Inserted ${movies.length} movies`)

  const { error: e2 } = await supabase.from('content').insert(tvshows)
  if (e2) console.error('Error inserting TV shows:', e2.message)
  else console.log(`Inserted ${tvshows.length} TV shows`)

  const { error: e3 } = await supabase.from('content').insert(channels)
  if (e3) console.error('Error inserting channels:', e3.message)
  else console.log(`Inserted ${channels.length} channels`)

  console.log('Seeding complete!')
}

seed().catch(console.error)
