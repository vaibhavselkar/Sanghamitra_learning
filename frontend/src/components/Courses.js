// src/components/Courses.js
import React from "react";
import { Link } from "react-router-dom";
import EnglishImage from "../assets/img/english.index.png";
import mathsImage from "../assets/img/maths.index.png";
import programmingImage from "../assets/img/Programming.png";

const courses = [
  {
    title: "English",
    image: EnglishImage,
    description: "Welcome to our English Learning Hub, where language mastery meets personalized learning. Whether you're a beginner or an advanced learner, our comprehensive resources and interactive lessons are designed to enhance your English proficiency. Join our community of learners and embark on an enriching journey towards fluency and confidence in English communication.",
    link: "/english",
  },
  {
    title: "Mathematics",
    image: mathsImage,
    description: "Welcome to our Mathematics Hub, where numbers come alive and logic reigns supreme. Dive into our comprehensive resources and interactive lessons designed to demystify mathematical concepts. Whether you're tackling algebra or mastering calculus, discover the beauty and power of mathematics with us.",
    link: "/math",
  },
  {
    title: "Programming",
    image: programmingImage,
    description: "Welcome to our Programming Hub, where numbers come alive and logic reigns supreme. Dive into our comprehensive resources and interactive lessons designed to demystify mathematical concepts. Whether you're tackling algebra or mastering calculus, discover the beauty and power of mathematics with us.",
    link: "/programming",
  }
];

const Courses = () => {
  return (
    <section id="courses" className="courses section">
      <div className="container section-title" data-aos="fade-up">
        <h2 style={{ animation: "none", caretColor: "transparent" }}>Courses</h2>
        <p style={{ animation: "none", caretColor: "transparent" }}>Popular Courses</p>
      </div>
      <div className="container">
        <div className="row">
          {courses.map((course, index) => (
            <div className="col-lg-6" key={index} data-aos="zoom-in">
              <div className="course-item">
                <img src={course.image} className="img-fluid" alt={course.title} />
                <div style={{ animation: "none", caretColor: "transparent" }} className="course-content">
                  <Link to={course.link}>
                    <button className="category">{course.title}</button>
                  </Link>
                  <p className="description">{course.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
