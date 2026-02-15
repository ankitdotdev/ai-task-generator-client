"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { SpecSection } from "./SpecSection";
import { SpecItem } from "../types/task.types";
import { Button } from "@/components/Buttons/Button";
import { useSpecsStore } from "@/zustand/store/specs/specStore";

interface Props {
  specId: string;
}

/**
 * Normalize AI output into frontend SpecItem format
 *
 * Why this exists:
 * Backend AI returns inconsistent structure:
 *
 * userStories → { title, description }
 * engineeringTasks → { category, task }
 * risks → string
 * unknowns → string
 *
 * But frontend requires:
 * { id: string, content: string }
 *
 * This function transforms AI output → UI-safe format
 */
const normalizeSpecOutput = (
  output: any,
): {
  userStories: SpecItem[];
  engineeringTasks: SpecItem[];
  risks: SpecItem[];
  unknowns: SpecItem[];
} => {
  return {
    // Convert userStories to SpecItem format
    userStories: output.userStories.map((item: any) => ({
      id: crypto.randomUUID(), // Required for React key stability
      content: `${item.title}\n${item.description}`,
    })),

    // Convert engineeringTasks
    engineeringTasks: output.engineeringTasks.map((item: any) => ({
      id: crypto.randomUUID(),
      content: `${item.category}: ${item.task}`,
    })),

    // Convert risks (string → SpecItem)
    risks: output.risks.map((risk: string) => ({
      id: crypto.randomUUID(),
      content: risk,
    })),

    // Convert unknowns (string → SpecItem)
    unknowns: output.unknowns.map((unknown: string) => ({
      id: crypto.randomUUID(),
      content: unknown,
    })),
  };
};

export const TaskResult = ({ specId }: Props) => {
  /**
   * Zustand store access
   *
   * taskData → cached spec data
   * fetchSpecById → API call fallback
   */
  const { taskData, fetchSpecById } = useSpecsStore();

  /**
   * Local state holds normalized spec output
   *
   * Always use normalized format inside UI
   */
  const [data, setData] = useState<{
    userStories: SpecItem[];
    engineeringTasks: SpecItem[];
    risks: SpecItem[];
    unknowns: SpecItem[];
  } | null>(null);

  /**
   * Edit mode toggle
   */
  const [isEditing, setIsEditing] = useState(false);

  /**
   * Loading state
   */
  const [loading, setLoading] = useState(true);

  /**
   * Load spec logic
   *
   * Priority:
   * 1. Use Zustand cache if available
   * 2. Else fetch from API
   */
  useEffect(() => {
    /**
     * CASE 1:
     * Use Zustand cached data
     *
     * Prevents unnecessary API calls
     */
    if (taskData && taskData.specInputId === specId) {
      setData(normalizeSpecOutput(taskData.output));

      setLoading(false);

      return;
    }

    /**
     * CASE 2:
     * Fetch from backend API
     */
    const fetchSpecFromAPI = async () => {
      try {
        setLoading(true);

        const spec = await fetchSpecById(specId);

        if (!spec) {
          toast.error("Spec not found");

          setLoading(false);

          return;
        }

        // Normalize before storing
        setData(normalizeSpecOutput(spec.output));
      } catch {
        toast.error("Failed to fetch spec");
      } finally {
        setLoading(false);
      }
    };

    fetchSpecFromAPI();
  }, [taskData, specId]);

  /**
   * Loading UI
   */
  if (loading) {
    return <div className="text-white p-6">Loading spec...</div>;
  }

  /**
   * Not found UI
   */
  if (!data) {
    return <div className="text-white p-6">Spec not found</div>;
  }

  /**
   * Save handler
   *
   * TODO: Connect update API here later
   */
  const handleSave = () => {
    toast.success("Task updated successfully");

    setIsEditing(false);
  };

  return (
    <div>
      {/* Header */}
      <div
        className="
        flex
        justify-between
        items-center
        mb-6
      "
      >
        <h1
          className="
          text-2xl font-semibold
        "
        >
          Spec Result
        </h1>

        {isEditing ? (
          <Button onClick={handleSave}>Save</Button>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        )}
      </div>

      {/* Spec Sections */}

      <div
        className="
        bg-[#444654]
        p-6
        rounded-lg
      "
      >
        {/* User Stories */}
        <SpecSection
          title="User Stories"
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
        />

        {/* Engineering Tasks */}
        <SpecSection
          title="Engineering Tasks"
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
        />

        {/* Risks */}
        <SpecSection
          title="Risks"
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
        />

        {/* Unknowns */}
        <SpecSection
          title="Unknowns"
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
        />
      </div>
    </div>
  );
};
