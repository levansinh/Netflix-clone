import { useAuthStoreActions } from '@/store/auth.store';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth';

const loginApi = async ({ ...payload }) => {
  const res = await axios.post(`${API_URL}/login`, payload);
  return res.data;
};

export const useLogin = () => {
  const { login } = useAuthStoreActions();

  return useMutation({
    onSuccess: (dataRes) => {
      if (dataRes) {
        const { user, message } = dataRes.data;
        login(user, message);
      }
    },
    mutationFn: loginApi
  });
};
