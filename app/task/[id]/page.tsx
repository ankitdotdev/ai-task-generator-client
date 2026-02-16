import { TaskResult }
  from "@/features/task/components/TaskResult";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({
  params,
}: Props) {

  const { id } = await params;

  return (
    <TaskResult specId={id} />
  );

}
