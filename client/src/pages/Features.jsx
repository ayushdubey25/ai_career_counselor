import {
  FaRobot,
  FaChartLine,
  FaBook,
  FaUserGraduate,
  FaLightbulb,
  FaHandsHelping,
} from "react-icons/fa";
import "../styles/Features.css";

const Features = () => {
  const features = [
    {
      icon: <FaRobot className="feature-icon" />,
      title: "AI-Powered Career Assessment",
      description:
        "Our advanced AI analyzes your skills, interests, and personality to recommend the perfect career paths tailored just for you.",
    },
    {
      icon: <FaChartLine className="feature-icon" />,
      title: "Personalized Career Reports",
      description:
        "Receive detailed reports highlighting your strengths, potential career matches, and growth opportunities in your chosen field.",
    },
    {
      icon: <FaBook className="feature-icon" />,
      title: "Curated Learning Resources",
      description:
        "Access personalized learning recommendations to develop the skills needed for your dream career.",
    },
    {
      icon: <FaUserGraduate className="feature-icon" />,
      title: "Education Pathway Guidance",
      description:
        "Get recommendations for degrees, certifications, and training programs that align with your career goals.",
    },
    {
      icon: <FaLightbulb className="feature-icon" />,
      title: "Skill Gap Analysis",
      description:
        "Identify which skills you need to develop to become competitive in your desired industry.",
    },
    {
      icon: <FaHandsHelping className="feature-icon" />,
      title: "Interview Preparation",
      description:
        "Practice with AI-generated interview questions specific to your target job roles and industries.",
    },
  ];

  return (
    <section className="features-section">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">Why Choose Our AI Career Counselor</h2>
          <p className="features-subtitle">
            We combine artificial intelligence with career expertise to provide
            personalized guidance that helps you navigate your professional
            journey.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon-container">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
