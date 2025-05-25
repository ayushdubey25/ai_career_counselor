const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requiredSkills: [String],
  averageSalary: {
    min: Number,
    max: Number,
    currency: { type: String, default: 'INR' }
  },
  growthRate: Number,
  education: [String],
  industries: [String],
  workEnvironment: String,
  careerPath: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Career', careerSchema);
