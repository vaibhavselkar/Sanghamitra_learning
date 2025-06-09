// src/components/CourseItem.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CourseItem = ({ title, image, description, link }) => {
  const [likes, setLikes] = useState(0);

  return (
    <div className="col-lg-6 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
      <div className="course-item">
        <img src={image} className="img-fluid" alt={title} />
        <div className="course-content">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Link to={link} className="btn btn-primary">{title}</Link>
          </div>
          <p className="description">{description}</p>
          <div className="trainer d-flex justify-content-between align-items-center">
            <div className="trainer-rank d-flex align-items-center">
              <button 
                className="btn btn-link p-0"
                onClick={() => setLikes(likes + 1)}
              >
                <i className="bi bi-heart heart-icon"></i>&nbsp;{likes}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;