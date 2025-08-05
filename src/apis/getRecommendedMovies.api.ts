import { useQuery } from '@tanstack/react-query';
import http from '@/configs/axios.config';
import { IGenericResponse } from '@/@types/common';
import { IMovie } from '@/@types/movie';

interface IGetRecommendedMovies {
  search: string;
}

const getRecommendedMovies = async ({ search }: IGetRecommendedMovies) => {
  const res = await http.get<IGenericResponse<IMovie[]>>(
    `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`
  );
  return res.data.results;
};

export const useGetRecommendedMovies = ({ search }: IGetRecommendedMovies) => {
  return useQuery({
    queryKey: ['get-movie-recommendations', search],
    queryFn: () => getRecommendedMovies({ search })
  });
};
