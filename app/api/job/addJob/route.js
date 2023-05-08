import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(req) {
    const { email, user } = await req.json();

    try {
        const jobResult = await prisma.job.create({
            data: {
                contactMail: email,
                userId: user.id,
            },
        });

        if (!jobResult) {
            return new Response(
                JSON.stringify({
                    message: "Job for this mail already exists",
                    ok: false,
                }),
                {
                    status: 409,
                }
            );
        }

        return NextResponse.json({ result: jobResult });
    } catch (err) {
        console.log(err.message);
    }
}
