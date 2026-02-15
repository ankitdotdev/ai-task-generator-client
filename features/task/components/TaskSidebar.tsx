"use client";

import { useSpecsStore } from "@/zustand/store/specs/specStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Sidebar displays list of generated specs.
 *
 * Data source:
 * Zustand store → specList
 *
 * API returns MongoDB _id
 * We map:
 *
 * _id → id (for frontend routing)
 */
export const TaskSidebar = () => {
  const router = useRouter();

  /**
   * Zustand store state and actions
   */
  const { specList, fetchSpecList } = useSpecsStore();

  /**
   * Navigate to create new task page
   */
  const handleNewTask = () => {
    router.push("/task");
  };

  /**
   * Navigate to specific spec result page
   *
   * Uses outputId (MongoDB _id)
   */
  const handleTaskClick = (id: string) => {
    router.push(`/task/${id}`);
  };

  /**
   * Fetch spec history when sidebar loads
   */
  useEffect(() => {
    async function fetchList() {
      await fetchSpecList();
    }
    fetchList();
  }, []);

  return (
    <div
      className="
      w-64
      bg-[#202123]
      flex
      flex-col
    "
    >
      {/* New Task Button */}
      <div className="p-3">
        <button
          onClick={handleNewTask}
          className="
            w-full
            border
            border-gray-600
            rounded-md
            px-3
            py-2
            hover:bg-gray-700
          "
        >
          + New Task
        </button>
      </div>

      {/* History List */}
      <div
        className="
        flex-1
        overflow-y-auto
        px-3
      "
      >
        <div
          className="
          text-sm
          text-gray-400
          mb-2
        "
        >
          History
        </div>

        {/* Empty state */}
        {(!specList || specList.length === 0) && (
          <div
            className="
            text-sm
            text-gray-500
          "
          >
            No tasks yet
          </div>
        )}

        {/* Spec List */}
        {specList?.map((spec: any) => {
          /**
           * Map MongoDB _id → frontend id
           */
          const id = spec._id;

          /**
           * Display title safely
           */
          const title = spec.title || "Untitled Spec";

          return (
            <div
              key={id}
              onClick={() => handleTaskClick(id)}
              className="
                text-sm
                p-2
                rounded
                hover:bg-gray-700
                cursor-pointer
                truncate
              "
            >
              {title}
            </div>
          );
        })}
      </div>

      {/* Profile section */}
      <div
        className="
        p-3
        border-t
        border-gray-700
      "
      >
        Profile
      </div>
    </div>
  );
};
