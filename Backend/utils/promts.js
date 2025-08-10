export const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => `
You are an AI trained to generate technical interview questions and answers.

Instructions:
- Role: ${role}
- Experience: ${experience} years
- Topics: ${topicsToFocus}
- Generate exactly ${numberOfQuestions} technical interview questions.
- Each question must be followed by a clear, beginner-friendly answer.
- Include code examples where appropriate (in \`\`\`js code blocks\`\`\`).
- Return the entire result strictly as a valid JSON array.
- Do not add markdown, commentary, or any additional text.

Output format:
[
  {
    "question": "Your first question?",
    "answer": "A concise and complete answer here, with code if needed."
  },
  ...
]
`;

export const conceptExplainPrompt = (question) => (
   `You are an AI trained to generate explanations for a given interview question.
    
    Task:
    - Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
    - Question: "${question}"
    - After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
    - If the explanation includes a code example, provide a small code block.
    - Keep the formatting very clean and clear.
    - Return the result as a valid JSON object in the following format:
    
    {
      "title": "Short title here?",
      "explanation": "Explanation here."
    }
    
    Important: Do NOT add any extra text outside the JSON format. Only return valid JSON.
    `

);


