import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
import TaskListInfinite from "./TaskListInfinite";
const Dashboard = async () => {
  const session = await auth();
  if (!session?.user?.id) redirect("/Login");
  return <TaskListInfinite />;
};

export default Dashboard;
