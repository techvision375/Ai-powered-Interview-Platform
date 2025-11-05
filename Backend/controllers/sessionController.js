import Session from "../models/Session.js";
import Question from "../models/question.js";



export const createSession = async (req, res) => {
    try {
      const { role, experience, topicsFocus, description, questions } = req.body;
      const userId = req.user._id;
  
      if (!Array.isArray(questions)) {
        return res.status(400).json({ success: false, message: "Invalid questions format" });
      }
  
      const session = await Session.create({
        user: userId,
        role,
        experience,
        topicsFocus,
        description,
      });
  
      const questionDocs = await Promise.all(
        questions.map(async (q) => {
          const questionDoc = await Question.create({
            session: session._id,
            question: q.question,
            answer: q.answer,
          });
          return questionDoc._id;
        })
      );
  
      session.questions = questionDocs;
      await session.save();
  
      res.status(201).json({ success: true, session });
    } catch (error) {
      console.error("Error in createSession:", error); // <-- ADD THIS
      res.status(500).json({ success: false, message: "error into createSessionRoute" });
    }
  };
  

export const getMySession = async (req, res) => {
    try {
        const sessions = await Session.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .populate('questions', 'question answer');
        res.status(200).json({ sessions });


    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id).
            populate({
                path: 'questions',
                options: { sort: { isPinned: -1, createdAt: 1 } }
            })

            .exec()
        if (!session) {
            return res.status(404).json({ success: false, message: "Session not found" });
        }
        res.status(200).json({ success: true, session });


    } catch (error) {
        res.status(500).json({ success: false, message: "error in getSessionById" });

  }

}

export const deleteSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) {
            return res.status(404).json({ success: false, message: "Session not found" });
        }

        // Check if the logged-in user owns this session
        if (session.user.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Not authorized to delete this session" });
        }
        // First , delete all questions linked to this session
        await Question.deleteMany({ session: session._id });

        // then , i am deleting the session 
        await session.deleteOne();
        
        res.status(200).json({  message: "Session and associated questions deleted successfully" });





    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};



