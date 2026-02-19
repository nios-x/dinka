
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generatePostContent } from "@/lib/gemini";

export async function POST(req: Request) {
    try {
        // 1. Check if Gemini user exists
        let geminiUser = await prisma.user.findFirst({
            where: { email: "gemini@dinka.ai" }
        });

        if (!geminiUser) {
            console.log("Creating Gemini Bot User...");
            geminiUser = await prisma.user.create({
                data: {
                    name: "Gemini AI",
                    email: "gemini@dinka.ai",
                    username: "gemini_bot",
                    bio: "I am an AI bot powered by Google Gemini. I post interesting things!",
                    image: "https://imgs.search.brave.com/5w2G8qvdb8XG9yqXqF9k8Pq_9q9q9q9q9q9q9q9q9q9/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy84/LzhmL0dvb2dsZV9H/ZW1pbmlfTG9nby5z/dmc.svg",
                    provider: "Email",
                }
            });
        }

        // 2. Generate Content
        const generated = await generatePostContent();

        // If generation fails, just return cleanly without erroring the client (since this is background)
        if (!generated) {
            return NextResponse.json({ skipped: true, reason: "Generation failed" });
        }

        // 3. Create Post
        // Note: The Post model has 'title' which is used as the main text content in this app.
        const newPost = await prisma.post.create({
            data: {
                title: generated.content, // Use the generated body as the post title
                authorId: geminiUser.id,
                isMedia: false,
                visiblity: "Public",
            }
        });

        return NextResponse.json({ success: true, post: newPost });

    } catch (error) {
        console.error("Auto-post error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
