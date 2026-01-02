import {
  useInfiniteQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { promises } from "dns";
import { use, useRef } from "react";

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

}
