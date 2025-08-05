import { useQuery } from '@tanstack/react-query';
import http from '@/configs/axios.config';

interface IGetTrailerMovie {
  movieId: string;
}

const getTrailerMovie = async ({ movieId }: IGetTrailerMovie) => {
  const res = await http.get(`3/movie/${movieId}/videos?language=en-US`);

  const trailer = res.data.results?.find(
    (vid) => vid.site === 'YouTube' && vid.type === 'Trailer'
  );

  return trailer;
};

export const useGetTrailerMovie = ({ movieId }: IGetTrailerMovie) => {
  return useQuery({
    queryKey: ['get-trailer-movie', movieId],
    queryFn: () => getTrailerMovie({ movieId })
  });
};
