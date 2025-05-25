const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

class GeminiAIService {
  constructor() {
    this.model = genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  async generateAdaptiveQuestions(previousAnswers = []) {
    const prompt = `
    You are a career counselor AI. Based on these previous answers: ${JSON.stringify(previousAnswers)}
    
    Generate 3 follow-up questions that will help understand the user's career preferences better.
    Focus on: interests, skills, work environment, values, and goals.
    
    Return ONLY a valid JSON array with this exact format:
    [
      {
        "question": "What type of projects energize you most?",
        "type": "multiple-choice",
        "options": ["Technical challenges", "Creative projects", "People-focused work", "Data analysis"],
        "category": "interests"
      }
    ]
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Clean the response to extract JSON
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return this.getFallbackQuestions();
    } catch (error) {
      console.error('Gemini Question Generation Error:', error);
      return this.getFallbackQuestions();
    }
  }

  async generateCareerRecommendations(userProfile, assessmentAnswers) {
    const prompt = `
    You are an expert career counselor. Analyze this user profile and assessment:
    
    Profile: ${JSON.stringify(userProfile)}
    Assessment Answers: ${JSON.stringify(assessmentAnswers)}
    
    Provide 5 personalized career recommendations. Return ONLY valid JSON array with this format:
    [
      {
        "title": "Software Developer",
        "match": 95,
        "description": "Build applications and systems using programming languages",
        "requiredSkills": ["Programming", "Problem Solving", "Logic"],
        "averageSalary": "$70,000 - $120,000",
        "growth": "High",
        "reasoning": "Perfect match for your technical interests and logical thinking"
      }
    ]
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return this.getFallbackCareers();
    } catch (error) {
      console.error('Gemini Career Recommendation Error:', error);
      return this.getFallbackCareers();
    }
  }

  // Generate personalized learning paths
  async generateLearningPath(careerGoal, currentSkills, experience) {
    const prompt = `
    Create a personalized learning path for someone who wants to become a ${careerGoal}.
    
    Current skills: ${currentSkills.join(', ')}
    Experience level: ${experience}
    
    Return ONLY valid JSON with this format:
    {
      "skillGaps": ["JavaScript", "React", "Node.js"],
      "courses": [
        {
          "title": "JavaScript Fundamentals",
          "platform": "Coursera",
          "duration": "4 weeks",
          "priority": "High"
        }
      ],
      "timeline": "6-12 months",
      "projects": ["Build a portfolio website", "Create a web app"],
      "certifications": ["JavaScript Developer Certificate"],
      "roadmap": [
        {
          "phase": "Foundation",
          "duration": "2 months",
          "skills": ["HTML", "CSS", "JavaScript"]
        }
      ]
    }
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return this.getFallbackLearningPath();
    } catch (error) {
      console.error('Gemini Learning Path Error:', error);
      return this.getFallbackLearningPath();
    }
  }

  // Chat functionality for career guidance
  async chatWithCounselor(userMessage, conversationHistory = []) {
    const systemPrompt = `
    You are CareerBot, an expert AI career counselor. You help users with:
    - Career exploration and planning
    - Skill development advice
    - Industry insights
    - Job search strategies
    - Interview preparation
    
    Be supportive, knowledgeable, and provide actionable advice.
    Keep responses concise but helpful (under 300 words).
    
    Previous conversation: ${JSON.stringify(conversationHistory.slice(-5))}
    
    User message: ${userMessage}
    `;

    try {
      const result = await this.model.generateContent(systemPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini Chat Error:', error);
      return "I'm having trouble processing your request right now. Please try again later.";
    }
  }

  // Analyze resume and provide feedback
  async analyzeResume(resumeText) {
    const prompt = `
    Analyze this resume and provide detailed feedback:
    
    ${resumeText}
    
    Return ONLY valid JSON with this format:
    {
      "overallScore": 8,
      "strengths": ["Clear formatting", "Relevant experience"],
      "improvements": ["Add more quantified achievements", "Include technical skills section"],
      "missingSection": ["Projects", "Certifications"],
      "keywordSuggestions": ["JavaScript", "React", "Node.js"],
      "recommendations": [
        "Quantify your achievements with numbers",
        "Add a professional summary"
      ],
      "atsScore": 75,
      "industryAlignment": "Good match for tech roles"
    }
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return this.getFallbackResumeAnalysis();
    } catch (error) {
      console.error('Gemini Resume Analysis Error:', error);
      return this.getFallbackResumeAnalysis();
    }
  }

  // Interview preparation
  async generateInterviewQuestions(jobTitle, experience) {
    const prompt = `
    Generate interview questions for a ${jobTitle} position for someone with ${experience} experience.
    
    Return ONLY valid JSON array:
    [
      {
        "question": "Tell me about yourself",
        "type": "behavioral",
        "tips": "Focus on relevant experience and skills"
      }
    ]
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return this.getFallbackInterviewQuestions();
    } catch (error) {
      console.error('Gemini Interview Questions Error:', error);
      return this.getFallbackInterviewQuestions();
    }
  }

  // Salary negotiation advice
  async getSalaryAdvice(jobTitle, location, experience) {
    const prompt = `
    Provide salary negotiation advice for a ${jobTitle} position in ${location} with ${experience} experience.
    
    Include market rates, negotiation strategies, and tips.
    Keep response under 200 words.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini Salary Advice Error:', error);
      return "Research market rates for your role and location. Prepare to justify your value with specific achievements.";
    }
  }

  // Fallback methods
  getFallbackQuestions() {
    return [
      {
        question: "What motivates you most in work?",
        type: "multiple-choice",
        options: ["Problem solving", "Helping others", "Creative expression", "Leadership"],
        category: "values"
      },
      {
        question: "How do you prefer to work?",
        type: "multiple-choice",
        options: ["Independently", "In small teams", "In large groups", "Leading others"],
        category: "personality"
      }
    ];
  }

  getFallbackCareers() {
    return [
      {
        title: "Software Developer",
        match: 85,
        description: "Build applications and systems using programming languages",
        requiredSkills: ["Programming", "Problem Solving", "Logic"],
        averageSalary: "$70,000 - $120,000",
        growth: "High",
        reasoning: "Based on your technical interests and analytical skills"
      }
    ];
  }

  getFallbackLearningPath() {
    return {
      skillGaps: ["Programming fundamentals", "Web development"],
      courses: [
        {
          title: "Introduction to Programming",
          platform: "Coursera",
          duration: "6 weeks",
          priority: "High"
        }
      ],
      timeline: "6-12 months",
      projects: ["Build a personal website", "Create a simple web application"],
      certifications: ["Basic programming certificate"],
      roadmap: [
        {
          phase: "Foundation",
          duration: "2 months",
          skills: ["HTML", "CSS", "JavaScript basics"]
        }
      ]
    };
  }

  getFallbackResumeAnalysis() {
    return {
      overallScore: 7,
      strengths: ["Clear formatting", "Relevant experience"],
      improvements: ["Add more specific achievements", "Include technical skills"],
      missingSection: ["Projects"],
      keywordSuggestions: ["Industry-specific keywords"],
      recommendations: ["Quantify your accomplishments with numbers"],
      atsScore: 70,
      industryAlignment: "Good potential for improvement"
    };
  }

  getFallbackInterviewQuestions() {
    return [
      {
        question: "Tell me about yourself",
        type: "behavioral",
        tips: "Focus on relevant experience and career goals"
      },
      {
        question: "Why are you interested in this role?",
        type: "motivational",
        tips: "Connect your skills and interests to the job requirements"
      }
    ];
  }
}

module.exports = new GeminiAIService();
