"use client";

import { useSpecsStore } from "@/zustand/store/specs/specStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MoreVertical, LogOut } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  onCreate: () => void;
}

export const TaskSidebar = ({ onCreate }: Props) => {
  const router = useRouter();
  const { specList, fetchSpecList, deleteTask } = useSpecsStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleNewTask = () => {
    onCreate();
  };

  const handleTaskClick = (id: string) => {
    router.push(`/task/${id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setActiveMenu(null);
    setDeleteConfirmId(id);
  };

  const handleDeleteConfirm = async (id: string) => {
    const result = await deleteTask(id);
    if (result.success) {
      toast.success("Task deleted successfully");
      await fetchSpecList();
    } else {
      toast.error("Failed to delete task");
    }

    setDeleteConfirmId(null);
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();

    // Navigate to login/home
    router.push("/");
  };

  const toggleMenu = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === id ? null : id);
  };

  useEffect(() => {
    async function fetchList() {
      await fetchSpecList();
    }
    fetchList();
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (activeMenu) setActiveMenu(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [activeMenu]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-700"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`
          ${isCollapsed ? "-translate-x-full md:translate-x-0" : "translate-x-0"}
          fixed md:relative
          w-72
          h-full
          bg-gradient-to-b from-gray-900 to-gray-800
          border-r border-gray-700/50
          flex flex-col
          transition-transform duration-300
          z-40
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Task Generator</h2>
              <p className="text-gray-400 text-xs">AI-Powered Specs</p>
            </div>
          </div>

          {/* New Task Button */}
          <button
            onClick={handleNewTask}
            className="
              w-full
              bg-gradient-to-r from-teal-500 to-teal-600
              hover:from-teal-600 hover:to-teal-700
              text-white
              font-semibold
              rounded-lg
              px-4 py-3
              transition-all
              duration-200
              flex items-center justify-center gap-2
              shadow-lg shadow-teal-500/30
              hover:shadow-xl hover:shadow-teal-500/40
            "
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>New Task</span>
          </button>
        </div>

        {/* History Section */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
              Recent Tasks
            </h3>
            {specList && specList.length > 0 && (
              <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded-full">
                {specList.length}
              </span>
            )}
          </div>

          {/* Empty State */}
          {(!specList || specList.length === 0) && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-8 h-8 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-sm">No tasks yet</p>
              <p className="text-gray-600 text-xs mt-1">
                Create your first task to get started
              </p>
            </div>
          )}

          {/* Task List */}
          <div className="space-y-2">
            {specList?.map((spec: any) => {
              const id = spec._id;
              const title = spec.title || "Untitled Spec";

              return (
                <div key={id} className="relative">
                  <div
                    onClick={() => handleTaskClick(id)}
                    role="button"
                    tabIndex={0}
                    className="
    w-full
    text-left
    bg-gray-800/50
    hover:bg-gray-700/50
    border border-transparent
    hover:border-teal-500/30
    rounded-lg
    p-3
    transition-all
    cursor-pointer
    group
  "
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gray-700 group-hover:bg-teal-500/20 rounded flex items-center justify-center flex-shrink-0 transition-colors">
                        <svg
                          className="w-4 h-4 text-gray-400 group-hover:text-teal-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate group-hover:text-teal-300 transition-colors">
                          {title}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          {new Date(spec.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Three Dots Menu Button */}
                      <button
                        onClick={(e) => toggleMenu(e, id)}
                        className="
                          p-1.5
                          hover:bg-gray-600
                          rounded
                          transition-colors
                          opacity-0
                          group-hover:opacity-100
                        "
                      >
                        <MoreVertical className="w-4 h-4 text-white-400" />
                      </button>
                    </div>
                  </div>

                  {/* Dropdown Menu */}
                  {activeMenu === id && (
                    <div className="absolute right-2 top-12 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl z-50 overflow-hidden">
                      <button
                        onClick={(e) => handleDeleteClick(e, id)}
                        className="
                          w-full
                          px-4 py-2.5
                          text-left
                          hover:bg-red-500/10
                          transition-colors
                          flex items-center gap-3
                          text-red-400
                          hover:text-red-300
                        "
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        <span className="text-sm font-medium">Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Logout Section */}
        <div className="p-4 border-t border-gray-700/50">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="
              w-full
              flex items-center gap-3
              p-3
              bg-gray-800/50
              rounded-lg
              hover:bg-red-500/10
              border border-transparent
              hover:border-red-500/30
              transition-all
              group
            "
          >
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
              <LogOut className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-white text-sm font-medium group-hover:text-red-300 transition-colors">
                Logout
              </p>
              <p className="text-gray-400 text-xs">Sign out of your account</p>
            </div>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Delete Task?
                </h3>
                <p className="text-gray-400 text-sm">
                  This action cannot be undone. This will permanently delete
                  this task from your history.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="
                  flex-1
                  px-4 py-3
                  bg-gray-700
                  hover:bg-gray-600
                  text-white
                  font-semibold
                  rounded-xl
                  transition-all
                "
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteConfirm(deleteConfirmId)}
                className="
                  flex-1
                  px-4 py-3
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  font-semibold
                  rounded-xl
                  transition-all
                  flex items-center justify-center gap-2
                "
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <LogOut className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Logout?</h3>
                <p className="text-gray-400 text-sm">
                  Are you sure you want to logout? You will need to sign in
                  again to access your tasks.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="
                  flex-1
                  px-4 py-3
                  bg-gray-700
                  hover:bg-gray-600
                  text-white
                  font-semibold
                  rounded-xl
                  transition-all
                "
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="
                  flex-1
                  px-4 py-3
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  font-semibold
                  rounded-xl
                  transition-all
                  flex items-center justify-center gap-2
                "
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
