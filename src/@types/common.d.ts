/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IGenericResponse<T = any> {
  page: number;
  results: T;
  totalPages: number;
  totalResults: number;
}
