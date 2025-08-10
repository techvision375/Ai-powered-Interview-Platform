export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register", // Signup
    LOGIN: "/api/auth/login", // Authenticate user & return JWT token
    GET_PROFILE: "/api/auth/profile", // Get logged-in user details
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image", // Upload profile picture
  },

  AI: {
    GENERATE_QUESTIONS: "/api/ai/generate-question", // Generate interview questions and answers using Gemini
    GENERATE_EXPLANATION: "/api/ai/generate-explaination", // Generate concept explanation using Gemini
  },

  SESSION: {
    CREATE: "/api/session/create", // Create a new interview session with questions
    GET_ALL: "/api/session/my-sessions", // Get all user sessions
    GET_ONE: (id) => `/api/session/${id}`, // Get session details with questions
    DELETE: (id) => `/api/session/${id}`, // Delete a session
  },

  QUESTION: {
    ADD_TO_SESSION: "/api/question/add", // Add more questions to a session
    PIN: (id) => `/api/question/${id}/pin`, // Pin or Unpin a question
    UPDATE_NOTE: (id) => `/api/question/${id}/note`, // Update/Add a note to a question
  },
};
