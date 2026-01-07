import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const seession = await auth();
  if (!seession?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;
  const total = await prisma.task.count({
    where: { userId: seession.user?.id },
  });
  const tasks = await prisma.task.findMany({
    where: { userId: seession.user.id },
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({
    tasks,
    nextPage: skip + limit < total ? page + 1 : null,
    hasMore: skip + limit < total,
  });
}

//CREATE TASK
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  }
  const { title } = await request.json();
  const tasks = await prisma.task.create({
    data: { title: title.trim(), userId: session?.user?.id },
  });
  if (!title?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 201 });
  }
  return NextResponse.json({ tasks }, { status: 201 });
}
