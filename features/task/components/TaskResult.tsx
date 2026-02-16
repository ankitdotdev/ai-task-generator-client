"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SpecSection } from "./SpecSection";
import { SpecItem } from "../types/task.types";
import { useSpecsStore } from "@/zustand/store/specs/specStore";

interface Props {
  specId: string;
}

export const TaskResult = ({ specId }: Props) => {
  const router = useRouter();
  const { taskData, fetchSpecById, updateTask, deleteTask } = useSpecsStore();
  const [data, setData] = useState<{
    userStories: SpecItem[];
    engineeringTasks: SpecItem[];
    risks: SpecItem[];
    unknowns: SpecItem[];
  } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  useEffect(() => {
    if (!specId) return;

    const loadSpec = async () => {
      try {
        setLoading(true);

        const spec = await fetchSpecById(specId);
        if (!spec) {
          toast.error("Spec not found");
          return;
        }

        const raw = spec.output ?? spec;

       const normalizeArray = (arr: any[]) =>
  arr.map((item: any) => {
    // If it's already normalized
    if (item?.content) {
      let content = item.content;

      // Try to detect JSON-like string manually
      if (
        typeof content === "string" &&
        content.trim().startsWith("{") &&
        content.includes("category") &&
        content.includes("task")
      ) {
        try {
          const parsed = JSON.parse(content.replace(/\\n/g, ""));
          content = `${parsed.category}: ${parsed.task}`;
        } catch {
          // fallback: manual extraction
          const categoryMatch = content.match(/"category":"([^"]+)"/);
          const taskMatch = content.match(/"task":"([^"]+)"/);

          if (categoryMatch && taskMatch) {
            content = `${categoryMatch[1]}: ${taskMatch[1]}`;
          }
        }
      }

      return {
        id: item.id ?? crypto.randomUUID(),
        content,
      };
    }

    // If it's a raw string
    if (typeof item === "string") {
      // Check if it's a JSON string first
      if (item.trim().startsWith("{") && item.includes("category") && item.includes("task")) {
        try {
          const parsed = JSON.parse(item.replace(/\\n/g, ""));
          if (parsed.task && parsed.category) {
            return {
              id: crypto.randomUUID(),
              content: `${parsed.category}: ${parsed.task}`,
            };
          }
        } catch {
          // fallback: manual extraction
          const categoryMatch = item.match(/"category"\s*:\s*"([^"]+)"/);
          const taskMatch = item.match(/"task"\s*:\s*"([^"]+)"/);

          if (categoryMatch && taskMatch) {
            return {
              id: crypto.randomUUID(),
              content: `${categoryMatch[1]}: ${taskMatch[1]}`,
            };
          }
        }
      }

      return {
        id: crypto.randomUUID(),
        content: item,
      };
    }

    // If it's an object with category and task directly
    if (item.category && item.task) {
      return {
        id: crypto.randomUUID(),
        content: `${item.category}: ${item.task}`,
      };
    }

    // If it's old format
    if (item.title && item.description) {
      return {
        id: crypto.randomUUID(),
        content: `${item.title}\n${item.description}`,
      };
    }

    return {
      id: crypto.randomUUID(),
      content: JSON.stringify(item),
    };
  });

        setData({
          userStories: normalizeArray(raw.userStories || []),
          engineeringTasks: normalizeArray(raw.engineeringTasks || []),
          risks: normalizeArray(raw.risks || []),
          unknowns: normalizeArray(raw.unknowns || []),
        });
      } catch (err) {
        toast.error("Failed to fetch spec");
      } finally {
        setLoading(false);
      }
    };

    loadSpec();
  }, [specId]);

  const handleSave = async () => {
    setSaving(true);
    if (!data) {
      toast.error("No data to update");
      setSaving(false);
      return;
    }
    const result = await updateTask(specId, data);

    if (result.success) {
      toast.success("Task updated successfully");
      setIsEditing(false);
    } else {
      toast.error("Failed to update");
    }
    setSaving(false);
  };

  const handleBack = () => {
    router.push("/task");
  };

  const handleDelete = async () => {
    try {
      const result = await deleteTask(specId);
      if (result.success) {
        toast.success("Task deleted successfully");
        router.push("/task");
        return;
      } else {
        toast.error("Failed to delete task");
      }
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const generateTextContent = () => {
    if (!data) return "";

    let content = "# SPEC RESULT\n\n";

    // User Stories
    content += "## 👤 USER STORIES\n\n";
    data.userStories.forEach((item, index) => {
      content += `${index + 1}. ${item.content}\n\n`;
    });

    // Engineering Tasks
    content += "## ⚙️ ENGINEERING TASKS\n\n";
    data.engineeringTasks.forEach((item, index) => {
      content += `${index + 1}. ${item.content}\n\n`;
    });

    // Risks
    content += "## ⚠️ RISKS\n\n";
    data.risks.forEach((item, index) => {
      content += `${index + 1}. ${item.content}\n\n`;
    });

    // Unknowns
    content += "## ❓ UNKNOWNS\n\n";
    data.unknowns.forEach((item, index) => {
      content += `${index + 1}. ${item.content}\n\n`;
    });

    return content;
  };

  const handleCopyAsText = async () => {
    const content = generateTextContent();
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Copied to clipboard!");
      setShowExportMenu(false);
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  const handleDownloadAsText = () => {
    const content = generateTextContent();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `spec-${specId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Downloaded as text!");
    setShowExportMenu(false);
  };

  const handleDownloadAsMarkdown = () => {
    const content = generateTextContent();
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `spec-${specId}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Downloaded as markdown!");
    setShowExportMenu(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading spec...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-gray-400">Spec not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="
                p-2
                bg-gray-700
                hover:bg-gray-600
                text-white
                rounded-lg
                transition-all
                flex items-center justify-center
              "
              title="Back to tasks"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Spec Result
              </h1>
              <p className="text-gray-400">
                {isEditing
                  ? "Edit your spec sections below"
                  : "Review your generated specification"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="
                    px-6 py-3
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
                  onClick={handleSave}
                  disabled={saving}
                  className="
                    px-6 py-3
                    bg-gradient-to-r from-teal-500 to-teal-600
                    hover:from-teal-600 hover:to-teal-700
                    disabled:from-gray-600 disabled:to-gray-600
                    text-white
                    font-semibold
                    rounded-xl
                    shadow-lg shadow-teal-500/30
                    hover:shadow-xl hover:shadow-teal-500/40
                    transition-all
                    disabled:cursor-not-allowed
                    flex items-center gap-2
                  "
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                {/* Delete Button */}
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="
                    px-6 py-3
                    bg-red-500/20
                    hover:bg-red-500/30
                    border border-red-500/50
                    hover:border-red-500
                    text-red-400
                    hover:text-red-300
                    font-semibold
                    rounded-xl
                    transition-all
                    flex items-center gap-2
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

                {/* Export Button with Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    className="
                      px-6 py-3
                      bg-gray-700
                      hover:bg-gray-600
                      text-white
                      font-semibold
                      rounded-xl
                      transition-all
                      flex items-center gap-2
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
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span>Export</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        showExportMenu ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Export Dropdown Menu */}
                  {showExportMenu && (
                    <>
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowExportMenu(false)}
                      />

                      {/* Menu */}
                      <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-20 overflow-hidden">
                        <button
                          onClick={handleCopyAsText}
                          className="
                            w-full
                            px-4 py-3
                            text-left
                            hover:bg-gray-700
                            transition-colors
                            flex items-center gap-3
                            text-white
                          "
                        >
                          <svg
                            className="w-5 h-5 text-teal-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                          <div>
                            <div className="font-semibold">
                              Copy to Clipboard
                            </div>
                            <div className="text-xs text-gray-400">
                              Copy as plain text
                            </div>
                          </div>
                        </button>

                        <div className="h-px bg-gray-700" />

                        <button
                          onClick={handleDownloadAsText}
                          className="
                            w-full
                            px-4 py-3
                            text-left
                            hover:bg-gray-700
                            transition-colors
                            flex items-center gap-3
                            text-white
                          "
                        >
                          <svg
                            className="w-5 h-5 text-blue-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                          <div>
                            <div className="font-semibold">
                              Download as Text
                            </div>
                            <div className="text-xs text-gray-400">
                              Save as .txt file
                            </div>
                          </div>
                        </button>

                        <div className="h-px bg-gray-700" />

                        <button
                          onClick={handleDownloadAsMarkdown}
                          className="
                            w-full
                            px-4 py-3
                            text-left
                            hover:bg-gray-700
                            transition-colors
                            flex items-center gap-3
                            text-white
                          "
                        >
                          <svg
                            className="w-5 h-5 text-purple-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                          <div>
                            <div className="font-semibold">
                              Download as Markdown
                            </div>
                            <div className="text-xs text-gray-400">
                              Save as .md file
                            </div>
                          </div>
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => setIsEditing(true)}
                  className="
                    px-6 py-3
                    bg-gradient-to-r from-teal-500 to-teal-600
                    hover:from-teal-600 hover:to-teal-700
                    text-white
                    font-semibold
                    rounded-xl
                    shadow-lg shadow-teal-500/30
                    hover:shadow-xl hover:shadow-teal-500/40
                    transition-all
                    flex items-center gap-2
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <span>Edit</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
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
                  your spec and all its contents.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
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
                onClick={handleDelete}
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

      {/* Spec Sections */}
      <div className="space-y-6">
        <SpecSection
          title="User Stories"
          icon="👤"
          items={data.userStories}
          isEditing={isEditing}
          onUpdate={(index, value) => {
            const newData = structuredClone(data);
            newData.userStories[index].content = value;
            setData(newData);
          }}
          onAdd={() => {
            const newData = structuredClone(data);
            newData.userStories.push({
              id: crypto.randomUUID(),
              content: "",
            });
            setData(newData);
          }}
          onDelete={(index) => {
            const newData = structuredClone(data);
            newData.userStories.splice(index, 1);
            setData(newData);
          }}
        />

        <SpecSection
          title="Engineering Tasks"
          icon="⚙️"
          items={data.engineeringTasks}
          isEditing={isEditing}
          onUpdate={(index, value) => {
            const newData = structuredClone(data);
            newData.engineeringTasks[index].content = value;
            setData(newData);
          }}
          onAdd={() => {
            const newData = structuredClone(data);
            newData.engineeringTasks.push({
              id: crypto.randomUUID(),
              content: "",
            });
            setData(newData);
          }}
          onDelete={(index) => {
            const newData = structuredClone(data);
            newData.engineeringTasks.splice(index, 1);
            setData(newData);
          }}
        />

        <SpecSection
          title="Risks"
          icon="⚠️"
          items={data.risks}
          isEditing={isEditing}
          onUpdate={(index, value) => {
            const newData = structuredClone(data);
            newData.risks[index].content = value;
            setData(newData);
          }}
          onAdd={() => {
            const newData = structuredClone(data);
            newData.risks.push({
              id: crypto.randomUUID(),
              content: "",
            });
            setData(newData);
          }}
          onDelete={(index) => {
            const newData = structuredClone(data);
            newData.risks.splice(index, 1);
            setData(newData);
          }}
        />

        <SpecSection
          title="Unknowns"
          icon="❓"
          items={data.unknowns}
          isEditing={isEditing}
          onUpdate={(index, value) => {
            const newData = structuredClone(data);
            newData.unknowns[index].content = value;
            setData(newData);
          }}
          onAdd={() => {
            const newData = structuredClone(data);
            newData.unknowns.push({
              id: crypto.randomUUID(),
              content: "",
            });
            setData(newData);
          }}
          onDelete={(index) => {
            const newData = structuredClone(data);
            newData.unknowns.splice(index, 1);
            setData(newData);
          }}
        />
      </div>
    </div>
  );
};
