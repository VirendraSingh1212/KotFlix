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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true);
        const [trending, popular, topRated, nowPlaying, upcoming] = await Promise.all([
          getTrendingMovies(),
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
      } catch (err) {
        console.error('Error fetching movies:', err);
        // Don't set error - the API service returns mock data on failure
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="loading__spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar />
      <Hero />
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
