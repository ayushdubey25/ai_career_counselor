import "../styles/Home.css";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="home-container">
    <h1 className="home-title">AI Career Counselor</h1>
    <p className="home-subtitle">
      Discover your ideal career path with our AI-powered assessment and get
      personalized recommendations.
    </p>

    <div className="feature-cards">
      <div className="feature-card">
        <div className="feature-icon">💡</div>
        <h3 className="feature-title">Career Assessment</h3>
        <p className="feature-description">
          Take our smart assessment to discover careers that match your skills
          and interests.
        </p>
      </div>

      <div className="feature-card">
        <div className="feature-icon">📊</div>
        <h3 className="feature-title">Personalized Report</h3>
        <p className="feature-description">
          Get detailed insights about your strengths and recommended career
          paths.
        </p>
      </div>

      <div className="feature-card">
        <div className="feature-icon">📚</div>
        <h3 className="feature-title">Learning Resources</h3>
        <p className="feature-description">
          Access curated learning materials to develop skills for your
          recommended careers.
        </p>
      </div>
    </div>

    <Link to="/chat" className="cta-button">
      Get Started
    </Link>
  </div>
);

export default Home;
