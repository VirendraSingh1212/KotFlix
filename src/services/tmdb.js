const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const IMAGE_SIZES = {
  small: 'w200',
  medium: 'w300',
  large: 'w500',
  original: 'original'
};

// Mock data for fallback when API fails
const mockMovies = [
  { id: 1, title: "Inception", poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg", vote_average: 8.4, overview: "A thief who steals corporate secrets through the use of dream-sharing technology." },
  { id: 2, title: "The Dark Knight", poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg", backdrop_path: "/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg", vote_average: 9.0, overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham." },
  { id: 3, title: "Interstellar", poster_path: "/gEU2QniL6C8z19uVOtYnZ5UYj52.jpg", backdrop_path: "/xJHokMbljvjADYdit5fK5VQsXEG.jpg", vote_average: 8.6, overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival." },
  { id: 4, title: "The Matrix", poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", backdrop_path: "/ncEsesgOJDNrTUED89h7bN3BxiD.jpg", vote_average: 8.2, overview: "A computer hacker learns from mysterious rebels about the true nature of his reality." },
  { id: 5, title: "Avengers: Endgame", poster_path: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg", backdrop_path: "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg", vote_average: 8.3, overview: "After the devastating events of Infinity War, the universe is in ruins." },
  { id: 6, title: "Pulp Fiction", poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", backdrop_path: "/suaEOtk1N1sgg2jM0F1Q0eOvZl1.jpg", vote_average: 8.5, overview: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine." },
  { id: 7, title: "Fight Club", poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", backdrop_path: "/rr7E0NoGKxvbKB858T2Ta3vSKPB.jpg", vote_average: 8.4, overview: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club." },
  { id: 8, title: "Forrest Gump", poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg", backdrop_path: "/3h1JZGDhZ8nzxdgVnHWPN0SJUEND.jpg", vote_average: 8.5, overview: "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events." },
  { id: 9, title: "The Shawshank Redemption", poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", backdrop_path: "/kXfqCq3Q7fJk9YHvTG6YV5lJp3j.jpg", vote_average: 8.7, overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption." },
  { id: 10, title: "Parasite", poster_path: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", backdrop_path: "/ApiBzeaa95TNYliSbQ8tpJvGAQ.jpg", vote_average: 8.5, overview: "Greed and class discrimination threaten the newly formed symbiotic relationship." },
  { id: 11, title: "The Godfather", poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg", vote_average: 8.7, overview: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son." },
  { id: 12, title: "Dune", poster_path: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg", backdrop_path: "/jYEW5eZkKyXW9N6r3w7VqLJ1s3Z.jpg", vote_average: 7.9, overview: "Paul Atreides must travel to the most dangerous planet in the universe." }
];

const fetchFromTMDB = async (endpoint) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      }
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('TMDB API fetch failed, using mock data:', error.message);
    // Return mock data as fallback
    return { results: mockMovies };
  }
};

export const getTrendingMovies = () => fetchFromTMDB('/trending/movie/week');

export const getPopularMovies = () => fetchFromTMDB('/movie/popular');

export const getTopRatedMovies = () => fetchFromTMDB('/movie/top_rated');

export const getNowPlayingMovies = () => fetchFromTMDB('/movie/now_playing');

export const getUpcomingMovies = () => fetchFromTMDB('/movie/upcoming');

export const getMovieGenres = () => fetchFromTMDB('/genre/movie/list');

export const getMoviesByGenre = (genreId) => fetchFromTMDB(`/discover/movie?with_genres=${genreId}`);

export const getImageUrl = (path, size = IMAGE_SIZES.large) => {
  if (!path) return 'https://via.placeholder.com/300x450?text=No+Image';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getMovieDetails = (movieId) => fetchFromTMDB(`/movie/${movieId}`);
