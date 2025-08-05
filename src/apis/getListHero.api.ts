import { useQuery } from '@tanstack/react-query';
import http from '@/configs/axios.config';
import { IGenericResponse } from '@/@types/common';
import { IMovie } from '@/@types/movie';

const getListHero = async () => {
  const res = await http.get<IGenericResponse<IMovie[]>>(
    `3/movie/upcoming?language=en-US&page=1`
  );
  return res.data.results;
};

export const useGetListHero = () => {
  return useQuery({
    queryKey: ['get-list-hero'],
    queryFn: () => getListHero()
  });
};
