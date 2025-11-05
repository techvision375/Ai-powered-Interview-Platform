import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../componants/Inputs/Input.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPath.js";

const CreateSessionModal = () => {
  const [formData, setFormData] = useState({
    role: "",
    topicsToFocus: "",
    experience: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus, description } = formData;
    if (
      !role ||
      !topicsToFocus ||
      !description ||
      isNaN(experience) ||
      Number(experience) <= 0
    ) {
      setError("Please fill all the fields correctly");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          topicsToFocus,
          experience,
          numberOfQuestions: 10,
        }
      );
      console.log("AI Response:", aiResponse.data);

      let generatedQuestions = aiResponse.data;

      // If it's a string, clean and parse
      if (typeof generatedQuestions === "string") {
        try {
          // Remove ```json ... ```
          const cleaned = generatedQuestions
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

          generatedQuestions = JSON.parse(cleaned);
        } catch (e) {
          console.error("Failed to parse questions JSON:", e);
          setError("Invalid response format from AI service");
          setIsLoading(false);
          return;
        }
      }

      if (!Array.isArray(generatedQuestions)) {
        setError("Generated questions are not in array format");
        setIsLoading(false);
        return;
      }

      console.log("API_PATHS.SESSION.CREATE:", API_PATHS.SESSION.CREATE);
      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        role,
        experience,
        description,
        topicsFocus: topicsToFocus,
        questions: generatedQuestions,
      });

      console.log("Session Created:", response.data);
      if (response.data.session._id) {
        navigate(`/interview-prep/${response.data.session._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("something went wrong, please try again later");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white w-[90vw] md:w-[35vw] p-7 flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">
        Start a New Interview Journey
      </h3>
      <p className="text-xs text-slate-700 mt-[5px] md-3">
        Fill out a few quick details and unlock you personalized set of
        interview questions!
      </p>
      <form onSubmit={handleCreateSession} className="flex flex-col gap-3">
        <Input
          value={formData.role}
          onChange={({ target }) => handleChange("role", target.value)}
          label="Target Role"
          placeholder="e.g., Frontend Developer, UI/UX Designer , etc."
          type="text"
        />
        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange("experience", target.value)}
          label="Years of Experience"
          placeholder="(e.g., 1 year, 3 years, 5+ years)"
          type="number"
        />
        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) => handleChange("topicsToFocus", target.value)}
          label="Topics to Focus On"
          placeholder="(Comma-separated, e.g., React, Node.js, MongoDB)"
          type="text"
        />
        <Input
          value={formData.description}
          onChange={({ target }) => handleChange("description", target.value)}
          label="Description"
          placeholder="(Any specific goals or notes for this session)"
          type="text"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button
          type="submit"
          className="btn-primary w-full mt-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating...
            </span>
          ) : (
            "Create Session"
          )}
        </button>
      </form>
    </div>
  );
};
export default CreateSessionModal;
