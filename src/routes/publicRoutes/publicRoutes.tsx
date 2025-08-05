import { IRoute } from '@/@types';
import { PUBLIC_URL } from '@/utils/constants/urls';
import HomePage from '@/features/HomePage/pages';
import MoviePage from '@/features/MoviePage/pages/MoviePage';

export const publicRoutes: IRoute[] = [
  {
    documentTitle: 'title_home_page',
    path: PUBLIC_URL.HOME,
    page: <HomePage />
  },
  {
    documentTitle: 'title_home_page',
    path: PUBLIC_URL.MOVIE,
    page: <MoviePage />
  }
];
