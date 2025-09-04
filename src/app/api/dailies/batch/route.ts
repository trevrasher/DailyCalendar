import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const json = await request.json();
    if (!Array.isArray(json)) {
      return NextResponse.json(
        { error: 'Request body must be an array for batch add.' },
        { status: 400 }
      );
    }
    // Prepare data for createMany
    const data = json.map((item: any) => ({
      text: item.text,
      day: item.day,
      month: item.month,
      year: item.year,
      completed: false
    }));
    // Use createMany for batch insert
    const result = await prisma.daily.createMany({
      data
    });
    // Fetch the newly created dailies (not returned by createMany)
    const createdDailies = await prisma.daily.findMany({
      where: {
        OR: data.map(d => ({
          text: d.text,
          day: d.day,
          month: d.month,
          year: d.year
        }))
      }
    });
    return NextResponse.json(createdDailies);
  } catch (error) {
    console.error('Failed to batch create dailies:', error);
    return NextResponse.json(
      { error: 'Failed to batch create dailies' },
      { status: 500 }
    );
  }
}
