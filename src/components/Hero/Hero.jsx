import { getImageUrl } from '../../services/tmdb';
import './Hero.css';

const Hero = ({ movie }) => {
  const truncateDescription = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  if (!movie) return null;

  const backdropUrl = getImageUrl(movie.backdrop_path, 'original');
  const fallbackUrl = `https://placehold.co/1920x1080/222/fff?text=${encodeURIComponent(movie.title)}`;

  return (
    <div 
      className="hero"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(20,20,20,0) 0%, rgba(20,20,20,0.5) 50%, rgba(20,20,20,1) 100%), 
                          url(${backdropUrl}), 
                          url(${fallbackUrl})`
      }}
    >
      <div className="hero__content">
        <h1 className="hero__title">{movie.title}</h1>
        <div className="hero__buttons">
          <button className="hero__button hero__button--play">
            <span>▶</span> Play
          </button>
          <button className="hero__button hero__button--info">
            <span>ℹ</span> More Info
          </button>
        </div>
        <p className="hero__description">
          {truncateDescription(movie.overview, 150)}
        </p>
      </div>
      <div className="hero__fadeBottom" />
    </div>
  );
};

export default Hero;
