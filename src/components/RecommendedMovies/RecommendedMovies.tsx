import { useGetRecommendedMovies } from '@/apis/getRecommendedMovies.api';
import { Link } from 'react-router-dom';

interface RecommendedMovieProps {
  movieTitles: string;
}

const RecommendedMovies = ({ movieTitles }: RecommendedMovieProps) => {
  const { data: movies, isLoading } = useGetRecommendedMovies({
    search: movieTitles
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
      {movies?.length &&
        movies.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className='bg-[#232323] rounded-lg overflow-hidden'
          >
            {movie.posterPath ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.posterPath}`}
                className='w-full h-48 object-cover'
              />
            ) : (
              <>No Image</>
            )}

            <div className='p-2'>
              <h3 className='text-sm font-semibold text-white truncate'>
                {movie.title}
              </h3>
              <p className='text-xs text-gray-400'>
                {movie.releaseDate ? movie.releaseDate.slice(0, 4) : 'N/A'}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default RecommendedMovies;
