import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signUp: async (email, password, name) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(
        // `${import.meta.env.VITE_LOCAL_API_URL_DEV}/signup`,
        `${import.meta.env.VITE_LOCAL_API_URL_DEV}/signup`,
        {
          email,
          password,
          name,
        }
      );
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_API_URL_DEV}/verify-email`,
        { code }
      );
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    set({ isCheckingAuth: true, error: null });

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCAL_API_URL_DEV}/check-auth`
      );
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  logIn: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_API_URL_DEV}/login`,
        { email, password }
      );
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  logOut: async () => {
    set({ isLoading: true, error: null });

    try {
      await axios.post(`${import.meta.env.VITE_LOCAL_API_URL_DEV}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_API_URL_DEV}/forgot-password`,
        { email }
      );
      // console.log("forgotPassword response ", response);
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error.response.data.message || "Error sending reset password email",
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_API_URL_DEV}/reset-password/${token}`,
        { password }
      );
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error resetting password",
      });
      throw error;
    }
  },
}));
