import { useRef } from 'react';
import { getImageUrl } from '../../services/tmdb';
import './MovieRow.css';

const MovieRow = ({ title, movies }) => {
  const rowRef = useRef(null);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.75
        : scrollLeft + clientWidth * 0.75;
      
      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="movieRow">
      <h2 className="movieRow__title">{title}</h2>
      <div className="movieRow__wrapper">
        <button 
          className="movieRow__arrow movieRow__arrow--left"
          onClick={() => handleScroll('left')}
        >
          ‹
        </button>
        <div className="movieRow__posters" ref={rowRef}>
          {movies.map((movie) => (
            <div key={movie.id} className="movieRow__poster">
              <img
                src={getImageUrl(movie.poster_path, 'w300')}
                alt={movie.title}
                loading="lazy"
                onError={(e) => {
                  e.target.src = `https://placehold.co/200x300/222/fff?text=${encodeURIComponent(movie.title)}`;
                }}
              />
              <div className="movieRow__posterInfo">
                <h3>{movie.title}</h3>
                <p>{movie.vote_average?.toFixed(1)} ⭐</p>
              </div>
            </div>
          ))}
        </div>
        <button 
          className="movieRow__arrow movieRow__arrow--right"
          onClick={() => handleScroll('right')}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
