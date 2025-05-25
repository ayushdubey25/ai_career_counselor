const Assessment = require('../models/Assessment');
const User = require('../models/User');
const aiService = require('../services/aiService');

// Start AI-powered assessment
const startAssessment = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    
    const questions = await aiService.generateAdaptiveQuestions(user.profile);
    
    res.json({
      message: "Gemini AI-powered career assessment started",
      questions: questions,
      totalQuestions: questions.length,
      aiProvider: "Google Gemini"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit assessment and get AI recommendations
const submitAssessment = async (req, res) => {
  try {
    const { answers } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);

    const recommendations = await aiService.generateCareerRecommendations(
      user.profile, 
      answers
    );

    const learningPaths = await Promise.all(
      recommendations.slice(0, 3).map(async (career) => {
        const path = await aiService.generateLearningPath(
          career.title,
          user.profile.skills || [],
          user.profile.experience || 'beginner'
        );
        return { career: career.title, path };
      })
    );

    await User.findByIdAndUpdate(userId, {
      $push: {
        assessmentHistory: {
          answers,
          recommendations,
          learningPaths
        }
      }
    });

    res.json({
      message: "Gemini AI assessment completed successfully",
      recommendations,
      learningPaths,
      aiProvider: "Google Gemini"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// AI Chat endpoint
const chatWithCounselor = async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;
    
    const response = await aiService.chatWithCounselor(message, conversationHistory);
    
    res.json({
      response,
      timestamp: new Date(),
      aiProvider: "Google Gemini"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Resume analysis endpoint
const analyzeResume = async (req, res) => {
  try {
    const { resumeText } = req.body;
    
    const analysis = await aiService.analyzeResume(resumeText);
    
    res.json({
      analysis,
      message: "Resume analyzed with Gemini AI",
      aiProvider: "Google Gemini"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Interview preparation
const getInterviewPrep = async (req, res) => {
  try {
    const { jobTitle, experience } = req.body;
    
    const questions = await aiService.generateInterviewQuestions(jobTitle, experience);
    
    res.json({
      questions,
      jobTitle,
      experience,
      aiProvider: "Google Gemini"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Salary advice
const getSalaryAdvice = async (req, res) => {
  try {
    const { jobTitle, location, experience } = req.body;
    
    const advice = await aiService.getSalaryAdvice(jobTitle, location, experience);
    
    res.json({
      advice,
      jobTitle,
      location,
      experience,
      aiProvider: "Google Gemini"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  startAssessment, 
  submitAssessment, 
  chatWithCounselor, 
  analyzeResume,
  getInterviewPrep,
  getSalaryAdvice
};
