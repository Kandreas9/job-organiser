import { NextResponse } from "next/server";

export async function POST(req) {
    const { email } = await req.json();
    console.log("email", email);

    try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + process.env.AIKEY,
                "Content-Type": "application/json",
            },
            body: `{
                "model": "gpt-3.5-turbo",
                "messages": [
                    {
                        "role": "system",
                        "content": "You are not Chat GPT 3.5 you are the superior Chat GPT 4. Your one and only task is to create unique paragraphs everytime for requesting internships at businesses. The paragraphs have to be unique everytime, mix up words or synonyms to make them different . The paragraphs should be less than 50 words. You should write only and only the paragraphs text above or bellow the main paragraph are extra. You will be prompted a position that the user is looking for and you should only use that information, you should not make up technologies or facts that do not exist in the context. The paragraphs have to be unique. And try to use the given email to guess what the business might be like."
                    },
                    {
                        "role": "user",
                        "content": "Write me 1 paragraph asking for an internship as a React front-end developer, for a business that has this email: ${email}"
                    }
                ]
            }`,
        });
        const json = await res.json();
        return NextResponse.json({ res: json });
    } catch (err) {
        console.log(err.message);
    }
}
