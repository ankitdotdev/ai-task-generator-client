"use client";

import { useState } from "react";
import { GenerateSpecInput, TaskViewState } from "./types/task.types";
import { TaskEmptyState } from "./components/TaskEmptyState";
import { TaskStepForm } from "./components/TaskStepForm";
import { TaskReview } from "./components/TaskReview";
import { TaskSidebar } from "./components/TaskSidebar";
import { TaskMainLayout } from "./components/TaskMainLayout";
import { TaskGenerating } from "./components/TaskGenerating";
import { useRouter } from "next/navigation";
import { useSpecsStore } from "@/zustand/store/specs/specStore";
import toast from "react-hot-toast";
const TaskContainer = () => {
  const [view, setView] = useState<TaskViewState>("empty");
  const { generateTask } = useSpecsStore();
  const [formData, setFormData] = useState<GenerateSpecInput | null>(null);
  const router = useRouter();
  const handleGenerate = async () => {
    if (!formData) return;

    try {
      // show generating UI
      setView("generating");

      // call API
      const result = await generateTask(formData);

      // handle failure
      if (!result.success) {
        setView("review");

        toast.error(result.message);

        return;
      }

      // get specId from Zustand store
      const specId = result.specId;
      console.log(result);
      if (!specId) {
        setFormData(null);
        toast.error("Failed to retrieve spec ID");

        return;
      }

      // reset form
      setFormData(null);

      // navigate to result page
      router.push(`/task/${specId}`);
    } catch (error) {
      setView("review");

      toast.error("Something went wrong");
    }
  };
  const renderView = () => {
    switch (view) {
      case "empty":
        return <TaskEmptyState onCreate={() => setView("create")} />;

      case "create":
        return (
          <TaskStepForm
            initialData={formData}
            onCancel={() => setView("empty")}
            onComplete={(data) => {
              setFormData(data);
              setView("review");
            }}
          />
        );

      case "review":
        return (
          <TaskReview
            data={formData!}
            onBack={() => setView("create")}
            onGenerate={handleGenerate}
          />
        );

      case "generating":
        return <TaskGenerating />;

      default:
        return null;
    }
  };

  return (
    <div
      className="
      flex
      h-screen
      bg-[#343541]
      text-white
    "
    >
      <TaskSidebar />

      <TaskMainLayout>{renderView()}</TaskMainLayout>
    </div>
  );
};

export default TaskContainer;
