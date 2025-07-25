import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/main.css";
import '../../../assets/css/main.css';
import '../../../assets/css/breadcrumb.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'aos/dist/aos.css';
import '../../../assets/css/main.css';
import '../../../assets/css/breadcrumb.css';


import 'aos/dist/aos.css';


import 'glightbox/dist/css/glightbox.min.css';
const VocabularyEndeavourMain = () => {
  const categories = [
    { icon: "fas fa-dollar-sign", title: "Money", slug: "money" },
    { icon: "fas fa-balance-scale", title: "Politics", slug: "politics" },
    { icon: "fas fa-school", title: "School and Education", slug: "school-and-education" },
    { icon: "fas fa-laptop-code", title: "Technology", slug: "technology" },
    { icon: "fas fa-heartbeat", title: "Health and Medicine", slug: "health-and-medicine" },
    { icon: "fas fa-leaf", title: "Environment", slug: "environment" },
    { icon: "fas fa-football-ball", title: "Sports", slug: "sports" },
    { icon: "fas fa-history", title: "History", slug: "history" },
    { icon: "fas fa-flask", title: "Science", slug: "science" },
    { icon: "fas fa-book", title: "Literature", slug: "literature" },
  ];

  return (
    <>
      <style>{`
        .category {
          background: #fff;
          padding: 20px;
          margin: 20px 0;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
        }

        .category h2 {
          margin: 0;
          color: #333;
          flex-grow: 1;
        }

        .category i {
          font-size: 2rem;
          margin-right: 20px;
          color: #4CAF50;
        }

        .buttons {
          display: flex;
          gap: 10px;
        }

        .buttons a {
          text-decoration: none;
          color: white;
          background: #333;
          padding: 10px 20px;
          border-radius: 5px;
          transition: background 0.3s;
        }

        .buttons a:hover {
          background: #4CAF50;
        }
      `}</style>

      <main className="main">
        {/* Page Title */}
        <div className="page-title">
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1>Vocabulary Endeavour</h1>
                  <p className="mb-0">Select a category to start learning and assessment</p>
                </div>
              </div>
            </div>
          </div>
          <nav className="breadcrumbs">
            <div className="container">
              <ol>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/english">English</Link></li>
                <li><Link to="/english/vocabulary">Vocabulary</Link></li>
                <li className="current">Vocabulary Endeavour</li>
              </ol>
            </div>
          </nav>
        </div>

        {/* Category Cards */}
        <div className="container">
          {categories.map((cat, index) => (
            <div className="category" key={index}>
              <i className={cat.icon}></i>
              <h2>{cat.title}</h2>
              <div className="buttons">
                <Link to={`/english/vocabulary/${cat.slug}`}>Learn</Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default VocabularyEndeavourMain;
