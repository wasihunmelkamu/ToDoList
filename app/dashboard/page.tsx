import {
  useInfiniteQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { useRef } from "react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
  createdAt: string;
}
interface TasksPage {
  tasks: Task[];
  nextPage: number | null;
  hasMore: boolean;
}
//FETCH PAGE OF TASKS
async function fetchTasksPage(pageParam = 1): Promise<TasksPage> {
  const res = await fetch(`api/tasks?page=${pageParam}&limit=2`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}
//CREATE TASK
async function createTask(title: string) {
  const res = await fetch("api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}
//UPDATE TASK
async function updateTask(id: string, completed: boolean) {
  const res = await fetch(`api/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  if (!res.ok) throw new Error("Failed to update");
  return res.json();
}
export default function TaskListInfinite() {
  const queryClient = useQueryClient();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["tasks"],
      queryFn: ({ pageParam }) => fetchTasksPage(pageParam as number),
      initialPageParam: 1,
      getNextPageParam: (lastPage: TasksPage) => {
        return lastPage.hasMore ? lastPage.nextPage : undefined;
      },
    });
  // OPTIMISTIC UPDATE LOGIC (SAME AS BEFOR)
  const creteTaskMutation = useMutation({
    mutationFn: (title: string) => createTask(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  const updateTaskMutaion = useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      updateTask(id, completed),
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousData = queryClient.getQueryData<any>(["tasks"]);
      queryClient.setQueryData<any>(["tasks"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: TasksPage, pageIndex: number) => {
            const tasksIndex = page.tasks.findIndex((t) => t.id === newTask.id);
            if (tasksIndex !== -1) {
              const updateTasks = [...page.tasks];
              updateTasks[tasksIndex] = {
                ...updateTasks[tasksIndex],
                completed: newTask.completed,
              };
              return { ...page, tasks: updateTasks };
            }
            return page;
          }),
        };
      });
      return { previousData };
    },
    onError: (err, newTask, context) => {
      queryClient.setQueryData(["tasks"], context?.previousData);
    },
  });
}
