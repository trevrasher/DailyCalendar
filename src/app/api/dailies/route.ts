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
       return NextResponse.json(dailies);
      } catch (error) {
        console.error('Failed to fetch Dailies:', error);
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

  export async function POST(request: Request) {
  try {
    const json = await request.json()
    console.log('Received data:', json)  // Debug log

    const daily = await prisma.daily.create({
      data: {
        text: json.text,
        day: json.day,
        month: json.month,
        year: json.year,
        completed: false
      }
    })

    console.log('Created daily:', daily)  // Debug log
    return NextResponse.json(daily)
  } catch (error) {
    console.error('Failed to create daily:', error)  // Error log
    return NextResponse.json(
      { error: 'Failed to create daily' },
      { status: 500 }
    )
  }
}

