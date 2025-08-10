// import { GoogleGenAI } from "@google/genai";
// import { questionAnswerPrompt } from "../utils/promts.js";
// console.log("Gemini Key:", process.env.GEMINIAPIKEY); 
// const ai = new GoogleGenAI({ apiKey: process.env.GEMINIAPIKEY });

// // desc     generate interview question and answers using Gemini
// // route    POST     /api/ai/generate-question
// // access  Private

// export const generateInteviewQuestion = async (req, res) => {
//     try {
//         console.log("Raw body received:", req.body);
//         const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
//         if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
//         const response = await ai.models.generateContent({
//             model: "gemini-2.0-flash-lite",
//             contents: prompt,

//         });

//         let rawText = response.text;

//         const cleanedText = rawText
//             .replace(/^```json\s*/, "")
//             .replace(/```$/, "")
//             .trim();

//         const data = JSON.parse(cleanedText);
//         res.status(200).json(data);

//     } catch (error) {
//         console.error("Error in generateInterviewQuestion controllers:", error);
//         res.status(500).json({ message: "Failed to generate questions" });
//     }
// };
import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai"; // Correct package name
import { conceptExplainPrompt, questionAnswerPrompt } from "../utils/promts.js";

// Log API key to verify it's loaded
console.log("Gemini API Key:", process.env.GEMINI_API_KEY);

// Initialize the Google Generative AI client with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Simplified initialization

// desc     Generate interview question and answers using Gemini
// route    POST /api/ai/generate-question
// access   Private
export const generateInteviewQuestion = async (req, res) => {
    try {
        console.log("Raw body received:", req.body);
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

        // Validate input fields
        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Generate prompt
        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
        console.log("Generated Prompt:\n", prompt);


        // Get the model (use a valid model name, e.g., gemini-1.5-flash)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Make the API call
        const result = await model.generateContent(prompt);

        // Extract the text from the response
        const rawText = result.response.text();
        console.log("Raw Gemini Output:\n", rawText);

        // Clean and parse the response
        const cleanedText = rawText
            .replace(/^```json\s*/, "") // Remove starting markdown for JSON
            .replace(/```$/, "")       // Remove ending markdown
            .replace(/\\n/g, "")       // Remove newline characters
            .trim();                   // Trim whitespace

        // let data;
        // try {
        //     data = JSON.parse(cleanedText);
        // } catch (e) {
        //     console.error("Invalid JSON in Gemini response:", cleanedText);
        //     return res.status(500).json({
        //         message: "Gemini response was not valid JSON",
        //         raw: cleanedText, // Include the raw response for debugging
        //     });
        // }

        res.status(200).json(rawText);
    } catch (error) {
        console.error("Error in generateInterviewQuestion controller:", error.message, error.stack);
        res.status(500).json({ message: "Failed to generate questions", error: error.message });
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

        // Get the model (use a valid model name, e.g., gemini-1.5-flash)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
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

