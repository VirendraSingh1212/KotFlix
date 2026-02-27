import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import MovieRow from './components/MovieRow/MovieRow';
import { 
  getTrendingMovies, 
  getPopularMovies, 
  getTopRatedMovies, 
  getNowPlayingMovies,
  getUpcomingMovies 
} from './services/tmdb';
import './App.css';

function App() {
  const [movies, setMovies] = useState({
    trending: [],
    popular: [],
    topRated: [],
    nowPlaying: [],
    upcoming: []
  });
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Load trending first for hero, then others
    const loadMovies = async () => {
      // Load trending first (for hero) - max 1.5 seconds
      const trendingPromise = getTrendingMovies();
      const trendingTimeout = new Promise(resolve => setTimeout(() => resolve({ results: [] }), 1500));
      const trending = await Promise.race([trendingPromise, trendingTimeout]);
      
      setMovies(prev => ({ ...prev, trending: trending.results || [] }));
      setInitialLoading(false);
      
      // Load other categories in background
      const [popular, topRated, nowPlaying, upcoming] = await Promise.all([
        getPopularMovies(),
        getTopRatedMovies(),
        getNowPlayingMovies(),
        getUpcomingMovies()
      ]);

      setMovies({
        trending: trending.results || [],
        popular: popular.results || [],
        topRated: topRated.results || [],
        nowPlaying: nowPlaying.results || [],
        upcoming: upcoming.results || []
      });
    };

    loadMovies();
  }, []);

  if (initialLoading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="loading__spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Get a random movie from trending for the hero section
  const heroMovie = movies.trending.length > 0 
    ? movies.trending[Math.floor(Math.random() * Math.min(5, movies.trending.length))]
    : null;

  return (
    <div className="app">
      <Navbar />
      <Hero movie={heroMovie} />
      <div className="app__content">
        <MovieRow title="Trending Now" movies={movies.trending} />
        <MovieRow title="Popular on KotFlix" movies={movies.popular} />
        <MovieRow title="Top Rated" movies={movies.topRated} />
        <MovieRow title="Now Playing" movies={movies.nowPlaying} />
        <MovieRow title="Coming Soon" movies={movies.upcoming} />
      </div>
    </div>
  );
}

export default App
