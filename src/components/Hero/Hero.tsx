import { Bookmark, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetListHero } from '@/apis/getListHero.api';
const Hero = () => {
  const { data: movie } = useGetListHero();

  console.log(movie);

  if (!movie) {
    return <p>Loading...</p>;
  }
  return (
    <div className='text-white relative'>
      <img
        src={`https://image.tmdb.org/t/p/original${movie[0].backdropPath}`}
        alt='bg-img'
        className='w-full rounded-2xl h-[480px] object-center object-cover'
      />

      <div className='flex space-x-2 md:space-x-4 absolute bottom-3 left-4 md:bottom-8 md:left-10 font-medium'>
        <button className='flex justify-center items-center bg-white  hover:bg-gray-200 text-[#e50914] py-3 px-4 rounded-full cursor-pointer text-sm md:text-base'>
          <Bookmark className='mr-2 w-4 h-5 md:w-5 md:h-5' /> Save for Later
        </button>
        <Link to={`/movie/${movie[0].id}`}>
          <button className='flex justify-center items-center bg-[#e50914]  text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base'>
            <Play className='mr-2 w-4 h-5 md:w-5 md:h-5' /> Watch Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
