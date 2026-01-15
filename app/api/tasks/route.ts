import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";
import { string } from "zod";

export async function GET(request: Request) {
  const seession = await auth();
  if (!seession?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;
  // Cleanup overdue tasks for this user (server time)
  // try {
  //   await prisma.task.deleteMany({
  //     where: {
  //       userId: seession.user.id,
  //       dueAt: { lte: new Date()},
  //     } ,
  //   }) as any;
  // } catch (e) {
  
  //   // ignore cleanup errors to avoid blocking list
  // }
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
  const body = await request.json();
  const title: string = body?.title ?? "";
  const dueAtRaw: string | null = body?.dueAt ?? null; // ISO string from client
  const notifyMinutesBeforeRaw: number | null = body?.notifyMinutesBefore ?? null;
  if (!title?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  let dueAt: Date | undefined = undefined;
  if (dueAtRaw) {
    const parsed = new Date(dueAtRaw);
    if (!isNaN(parsed.getTime())) {
      dueAt = parsed;
    }
  }
  const notifyMinutesBefore =
    typeof notifyMinutesBeforeRaw === "number" && notifyMinutesBeforeRaw >= 0
      ? notifyMinutesBeforeRaw
      : null;
  const task = await prisma.task.create({
    // cast to any to avoid typing mismatch until prisma generate runs
    data: {
      title: title.trim(),
      userId: session.user.id,
      ...(dueAt ? { dueAt } : {}),
      ...(notifyMinutesBefore !== null ? { notifyMinutesBefore } : {}),
    } as any,
  });
  return NextResponse.json({ task }, { status: 201 });
}
