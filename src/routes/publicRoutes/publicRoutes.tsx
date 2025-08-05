import { IRoute } from '@/@types';
import { PUBLIC_URL } from '@/utils/constants/urls';
import HomePage from '@/features/HomePage/pages';
import MoviePage from '@/features/MoviePage/pages/MoviePage';
import LoginPage from '@/features/auth/pages/LoginPage';
import RegisterPage from '@/features/auth/pages/RegisterPage';

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
  },
  {
    documentTitle: 'title_sign_in',
    path: PUBLIC_URL.LOGIN,
    page: <LoginPage />
  },
  {
    documentTitle: 'title_sign_up',
    path: PUBLIC_URL.SIGNUP,
    page: <RegisterPage />
  }
];
