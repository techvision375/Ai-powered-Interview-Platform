import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import toast from "react-hot-toast";
import DashboardLayout from "../../componants/layouts/DashboardLayout";
import RoleInfoHeader from "./componants/RoleInfoHeader.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPath.js";
import QuestionCard from "../../componants/Cards/QuestionCard.jsx";
import Drawer from "../../componants/Loader/Drawer.jsx";
import SkeletonLoader from "../../componants/Loader/SkeletonLoader.jsx";
import AIResponsePreview from "./componants/AIResponsePreview.jsx";

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // fetch session data by sessionId

  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );
      console.log("Session Details Response:", response.data);
      if (response.data && response.data.session) {
        setSessionData(response.data.session);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(
        "Error fetching session details {interviewPrep.jsx} :",
        error
      );
    }
  };

  // Generate Concept Eplaination
  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setIsLoading(true);
      setOpenLeanMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question }
      );

      console.log("Raw API Response:", response);

      // ✅ Step 1: Get the raw string (response.data is a string, not an object)
      let rawString = response?.data;
      console.log("Raw Explanation String:", rawString);

      if (typeof rawString !== "string") {
        console.warn("Explanation is not a string");
        return;
      }

      // ✅ Step 2: Clean triple backticks and trim
      const cleaned = rawString
        .replace(/```json|```/g, "") // remove ```json and ```
        .trim();

      // ✅ Step 3: Parse the cleaned string into JSON
      let parsed;
      try {
        parsed = JSON.parse(cleaned);
      } catch (err) {
        console.error("Failed to parse explanation JSON:", err);
        setErrorMsg("Invalid explanation format from AI response");
        return;
      }

      // ✅ Step 4: Use parsed.title and parsed.explanation
      const { title, explanation } = parsed;
      const formatted = explanation
      .replace(/\.  /g, ".\n\n") // Add paragraph breaks
      .replace(/\*\*/g, "**") // keep bold formatting
      .replace(/\* /g, "\n- ") // Convert bullets
      .replace(/```javascript/g, "\n```javascript\n") // Ensure line breaks before code
      .replace(/;(?=\s*})/g, ";\n") // break compressed JS code
      .replace(/([a-z])\*\*/g, "$1\n**") // separate new sections
      .replace(/\\n/g, "\n"); // unescape \n if needed
    
    setExplanation({
      title: title || "Explanation",
      explanation: formatted,
    });
    
    } catch (error) {
      console.error("Error in generateConceptExplanation:", error);
      setErrorMsg("Failed to generate explanation");
    } finally {
      setIsLoading(false);
    }
  };

  // Pin Question
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );
      console.log(response);

      if (response.data && response.data.question) {
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error toggling pin status:", error);
    }
  };

  // Add more questins to a session
  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);

      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          topicsToFocus: sessionData?.topicsFocus,
          experience: sessionData?.experience,
          numberOfQuestions: 10,
        }
      );

      console.log("AI Response for more questions:", aiResponse.data);

      let generatedQuestions = aiResponse.data;

      // ✅ Handle case where AI response is a JSON string wrapped in code blocks
      if (typeof generatedQuestions === "string") {
        try {
          const cleaned = generatedQuestions
            .replace(/```json/g, "") // removes starting ```json
            .replace(/```/g, "") // removes ending ```
            .trim(); // removes any leading/trailing spaces

          generatedQuestions = JSON.parse(cleaned);
        } catch (e) {
          console.error("Failed to parse questions JSON:", e);
          setError("Invalid response format from AI service");
          setIsLoading(false);
          return;
        }
      }

      const response = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        {
          sessionId,
          questions: generatedQuestions,
        }
      );

      if (response.data) {
        toast.success("Added more questions successfully");
        fetchSessionDetailsById();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      }
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
    return () => {};
  }, []);

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsFocus={sessionData?.topicsFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions?.length || "-"}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />

      <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
        <h2 className="text-lg font-semibold text-black">Interview Q & A</h2>

        <div className="grid grid-cols-12 gap-4 mt-10">
          <div
            className={`col-span-12 ${
              openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"
            }`}
          >
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => {
                return (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1,
                      damping: 15,
                    }}
                    layout
                    layoutId={`question-${data._id || index}`} // Helps framer track animations
                  >
                    <QuestionCard
                      question={data?.question}
                      answer={data?.answer}
                      onLearnMore={() =>
                        generateConceptExplanation(data.question)
                      }
                      isPinned={data?.isPinned}
                      onTogglePin={() => toggleQuestionPinStatus(data._id)}
                    />

                    {!isLoading &&
                      sessionData?.questions?.length == index + 1 && (
                        <div className="flex items-center justify-center mt-5">
                          <button
                            className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer "
                            onClick={uploadMoreQuestions}
                          >
                            Load More
                          </button>
                        </div>
                      )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <div>
          <Drawer
            isOpen={openLeanMoreDrawer}
            onClose={() => setOpenLeanMoreDrawer(false)}
            title={!isLoading ? explanation?.title || "Explanation" : ""}
          >
            {errorMsg && (
              <p className="flex gap-2 text-sm text-amber-600 font-medium">
                <LuCircleAlert className="mt-1" /> {errorMsg}
              </p>
            )}

            {isLoading && <SkeletonLoader />}

            {!isLoading && explanation && (
              <AIResponsePreview
                content={explanation?.explanation || "answer"}
              />
            )}
          </Drawer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
