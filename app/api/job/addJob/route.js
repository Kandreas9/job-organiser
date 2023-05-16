import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(req) {
    const { email, user, emailPreview } = await req.json();

    try {
        const jobExists = await prisma.job.findUnique({
            where: {
                contactMail: email,
            },
        });

        if (!jobExists) {
            const jobResult = await prisma.job.create({
                data: {
                    contactMail: email,
                    userId: user.id,
                    emailPreview,
                },
            });
            return NextResponse.json({ result: jobResult, ok: true });
        }

        return new Response(
            JSON.stringify({
                message: "Job for this mail already exists",
                ok: false,
            }),
            {
                status: 409,
            }
        );
    } catch (err) {
        console.log(err.message);
    }
}
