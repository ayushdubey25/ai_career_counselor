import { useEffect } from "react";
import "../styles/CloudAnimation.css";

const CloudAnimation = () => {
  useEffect(() => {
    const createParticles = () => {
      const cloud = document.querySelector(".cloud");
      if (!cloud) return;

      for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.classList.add("cloud-particle");
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = `${Math.random() * 10 + 5}px`;
        particle.style.height = particle.style.width;
        particle.style.animationDelay = `${Math.random() * 0.5}s`;

        cloud.appendChild(particle);

        setTimeout(() => {
          particle.style.opacity = "1";
          particle.style.transform = `translate(${
            Math.random() * 200 - 100
          }px, ${Math.random() * 200 - 100}px) scale(0)`;
          particle.style.transition = `all ${Math.random() * 1 + 1}s ease-out`;
        }, 10);
      }
    };

    createParticles();
  }, []);

  return (
    <div className="cloud-container">
      <div className="cloud"></div>
    </div>
  );
};

export default CloudAnimation;
