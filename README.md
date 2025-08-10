# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

command which i use for backend
bobitadas@taruns-MacBook-Air Backend % npm init -y
bobitadas@taruns-MacBook-Air Backend % npm i express bcryptjs cors dotenv jsonwebtoken mongoose multer @google/genai

npm install --save-dev nodemon
-> is used to install nodemon as a development dependency for your Node.js backend project.

->    --save-dev means it's only needed during development, not in production.

to generate random jwt sign
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

remember:
Rule of Thumb:
Export Statement	              Correct Import
export default something;	     import something from './file.js'
export const x = ...	         import { x } from './file.js'

What is .populate() in Mongoose?
In MongoDB, if you store references to other documents (using ObjectId), Mongoose allows you to automatically replace those references with the actual documents using .populate().

It’s like a join in SQL – pulling in related documents from another collection.

where i stuck ?
in middlewares->authMiddleware->protect
let token = req.headers.authorization;

In Node.js, all header names are lowercased automatically in req.headers, regardless of how they were sent. So even if the client sends Authorization: Bearer <token>, you'll access it as:
req.headers.authorization

In your schema, the questions field expects an array of ObjectIds referencing the Question model. 
But at this point in code, questions is still an array of objects, not ObjectIds.


<!-- aiResponse.data // to be an array: [{ question, answer }, ...],
```json
[
  { "question": "What is React?", "answer": "..." },
  ...
]

This format includes:
- Markdown syntax: ```` ```json ```` and ```` ``` ````  
- Which is **not valid JSON**

So when you called `JSON.parse(aiResponse.data)`, it threw an error — because JSON.parse only works on clean JSON strings (e.g., `"[{...}]"`), **not markdown-wrapped strings**.

---

### ✅ 2. How your solution works

```js
if (typeof generatedQuestions === "string") {
  try {
    const cleaned = generatedQuestions
      .replace(/```json/g, "")  // removes starting ```json
      .replace(/```/g, "")      // removes ending ```
      .trim();                  // removes any leading/trailing spaces

    generatedQuestions = JSON.parse(cleaned);
  } catch (e) {
    console.error("Failed to parse questions JSON:", e);
    setError("Invalid response format from AI service");
    setIsLoading(false);
    return;
  }
} -->



what install
npm install react-markdown
->React Markdown is a component for React that securely converts Markdown text into a React element tree. It lets you easily render Markdown content within your React applications, 