import { IGenericResponse } from '@/@types/common';
import { IMovie } from '@/@types/movie';
import http from '@/configs/axios.config';
import { useQuery } from '@tanstack/react-query';

interface IGetListDataWithCategory {
  category: string;
}

const getListDataWithCategory = async ({
  category
}: IGetListDataWithCategory) => {
  const res = await http.get<IGenericResponse<IMovie[]>>(
    `3/movie/${category}?language=en-US&page=1`
  );
  return res.data.results;
};

export const useGetListDataWithCategory = ({
  category
}: IGetListDataWithCategory) => {
  return useQuery({
    queryKey: ['get-list-data-with-category', category],
    queryFn: () => getListDataWithCategory({ category })
  });
};
