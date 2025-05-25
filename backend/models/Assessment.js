const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  type: { type: String, enum: ['multiple-choice', 'rating', 'text'] },
  options: [String],
  category: { type: String, enum: ['interests', 'skills', 'values', 'personality'] }
});

const assessmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: [questionSchema],
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Assessment', assessmentSchema);
