import { NextResponse, NextRequest } from 'next/server';
import db from "../../../../db";
import { Advocate } from '@/types/types';



export async function GET(_req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<{ data?: Advocate, error?: string }>> {
    const advocateId = Number(params.id);
    const data = await db.query.advocates.findFirst({
        where: (advocates, { eq }) => eq(advocates.id, advocateId),
        with: {
            specialties: {
                with: {
                    specialty: true,
                },
            },
        },
    });

    if (!data) return NextResponse.json({ error: "Advocate not found" }, { status: 404 });


    return NextResponse.json({ data }, { status: 200 });
}
