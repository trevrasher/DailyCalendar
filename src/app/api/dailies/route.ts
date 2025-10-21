import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { Session } from "next-auth";

export async function GET(request: Request) {
  try {
      const { searchParams } = new URL(request.url);
      const month = Number(searchParams.get('month'));
      const year = Number(searchParams.get('year'));
      const dailies = await prisma.daily.findMany({
        where: { month, year }
      });
       return NextResponse.json(dailies);
      } catch (error) {
        console.error('Failed to fetch Dailies:', error);
        return NextResponse.json(
          { error: 'Failed to fetch dailies' },
          { status: 500 }
        );
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
    return NextResponse.json(
      { error: 'Failed to update daily' },
      { status: 500 }
    );
  }
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

    const json = await request.json();

    const daily = await prisma.daily.create({
      data: {
        text: json.text,
        day: json.day,
        month: json.month,
        year: json.year,
        completed: false,
        userId: user.id
      }
    });

    return NextResponse.json(daily);
  } catch (error) {
    console.error('Failed to create daily:', error);
    return NextResponse.json(
      { error: 'Failed to create daily' },
      { status: 500 }
    );
  }
}

