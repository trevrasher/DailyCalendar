import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const month = Number(searchParams.get('month'))
  const year = Number(searchParams.get('year'))

  const todos = await prisma.todo.findMany({
    where: { month, year }
  })

  return NextResponse.json(todos)
}