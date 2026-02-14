import { fetchService } from "@/services/fetchServices";
import { create } from "zustand";

interface AuthState {
  // Define your auth state properties here
}

interface AuthActions {
  // Define your auth actions here
  loginApi: (
    email: string,
    password: string,
  ) => Promise<{
    success: boolean;
    message: string;
  }>;

  registerApi: (
    email: string,
    password: string,
  ) => Promise<{
    success: boolean;
    message: string;
  }>;
}

export const useAuth = create<AuthState & AuthActions>(() => ({
  loginApi: async (email: string, password: string) => {
    try {
      localStorage.clear();
      const response = await fetchService({
        method: "POST",
        endpoint: "/auth/login",
        data: { email, password },
      });

      if (response.code === 200) {
        const token = response.data?.data;

        localStorage.setItem("token", token);

        return {
          success: true,
          message: "Login successful",
        };
      }

      if (response.code === 404) {
        return {
          success: false,
          message: "No account found with this email.",
        };
      }

      if (response.code === 401) {
        return {
          success: false,
          message: "Invalid credentials.",
        };
      }

      return {
        success: false,
        message: "Unexpected error. Please try again.",
      };
    } catch (error) {
      console.error("Login error:", error);

      return {
        success: false,
        message: "Server error. Please try again later.",
      };
    }
  },

  registerApi: async (email: string, password: string) => {
    try {
      const response = await fetchService({
        method: "POST",
        endpoint: "/auth/register",
        data: { email, password },
      });

      if (response.code === 201) {
        const token = response.data?.data;

        if (token) {
          localStorage.setItem("token", token);
        }

        return {
          success: true,
          message: "Account created successfully.",
        };
      }

      if (response.code === 409) {
        return {
          success: false,
          message: "Email is already registered.",
        };
      }

      if (response.code === 400) {
        return {
          success: false,
          message: "Invalid input. Please check your details.",
        };
      }

      return {
        success: false,
        message: "Unexpected error. Please try again.",
      };
    } catch (error) {
      console.error("Register error:", error);

      return {
        success: false,
        message: "Server error. Please try again later.",
      };
    }
  },
}));
