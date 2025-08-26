import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(request: Request) {
  try {
    const todos = await request.json(); // This is an array
    const results = await Promise.all(
      todos.map((todo: { id: number; completed: boolean }) =>
        prisma.todo.update({
          where: { id: Number(todo.id) },
          data: { completed: todo.completed }
        })
      )
    );
    return NextResponse.json(results);
  } catch (error) {
    console.error("Failed to update todos:", error);
    return NextResponse.json({ error: "Failed to update todos:" }, { status: 500 });
  }
}