import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { Session } from "next-auth";

export async function GET() {
    const templates = await prisma.template.findMany()
    return NextResponse.json(templates);
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

        const templates = await prisma.template.create({
            data: {
                text: json.text,
                userId: user.id
            }
    })
    console.log('Created template:', templates)  // Debug log
    return NextResponse.json(templates)

 } catch (error) {
    console.error('Failed to create templates', error)  // Error log
    return NextResponse.json(
      { error: 'Failed to create templates' },
      { status: 500 }
    )
}}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = Number(searchParams.get('id'))
    try {
    await prisma.template.delete({where: {id}});
    return NextResponse.json({ message: 'Template deleted' });
  } catch (error) {
    console.error('Failed to delete template:', error);
    return NextResponse.json(
      { error: 'Failed to delete template' },
      { status: 500 }
    );
  }
}