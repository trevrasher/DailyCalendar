import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type DailyInput = {
  text: string;
  day: number;
  month: number;
  year: number;
  completed?: boolean;
};

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
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
    if (!Array.isArray(json)) {
      return NextResponse.json(
        { error: 'Request body must be an array for batch add.' },
        { status: 400 }
      );
    }
    // Prepare data for createMany, including userId
    const data = (json as DailyInput[]).map((item) => ({
      text: item.text,
      day: item.day,
      month: item.month,
      year: item.year,
      completed: false,
      userId: user.id
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
          year: d.year,
          userId: d.userId
        }))
      }
    });
    return NextResponse.json(createdDailies);
  } catch (error) {
    console.error('Failed to batch create dailies:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}