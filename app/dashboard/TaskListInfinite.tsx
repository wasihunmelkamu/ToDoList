"use client";
import {
  useInfiniteQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Loader2, Plus, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


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
export function Loaders() {
  return (
    <div className=" flex justify-center  items-center w-10 h-10 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin" />
  );
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

  //INIFINTE SCROLL TRIGGER

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );
    observer.observe(loadMoreRef.current);
    observerRef.current = observer;
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage]);
  if (status === "pending") return <Loaders />;
  if (status === "error") return <div>Error Loading</div>;
  const allTasks = data.pages.flatMap((page) => page.tasks);

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <Card className="mx-auto max-w-2xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Your Tasks
          </CardTitle>
          <Badge variant="secondary" className="px-3 py-1">
            {allTasks.length} Total
          </Badge>
        </CardHeader>

        <CardContent>
          {/* ➕ Add Task Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.currentTarget.taskInput as HTMLInputElement;
              const title = input.value.trim();
              if (title) {
                creteTaskMutation.mutate(title);
                input.value = "";
              }
            }}
            className="mb-8 flex gap-2"
          >
            <Input
              name="taskInput"
              type="text"
              placeholder="What needs to be done?"
              className="h-11"
            />
            <Button type="submit" size="icon" className="h-11 w-11 shrink-0">
              <Plus className="h-5 w-5" />
            </Button>
          </form>

          {/* ✅ Task List */}
          <div className="space-y-4">
            {allTasks.length === 0 && !isFetchingNextPage && (
              <div className="py-10 text-center text-muted-foreground">
                <p>No tasks yet. Add one above to get started!</p>
              </div>
            )}

            {allTasks.map((task) => (
              <div
                key={task.id}
                className={`group flex items-center gap-4 rounded-lg border p-4 transition-all hover:bg-slate-50 ${
                  task.completed ? "bg-slate-50/50 opacity-75" : "bg-white"
                }`}
              >
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={(checked) =>
                    updateTaskMutaion.mutate({
                      id: task.id,
                      completed: !!checked,
                    })
                  }
                  className="h-5 w-5 rounded-full"
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className={`flex-1 text-sm font-medium leading-none transition-all peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                    task.completed ? "text-muted-foreground line-through" : ""
                  }`}
                >
                  {task.title}
                </label>
              </div>
            ))}
          </div>

          {/* 📥 Load More Trigger */}
          <div
            ref={loadMoreRef}
            className="mt-6 flex flex-col items-center justify-center py-4 text-sm text-muted-foreground"
          >
            {isFetchingNextPage ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading more tasks...</span>
              </div>
            ) : !hasNextPage && allTasks.length > 0 ? (
              <div className="flex items-center gap-2 text-slate-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>All tasks caught up</span>
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
