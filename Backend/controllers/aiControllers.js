import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import { questionAnswerPrompt, conceptExplainPrompt } from "../utils/promts.js";

console.log("Gemini API Key:", process.env.GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateInteviewQuestion = async (req, res) => {
    try {
        console.log("Raw body received:", req.body);
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
        console.log("Generated Prompt:\n", prompt);

        // ✅ Changed to the faster, modern "flash" model
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent(prompt);
        console.log("Raw Gemini Output:\n", result);

        const text = result.response.text();
        console.log("Raw Gemini Output:\n", text);
        const cleanedText = text
            .replace(/^```json\s*/, "") // Remove starting markdown for JSON
            .replace(/```$/, "")       // Remove ending markdown
            .replace(/\\n/g, "")       // Remove newline characters
            .trim();

        res.status(200).json(cleanedText);
    } catch (error) {
        console.error("Error in generateInterviewQuestion controller:", error);
        res.status(500).json({
            message: "Failed to generate interview questions",
            error: error.message,
        });
    }
};





// desc   Generate explanation a interview question
// route  POST     /api/ai/generate-explanation
// access Private

export const generateExplaination = async (req, res) => {
    try {
        console.log("Raw body received:", req.body);
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ message: "Question is required" });
        }

        const prompt = conceptExplainPrompt(question);

        console.log("Generated Prompt:\n", prompt);


        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        // Make the API call
        const result = await model.generateContent(prompt);
        // Extract the text from the response
        const rawText = result.response.text();
        console.log("Raw Gemini Output:\n", rawText);
        // Clean and parse the response
        const cleanedText = rawText
            .replace(/^```json\s*/, "")
            .replace(/```$/, "")
            .replace(/\\n/g, "")
            .trim();




        res.status(200).json(cleanedText);


    } catch (error) {
        console.error("Error in generateInterviewQuestion controller:", error.message, error.stack);
        res.status(500).json({ message: "Failed to generate questions", error: error.message });
    }

}

