import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/main.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Algebra = () => {
  const [user, setUser] = useState({ username: "", email: "" });
  const [topicsProgress, setTopicsProgress] = useState([]);
  const navigate = useNavigate();

  const topicsList = [
    { topic: "fractions", url: "/maths/algebra/fraction" },
    { topic: "decimals", url: "/maths/algebra/decimals" },
  ];

  useEffect(() => {
    const fetchSessionInfo = async () => {
      try {
        const response = await fetch("https://sanghamitra-learnworld.vercel.app/api/session-info");
        if (response.ok) {
          const data = await response.json();
          setUser({ username: data.username, email: data.email });
        } else {
          navigate("/user_login");
        }
      } catch (error) {
        console.error("Session fetch error:", error);
      }
    };

    fetchSessionInfo();
  }, [navigate]);

  useEffect(() => {
    const fetchTopicProgress = async () => {
      if (!user.email) return;

      try {
        const res = await fetch(
          `https://sanghamitra-learnworld.vercel.app/api/algebra_scores?email=${user.email}`
        );
        if (res.ok) {
          const data = await res.json();
          const progressMap = new Map();

          if (data?.[0]?.topics) {
            data[0].topics.forEach((topic) => {
              const correctAnswers = topic.questions.filter((q) => q.correct).length;
              const totalQuestions = topic.questions.length;
              const progress = (correctAnswers / totalQuestions) * 100;
              const starColor = topic.current_level === "mastered" ? "gold" : "grey";

              progressMap.set(topic.topic, {
                correctAnswers,
                totalQuestions,
                progress,
                starColor,
              });
            });
          }

          const topicData = topicsList.map(({ topic, url }) => {
            const stats = progressMap.get(topic) || {
              correctAnswers: 0,
              totalQuestions: 0,
              progress: 0,
              starColor: "grey",
            };
            return { topic, url, ...stats };
          });

          setTopicsProgress(topicData);
        }
      } catch (err) {
        console.error("Topic progress fetch error:", err);
      }
    };

    fetchTopicProgress();
  }, [user.email]);

  return (
    <main className="main">
      {/* Title Section */}
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Algebra</h1>
              </div>
            </div>
          </div>
        </div>

        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><a href="/">Home</a></li>
              <li><a href="/maths">Math</a></li>
              <li className="current">Algebra</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Topic Section */}
      <div className="container py-4">
        <div className="topic-section bg-white p-4 rounded shadow">
          {topicsProgress.map(({ topic, url, correctAnswers, totalQuestions, progress, starColor }, i) => (
            <div key={i} className="topic-item mb-3 border-bottom pb-3">
              <div className="course-item">
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center">
                    <button className="category" onClick={() => navigate(url)}>
                      {topic}
                    </button>
                    <i className={`bi bi-star ${starColor === "gold" ? "gold" : "grey"}`}></i>
                  </div>
                  <div className="progress mt-2">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-1">
                    <span>{correctAnswers} / {totalQuestions} Questions Correct</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {topicsProgress.length === 0 && (
            <p className="text-center text-muted">Loading topics or no progress yet.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Algebra;
