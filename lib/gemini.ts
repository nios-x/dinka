
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;
if (apiKey) {
    genAI = new GoogleGenerativeAI(apiKey);
}

export async function generatePostContent(): Promise<{ title: string; content: string } | null> {
    if (!genAI) {
        console.error("Google Gemini API Key not found.");
        return null;
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `Generate a short, engaging social media post for a platform called 'Dinka'. 
        The post should be interesting, maybe a fun fact, a tech tip, a motivational quote, or a question to engage users. 
        Keep it under 280 characters if possible, like a tweet. 
        Return the result as a JSON object with 'title' (a short catchy header) and 'content' (the post body). 
        Do not use markdown code blocks in the output, just raw JSON string.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present (Gemini sometimes adds them)
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        return JSON.parse(cleanText);
    } catch (error) {
        console.error("Error generating content with Gemini:", error);
        return null;
    }
}
