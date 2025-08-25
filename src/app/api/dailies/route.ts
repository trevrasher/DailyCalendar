import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
      const { searchParams } = new URL(request.url);
      const day = Number(searchParams.get('day'));
      const month = Number(searchParams.get('month'));
      const year = Number(searchParams.get('year'));
      const dailies = await prisma.daily.findMany({
        where: { month, year }
      });

      if (dailies.length !== 0) {
        return NextResponse.json(dailies);
      } else {
      const templates = await prisma.template.findMany();
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