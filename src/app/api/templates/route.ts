import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const templates = await prisma.template.findMany()
    return NextResponse.json(templates);
}

export async function POST(request: Request) {
    try {
        const json = await request.json()

        const templates = await prisma.template.create({
            data: {
                text: json.text
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
    return NextResponse.json(
      { error: 'Failed to delete template' },
      { status: 500 }
    );
  }
}