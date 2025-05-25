const express = require('express');
const { 
  startAssessment, 
  submitAssessment, 
  chatWithCounselor, 
  analyzeResume,
  getInterviewPrep,
  getSalaryAdvice
} = require('../controllers/assessmentController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/start', auth, startAssessment);
router.post('/submit', auth, submitAssessment);
router.post('/chat', auth, chatWithCounselor);
router.post('/analyze-resume', auth, analyzeResume);
router.post('/interview-prep', auth, getInterviewPrep);
router.post('/salary-advice', auth, getSalaryAdvice);

module.exports = router;
