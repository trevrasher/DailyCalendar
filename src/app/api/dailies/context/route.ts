import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(request: Request) {
  try {
    const dailies = await request.json(); // This is an array
    const results = await Promise.all(
      dailies.map((daily: { id: number; completed: boolean }) =>
        prisma.daily.update({
          where: { id: Number(daily.id) },
          data: { completed: daily.completed }
        })
      )
    );
    return NextResponse.json(results);
  } catch (error) {
    console.error("Failed to update dailies", error);
    return NextResponse.json({ error: "Failed to update dailies" }, { status: 500 });
  }
}