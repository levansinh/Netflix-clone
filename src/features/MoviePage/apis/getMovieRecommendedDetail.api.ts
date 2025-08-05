import { useQuery } from '@tanstack/react-query';
import http from '@/configs/axios.config';
import { IGenericResponse } from '@/@types/common';
import { IMovie } from '@/@types/movie';

interface IGetMovieRecommendedDetail {
  movieId: string;
}

const getMovieRecommendedDetail = async ({
  movieId
}: IGetMovieRecommendedDetail) => {
  const res = await http.get<IGenericResponse<IMovie[]>>(
    `3/movie/${movieId}/recommendations?language=en-US&page=1`
  );
  return res.data.results;
};

export const useGetMovieRecommendedDetail = ({
  movieId
}: IGetMovieRecommendedDetail) => {
  return useQuery({
    queryKey: ['get-movie-recommended-detail', movieId],
    queryFn: () => getMovieRecommendedDetail({ movieId })
  });
};
