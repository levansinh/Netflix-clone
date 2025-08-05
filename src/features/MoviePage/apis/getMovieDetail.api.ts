import { useQuery } from '@tanstack/react-query';
import http from '@/configs/axios.config';

interface IGetMovieDetail {
  movieId: string;
}

const getMovieDetail = async ({ movieId }: IGetMovieDetail) => {
  const res = await http.get(`3/movie/${movieId}?language=en-US`);

  console.log('getMovieDetail response:', res);
  return res.data;
};

export const useGetMovieDetail = ({ movieId }: IGetMovieDetail) => {
  return useQuery({
    queryKey: ['get-movie-detail', movieId],
    queryFn: () => getMovieDetail({ movieId })
  });
};
