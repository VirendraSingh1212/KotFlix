const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const IMAGE_SIZES = {
  small: 'w200',
  medium: 'w300',
  large: 'w500',
  original: 'original'
};

// Different mock data for each category to show variety when API fails
const mockData = {
  trending: [
    { id: 101, title: "Deadpool & Wolverine", poster_path: "/8cdWjvZQUExUUTzyp4t6ESMHiMF.jpg", backdrop_path: "/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg", vote_average: 7.8, overview: "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him." },
    { id: 102, title: "Inside Out 2", poster_path: "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg", backdrop_path: "/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg", vote_average: 7.6, overview: "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected." },
    { id: 103, title: "Dune: Part Two", poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg", backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hjKPX.jpg", vote_average: 8.2, overview: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family." },
    { id: 104, title: "Furiosa: A Mad Max Saga", poster_path: "/iADOJ8Zymht2JPMoy3R7XceeuXU.jpg", backdrop_path: "/wNAhuOZ3Zf84jCIlrcI6Jh7Yedm.jpg", vote_average: 7.5, overview: "As the world falls, young Furiosa is snatched from the Green Place of Many Mothers into the hands of a great Biker Horde." },
    { id: 105, title: "Kingdom of the Planet of the Apes", poster_path: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg", backdrop_path: "/fqv8v6AycXKsivp1T4yISzZUf.jpg", vote_average: 7.2, overview: "Several generations in the future following Caesar's reign, apes are now the dominant species." },
    { id: 106, title: "Bad Boys: Ride or Die", poster_path: "/nP6RliHjxsz4irTKsxe8FRhKZYl.jpg", backdrop_path: "/9Or1qeUZyOSQVglRXGnqc6owp21.jpg", vote_average: 7.1, overview: "After their late former Captain is framed, Lowrey and Burnett try to clear his name." },
    { id: 107, title: "Godzilla x Kong: The New Empire", poster_path: "/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg", backdrop_path: "/j3Z3XktmWB1VhsS8iXNcrR86PX.jpg", vote_average: 7.2, overview: "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat." },
    { id: 108, title: "The Fall Guy", poster_path: "/a9ySX1tJugIYU2Y8szD4r7wS8.jpg", backdrop_path: "/H5Hj8Q4tL9WwfF6h4V8Q0z5.jpg", vote_average: 7.0, overview: "Colt Seavers is a stuntman who left the business a year earlier to focus on his mental health." }
  ],
  popular: [
    { id: 201, title: "Oppenheimer", poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", backdrop_path: "/nb3xI8XI3w4cMVmZf6e1y8Z.jpg", vote_average: 8.1, overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II." },
    { id: 202, title: "Barbie", poster_path: "/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg", backdrop_path: "/tTfnd2a2ll42YX1S1d5Yf.jpg", vote_average: 7.0, overview: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land." },
    { id: 203, title: "The Batman", poster_path: "/74xTEgt7R36FpoooUfsHt9y8D8.jpg", backdrop_path: "/5P8SmMzSNYikXpxil6YbG.jpg", vote_average: 7.7, overview: "In his second year of fighting crime, Batman uncovers corruption in Gotham City." },
    { id: 204, title: "Spider-Man: No Way Home", poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg", backdrop_path: "/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg", vote_average: 7.9, overview: "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a superhero." },
    { id: 205, title: "Top Gun: Maverick", poster_path: "/62HCnUTziyWcpDaBO2i1DX5qmE.jpg", backdrop_path: "/odJ4hx6g6vB4w8ZJVKx.jpg", vote_average: 7.8, overview: "After more than thirty years of service as one of the Navy's top aviators, Pete Mitchell is where he belongs." },
    { id: 206, title: "Avatar: The Way of Water", poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg", backdrop_path: "/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg", vote_average: 7.6, overview: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora." },
    { id: 207, title: "Everything Everywhere All at Once", poster_path: "/w3LxiVYdWWRvEVdnplRYI8pT.jpg", backdrop_path: "/7BqD3wZ5Nv.jpg", vote_average: 7.8, overview: "An aging Chinese immigrant is swept up in an insane adventure." },
    { id: 208, title: "The Super Mario Bros. Movie", poster_path: "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg", backdrop_path: "/9n2tJBplPbgR2ca05hS5CKX.jpg", vote_average: 7.3, overview: "While working underground to fix a water main, Brooklyn plumbers Mario and Luigi are transported down a mysterious pipe." }
  ],
  topRated: [
    { id: 301, title: "The Shawshank Redemption", poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", backdrop_path: "/kXfqCq3Q7fJk9YHvTG6YV5lJp3j.jpg", vote_average: 8.7, overview: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison." },
    { id: 302, title: "The Godfather", poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg", vote_average: 8.7, overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family." },
    { id: 303, title: "The Dark Knight", poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg", backdrop_path: "/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg", vote_average: 8.5, overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent." },
    { id: 304, title: "The Godfather Part II", poster_path: "/hek3koDUyRQK7FIhPXsa6mT2Zc.jpg", backdrop_path: "/kGzFbGhp99zva6oZODW5atU.jpg", vote_average: 8.6, overview: "In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily." },
    { id: 305, title: "12 Angry Men", poster_path: "/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg", backdrop_path: "/qqHQsStVi6rxmQ9t2x.jpg", vote_average: 8.5, overview: "The defense and the prosecution have rested and the jury is filing into the jury room to decide if a young man is guilty or innocent." },
    { id: 306, title: "Schindler's List", poster_path: "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg", backdrop_path: "/w2eZhP9.jpg", vote_average: 8.6, overview: "The true story of how businessman Oskar Schindler saved over a thousand Jewish lives." },
    { id: 307, title: "The Lord of the Rings: The Return of the King", poster_path: "/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg", backdrop_path: "/2u7z.jpg", vote_average: 8.5, overview: "Aragorn is revealed as the heir to the ancient kings as he, Gandalf and the other members of the broken fellowship." },
    { id: 308, title: "Pulp Fiction", poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", backdrop_path: "/suaEOtk1N1sgg2jM0F1Q0eOvZl1.jpg", vote_average: 8.5, overview: "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer." }
  ],
  nowPlaying: [
    { id: 401, title: "Despicable Me 4", poster_path: "/wWba3TaojhG7S70oWB5R8bK.jpg", backdrop_path: "/lgkPzcOSnTvjeMnuFziruG.jpg", vote_average: 7.2, overview: "Gru and Lucy and their girls welcome a new member to the Gru family." },
    { id: 402, title: "A Quiet Place: Day One", poster_path: "/yrpPYKijwM4DqW5e.jpg", backdrop_path: "/qwhnq.jpg", vote_average: 6.9, overview: "As New York City is invaded by alien creatures who hunt by sound, a woman named Sammy fights to survive." },
    { id: 403, title: "Twisters", poster_path: "/pjnD08FrMDiwBFhNxazZ.jpg", backdrop_path: "/tM1.jpg", vote_average: 7.0, overview: "As storm season intensifies, the paths of former storm chaser Kate Carter and reckless social-media superstar Tyler Owens collide." },
    { id: 404, title: "Longlegs", poster_path: "/5aj8v.jpg", backdrop_path: "/8fH.jpg", vote_average: 6.8, overview: "FBI Agent Lee Harker is a gifted new recruit assigned to an unsolved serial killer case." },
    { id: 405, title: "Fly Me to the Moon", poster_path: "/gA.jpg", backdrop_path: "/kU.jpg", vote_average: 6.9, overview: "Sparks fly between a marketing executive and a launch director during the 1969 space race." },
    { id: 406, title: "Horizon: An American Saga - Chapter 1", poster_path: "/vM.jpg", backdrop_path: "/hY.jpg", vote_average: 6.7, overview: "Follow the story of how the Old West was won and lost through the blood, sweat and tears of many." },
    { id: 407, title: "MaXXXine", poster_path: "/i77.jpg", backdrop_path: "/pQ.jpg", vote_average: 6.5, overview: "In 1980s Hollywood, adult film star and aspiring actress Maxine Minx finally gets her big break." },
    { id: 408, title: "The Bikeriders", poster_path: "/qT.jpg", backdrop_path: "/nJ.jpg", vote_average: 6.8, overview: "After a chance encounter, headstrong Kathy is drawn to Benny, member of Midwestern motorcycle club the Vandals." }
  ],
  upcoming: [
    { id: 501, title: "Joker: Folie à Deux", poster_path: "/if8.jpg", backdrop_path: "/z1.jpg", vote_average: 0, overview: "Arthur Fleck is institutionalized at Arkham awaiting trial for his crimes as Joker." },
    { id: 502, title: "Venom: The Last Dance", poster_path: "/a7.jpg", backdrop_path: "/k8.jpg", vote_average: 0, overview: "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in." },
    { id: 503, title: "Gladiator II", poster_path: "/v1.jpg", backdrop_path: "/x2.jpg", vote_average: 0, overview: "Years after witnessing the death of the revered hero Maximus at the hands of his uncle." },
    { id: 504, title: "Wicked", poster_path: "/2x.jpg", backdrop_path: "/y3.jpg", vote_average: 0, overview: "Elphaba, an ostracized but defiant girl born with green skin, and Glinda, a privileged popular girl." },
    { id: 505, title: "Moana 2", poster_path: "/4y.jpg", backdrop_path: "/z5.jpg", vote_average: 0, overview: "After receiving an unexpected call from her wayfinding ancestors, Moana journeys to the far seas of Oceania." },
    { id: 506, title: "Mufasa: The Lion King", poster_path: "/6z.jpg", backdrop_path: "/a7.jpg", vote_average: 0, overview: "Rafiki relays the legend of Mufasa to lion cub Kiara, daughter of Simba and Nala." },
    { id: 507, title: "Kraven the Hunter", poster_path: "/b8.jpg", backdrop_path: "/c9.jpg", vote_average: 0, overview: "Sergei Kravinoff is a big game hunter who seeks to prove himself as the world's greatest hunter." },
    { id: 508, title: "Sonic the Hedgehog 3", poster_path: "/d0.jpg", backdrop_path: "/e1.jpg", vote_average: 0, overview: "Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow." }
  ]
};

const fetchFromTMDB = async (endpoint, mockDataKey) => {
  // Skip API call if no API key is configured, use mock data immediately
  if (!API_KEY || API_KEY === 'your_tmdb_api_key_here') {
    console.log(`Using mock data for ${endpoint} (no API key configured)`);
    return { results: mockData[mockDataKey] || [] };
  }
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // Reduced to 3 seconds
    
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
    console.warn(`TMDB API fetch failed for ${endpoint}, using mock data:`, error.message);
    // Return specific mock data for each endpoint
    return { results: mockData[mockDataKey] || [] };
  }
};

export const getTrendingMovies = () => fetchFromTMDB('/trending/movie/week', 'trending');

export const getPopularMovies = () => fetchFromTMDB('/movie/popular', 'popular');

export const getTopRatedMovies = () => fetchFromTMDB('/movie/top_rated', 'topRated');

export const getNowPlayingMovies = () => fetchFromTMDB('/movie/now_playing', 'nowPlaying');

export const getUpcomingMovies = () => fetchFromTMDB('/movie/upcoming', 'upcoming');

export const getMovieGenres = () => fetchFromTMDB('/genre/movie/list', null);

export const getMoviesByGenre = (genreId) => fetchFromTMDB(`/discover/movie?with_genres=${genreId}`, 'popular');

export const getImageUrl = (path, size = IMAGE_SIZES.large) => {
  if (!path) return 'https://via.placeholder.com/300x450?text=No+Image';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getMovieDetails = (movieId) => fetchFromTMDB(`/movie/${movieId}`, null);
