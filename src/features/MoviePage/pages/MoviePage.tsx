import { Play } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useGetMovieRecommendedDetail } from '../apis/getMovieRecommendedDetail.api';
import { useGetMovieDetail } from '../apis/getMovieDetail.api';
import { useGetTrailerMovie } from '../apis/getTrailerMovie.api';

const MoviePage = () => {
  const { id } = useParams();

  const { data: recommendations } = useGetMovieRecommendedDetail({
    movieId: String(id)
  });

  console.log(recommendations);

  const { data: movie } = useGetMovieDetail({
    movieId: String(id)
  });
  const { data: trailerMovie } = useGetTrailerMovie({
    movieId: String(id)
  });

  if (!movie) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <span className='text-xl text-red-500'>Loading...</span>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#181818] text-white'>
      <div
        className='relative h-[60vh] flex item-end'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdropPath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className='absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent'></div>

        <div className='relative z-10 flex items-end p-8 gap-8'>
          <img
            src={`https://image.tmdb.org/t/p/original${movie.posterPath}`}
            className='rounded-lg shadow-lg w-48 hidden md:block'
          />

          <div>
            <h1 className='text-4xl font-bold mb-2'>{movie.title}</h1>
            <div className='flex items-center gap-4 mb-2'>
              <span>⭐ {movie.voteAverage?.toFixed(1)}</span>
              <span>{movie.releaseDate}</span>
              <span>{movie.runtime} min</span>
            </div>
            <div className='flex flex-wrap gap-2 mb-4'>
              {movie.genres.map((genre) => (
                <span
                  key={genre.name}
                  className='bg-gray-800 px-3 py-1 rounded-full text-sm'
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <p className='max-w-2xl text-gray-200'>{movie.overview}</p>
            <Link
              to={`https://www.youtube.com/watch?v=${trailerMovie.key}`}
              target='_blank'
            >
              <button className='flex justify-center items-center bg-[#e50914]  text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base mt-2 md:mt-4'>
                <Play className='mr-2 w-4 h-5 md:w-5 md:h-5' /> Watch Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className='p-8'>
        <h2 className='text-2xl font-semibold mb-4'>Details</h2>
        <div className='bg-[#232323] rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8'>
          <div className='flex-1'>
            <ul className='text-gray-300 space-y-3'>
              <li>
                <span className='font-semibold text-white'>Status: </span>
                <span className='ml-2'>{movie.status}</span>
              </li>

              <li>
                <span className='font-semibold text-white'>Release Date: </span>
                <span className='ml-2'>{movie.release_date}</span>
              </li>

              <li>
                <span className='font-semibold text-white'>
                  Original Language:
                </span>
                <span className='ml-2'>
                  {movie.original_language?.toUpperCase()}
                </span>
              </li>

              <li>
                <span className='font-semibold text-white'>Budget: </span>
                <span className='ml-2'>
                  {movie.budget ? `$${movie.budget.toLocaleString()}` : 'N/A'}
                </span>
              </li>

              <li>
                <span className='font-semibold text-white'>Revenue:</span>{' '}
                <span className='ml-2'>
                  {movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'N/A'}
                </span>
              </li>

              <li>
                <span className='font-semibold text-white'>
                  Production Companies:
                </span>
                <span className='ml-2'>
                  {movie.productionCompanies &&
                  movie.productionCompanies.length > 0
                    ? movie.productionCompanies.map((c) => c.name).join(', ')
                    : 'N/A'}
                </span>
              </li>

              <li>
                <span className='font-semibold text-white'>Countries:</span>
                <span className='ml-2'>
                  {movie.productionCountries &&
                  movie.productionCountries.length > 0
                    ? movie.productionCountries.map((c) => c.name).join(', ')
                    : 'N/A'}
                </span>
              </li>

              <li>
                <span className='font-semibold text-white'>
                  Spoken Languages:
                </span>
                <span className='ml-2'>
                  {movie.spokenLanguages && movie.spokenLanguages.length > 0
                    ? movie.spokenLanguages.map((l) => l.englishName).join(', ')
                    : 'N/A'}
                </span>
              </li>
            </ul>
          </div>
          <div className='flex-1'>
            <h3 className='font-semibold text-white mb-2'>Tagline</h3>
            <p className='italic text-gray-400 mb-6'>
              {movie.tagline || 'No tagline available.'}
            </p>

            <h3 className='font-semibold text-white mb-2'>Overview</h3>
            <p className='text-gray-200'>{movie.overview}</p>
          </div>
        </div>
      </div>

      {recommendations?.length && (
        <div className='p-8'>
          <h2 className='text-2xl font-semibold mb-4'>
            You might also like...
          </h2>

          <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
            {recommendations.slice(0, 10).map((rec) => (
              <div
                key={rec.id}
                className='bg-[#232323] rounded-lg overflow-hidden hover:scale-105 transition'
              >
                <Link to={`/movie/${rec.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300${rec.posterPath}`}
                    className='w-full h-48 object-cover'
                  />
                  <div className='p-2'>
                    <h3 className='text-sm font-semibold'>{rec.title}</h3>
                    <span className='text-xs text-gray-400'>
                      {rec.releaseDate?.slice(0, 4)}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePage;
