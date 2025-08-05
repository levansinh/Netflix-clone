/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError } from 'axios';

axios.defaults.withCredentials = true;

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth';

interface IAuthStore {
  user: { username: string; email: string };
  error: null;
  message: string | null;
  fetchingUser: boolean;

  actions: {
    signup: (user: {
      username: string;
      email: string;
      password: string;
    }) => void;
    login: (user: { username: string; email: string }, message: string) => void;
    fetchUser: () => Promise<void>;
    logout: () => Promise<{ message: string }>;
  };
}

export const useAuthStore = create<IAuthStore>((set) => ({
  // initial states
  user: { username: '', email: '' },
  error: null,
  message: null,
  fetchingUser: true,

  actions: {
    signup: async (user) => {
      set({ message: null });

      set({ user });
    },

    login: (user, message) =>
      set(() => ({
        user: user,
        message
      })),

    fetchUser: async () => {
      set({ fetchingUser: true, error: null });

      try {
        const response = await axios.get(`${API_URL}/fetch-user`);
        set({ user: response.data.user, fetchingUser: false });
      } catch (error) {
        set({
          fetchingUser: false,
          error: null,
          user: { username: '', email: '' }
        });

        throw error;
      }
    },

    logout: async () => {
      set({ error: null, message: null });

      try {
        const response = await axios.post(`${API_URL}/logout`);
        const { message } = response.data;
        set({
          message,

          user: { username: '', email: '' },
          error: null
        });

        return { message };
      } catch (error: AxiosError | any) {
        set({
          error: error.response.data.message || 'Error logging out'
        });

        throw error;
      }
    }
  }
}));

/**
 * Export các state của auth store
 * @returns - boolean
 */

export const useGetUser = () => useAuthStore((state) => state.user);

/**
 * Export actions
 */
export const useAuthStoreActions = () => useAuthStore((state) => state.actions);
