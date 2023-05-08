import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET({ nextUrl }) {
    const slugs = nextUrl.pathname.split("/").filter(Boolean);
    const slug = slugs.slice(-1);
    const id = slug[0];

    try {
        const jobs = await prisma.job.findMany({
            where: {
                userId: id,
            },
        });

        return NextResponse.json({ jobs });
    } catch (err) {
        console.log(err.message);
    }
}
