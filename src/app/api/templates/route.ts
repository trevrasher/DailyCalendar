import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const dailies = await prisma.template.findMany()
    return NextResponse.json(dailies);
}

export async function POST(request: Request) {
    try {
        const json = await request.json()

        const dailies = await prisma.template.create({
            data: {
                text: json.text
            }
    })
    console.log('Created todo:', dailies)  // Debug log
    return NextResponse.json(dailies)

 } catch (error) {
    console.error('Failed to create daily', error)  // Error log
    return NextResponse.json(
      { error: 'Failed to create daily' },
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
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
}