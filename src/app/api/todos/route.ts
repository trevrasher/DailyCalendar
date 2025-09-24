import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { Session } from "next-auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const month = Number(searchParams.get('month'))
  const year = Number(searchParams.get('year'))

  const todos = await prisma.todo.findMany({
    where: { month, year }
  })
  
  return NextResponse.json(todos)
}

export async function POST(request: Request) {
  try {
                const session: Session | null = await getServerSession(authOptions);
          if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
          }
      
          const user = await prisma.user.findUnique({
            where: { email: session.user.email }
          });
          if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
          }
    const json = await request.json()
    console.log('Received data:', json)  // Debug log

    const todo = await prisma.todo.create({
      data: {
        text: json.text,
        day: json.day,
        month: json.month,
        year: json.year,
        completed: false,
        userId: user.id
      }
    })
    
    console.log('Created todo:', todo)  // Debug log
    return NextResponse.json(todo)
  } catch (error) {
    console.error('Failed to create todo:', error)  // Error log
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = Number(searchParams.get('id'))
  try {
    await prisma.todo.delete({where: {id}});
    return NextResponse.json({ message: 'Todo deleted' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const json = await request.json();
    const {id, completed} = json;

    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { completed }
    });
    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error("Failed to update todo", error);
  }
}