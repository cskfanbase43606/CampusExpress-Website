import React from 'react';
import './About.css';
import image5 from '../assets/m-3.jpeg';
import image4 from '../assets/m-5.1.jpeg';
import image3 from '../assets/m-6.jpeg';
function About() {
  return (
    <div className="about-container">
      {/* Mission Section */}
      <div className="about-section mission">
        <div className="about-text">
          <h2>Our Story</h2>
          <p>
          Founded in 2020, Campus Express began as a small startup focused on serving just two colleges. With a passion for solving logistics challenges, we quickly expanded, driven by our commitment to excellence and innovation. Today, we proudly serve over 200 colleges, helping thousands of students and institutions navigate their logistics needs with ease and efficiency. From our humble beginnings to becoming a trusted name in the industry, our journey is a testament to our dedication to growth, quality, and customer satisfaction.
          </p>
        </div>
      </div>

      {/* Vision Section */}
      <div className="about-section vision">
        <div className="about-text">
          <h2>Mission</h2>
          <p>
          At Campus Express, our mission is to make logistics and moving services better and easier through innovation and top-quality service. We focus on simplifying transportation and supply chain management for colleges, businesses, and students. By using the latest technology and thinking globally, we aim to set new standards in the industry. We strive to provide a smooth and superior experience for all our clients, ensuring they are completely satisfied.
          </p>
        </div>
      </div>

      {/* Value Section */}
      <div className="about-section value">
        <div className="about-text">
          <h2>Value</h2>
          <p>
          With four years of expertise, Campus Express is a leader in solving logistics challenges for HEIs, businesses, and universities. We've successfully served over 30,000 students from 200+ colleges, offering both domestic and international services. Our focus on excellence and personalized solutions helps us build strong, lasting client relationships.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;