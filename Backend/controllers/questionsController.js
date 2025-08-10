import Session from "../models/Session.js";
import Question from "../models/question.js";

// description: Add additional questions to an existing session
// route:       post /api/question/add
// access:      private

export const addQuestionToSession = async (req, res) => {
try {
    const { sessionId, questions } = req.body;
    if(!sessionId || !questions || !Array.isArray(questions) ) {
        return res.status(400).json({ message: "Invalid input data" });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
        return res.status(404).json({ message: "Session not found" });
    }

    // creating new questions
    const createQuestions = await Question.insertMany(
        questions.map(q => ({
            session: sessionId,
            question: q.question,
            answer: q.answer ,
        })) 
    ); 

    // Update session to include new question IDs

    session.questions.push(...createQuestions.map(q => q._id));
    await session.save();
    res.status(201).json({ createQuestions });

    
} catch (error) {
    res.status(500).json({ success: false, message: "error in addQuestionToSession, questionController " });
    
}

}

// description: pin or unpin a question
// route:       post /api/question/:id/pin
// access:      private
export const togglePinQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ success: false, message: "Question not found" });
        }

        question.isPinned = !question.isPinned; // toggle the pin status
        await question.save();
        
        res.status(200).json({ success: true, message: "Question pin status updated", question });
    } catch (error) {
        res.status(500).json({ success: false, message: "error in togglePinQuestion, questionController" });
        
    }
}

// description: update a note for a question
// route:       post /api/question/:id/note
// access:      private

export const updateQuestionNote = async (req, res) => {
    try {
        const { note } = req.body;


        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ success: false, message: "Question not found" });
        }

        question.note = note; // assuming 'note' is a field in the Question model
        await question.save();
        
        res.status(200).json({ success: true, message: "Question note updated", question });
        
    } catch (error) {
        res.status(500).json({ success: false, message: "error in updateQuestionNote, questionController" });
        
    }
}