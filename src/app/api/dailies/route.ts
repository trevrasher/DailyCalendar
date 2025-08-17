import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
      const { searchParams } = new URL(request.url);
      if (searchParams.has('day')) {
      const day = Number(searchParams.get('day'));
      const month = Number(searchParams.get('month'));
      const year = Number(searchParams.get('year'));

      const dailies = await prisma.daily.findMany({
        where: { day, month, year }
      });

      return NextResponse.json(dailies);
    }

    
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    const templates = await prisma.template.findMany();

    const existingEntries = await prisma.daily.findMany({
      where: { day, month, year }
    });

    if (existingEntries.length === 0) {
      const newDailies = await Promise.all(
        templates.map(template =>
          prisma.daily.create({
            data: {
              text: template.text,
              completed: false,
              day,
              month,
              year
            }
          })
        )
      );

      return NextResponse.json({ 
        message: 'Dailies created', 
      });
    }

    return NextResponse.json({ 
      message: 'Dailies already exist for today' 
    });

  } catch (error) {
    console.error('Failed to create Dailies:', error);
  }
}


export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = Number(searchParams.get('id'))
  try {
    await prisma.daily.delete({where: {id}});
    return NextResponse.json({ message: 'Daily deleted' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete daily' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const json = await request.json();
    const {id, completed} = json;

    const updatedDaily = await prisma.daily.update({
      where: { id: Number(id) },
      data: { completed }
    });
    return NextResponse.json(updatedDaily);
  } catch (error) {
    console.error("Failed to update daily", error);
  }
}