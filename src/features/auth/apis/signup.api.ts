import { useAuthStoreActions } from '@/store/auth.store';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth';

const signupApi = async ({ ...payload }) => {
  const res = await axios.post(`${API_URL}/signup`, payload);
  return res.data;
};

export const useSignup = () => {
  const { signup } = useAuthStoreActions();

  return useMutation({
    onSuccess: (dataRes) => {
      if (dataRes) {
        console.log('Signup successful:', dataRes);
        const { username, email, password } = dataRes.data;
        signup({ username, email, password });
      }
    },
    mutationFn: signupApi
  });
};
