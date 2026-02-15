import {
  AISpecOutput,
  GenerateSpecInput,
} from "@/features/task/types/task.types";
import { fetchService } from "@/services/fetchServices";

import { create } from "zustand";

interface SpecsState {
  taskData: AISpecOutput | null;
}

interface SpecsActions {
  generateTask: (inputData: GenerateSpecInput) => Promise<{
    success: boolean;
    specId: string | null;
    message: string;
  }>;

  fetchSpecById: (id: string) => Promise<AISpecOutput | null>;
}

export const useSpecsStore = create<SpecsState & SpecsActions>((set) => ({
  taskData: null,

  setTaskData: (task: AISpecOutput) => set({ taskData: task }),

  generateTask: async (
    inputData: GenerateSpecInput,
  ): Promise<{
    success: boolean;
    specId: string | null;
    message: string;
  }> => {
    try {
      const response = await fetchService({
        method: "POST",
        endpoint: "/specs",
        data: inputData,
        auth: true,
      });

      const result = response.data.data;
      console.log(result);
      // SUCCESS
      if (response.code === 201) {
        const spec: AISpecOutput = result;

        // store internally in Zustand
        set({
          taskData: spec,
        });

        return {
          success: true,
          specId: result.specId,
          message: result.message || "Task generated successfully",
        };
      }

      // UNAUTHORIZED
      if (response.code === 401) {
        localStorage.clear();
        window.location.href = "/";
        return {
          success: false,
          specId: null,
          message: "Unauthorized. Please login again.",
        };
      }

      // OTHER ERRORS
      return {
        success: false,
        specId: null,
        message: result.message || "Failed to generate task",
      };
    } catch (error: any) {
      // NETWORK / SERVER FAILURE

      if (error?.status === 401) {
        return {
          success: false,
          specId: null,

          message: "Session expired. Please login again.",
        };
      }

      return {
        success: false,
        specId: null,

        message: error?.message || "Something went wrong",
      };
    }
  },

  fetchSpecById: async (id: string): Promise<AISpecOutput | null> => {
    try {
      const response = await fetchService({
        method: "GET",
        endpoint: `/specs/${id}`,
        auth: true,
      });

      const result = response.data.data;
      // Success
      if (response.code === 200) {
        return result as AISpecOutput;
      }

      // Unauthorized
      if (response.code === 401) {
        console.warn("Unauthorized access to spec");

        return null;
      }

      // Other API errors
      console.warn("Failed to fetch spec:", response.data?.message);

      return null;
    } catch (error: any) {
      console.error("Spec fetch error:", error.message);

      return null;
    }
  },
}));
