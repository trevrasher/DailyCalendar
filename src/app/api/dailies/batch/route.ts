import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { memoryStore, findOrCreateUser } from "@/lib/memory-store";
import { NextResponse } from 'next/server'


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
    const user = findOrCreateUser(session.user.email, session.user.name || undefined);

    const json = await request.json();
    if (!Array.isArray(json)) {
      return NextResponse.json(
        { error: 'Request body must be an array for batch add.' },
        { status: 400 }
      );
    }
    
    const createdDailies = [];
    for (const item of json as DailyInput[]) {
      const daily = await memoryStore.daily.create({
        data: {
          text: item.text,
          day: item.day,
          month: item.month,
          year: item.year,
          completed: false,
          userId: user.id
        }
      });
      createdDailies.push(daily);
    }
    
    return NextResponse.json(createdDailies);
  } catch (error) {
    console.error('Failed to batch create dailies:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}