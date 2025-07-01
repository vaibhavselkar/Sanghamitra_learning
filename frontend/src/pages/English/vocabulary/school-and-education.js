import React from 'react';
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

const SchoolVocabularyApp = () => {
  
  const vocabularyWords = [
    {
      word: "Classroom",
      phonetics: "/ˈklasˌro͞om/",
      partOfSpeech: "noun",
      definition: "a room in which a class of students is taught.",
      synonyms: ["lecture hall", "schoolroom", "learning space"],
      antonyms: ["playground", "field"],
      examples: [
        "The classroom was equipped with new computers.",
        "Students gathered in the classroom for the lesson.",
        "The teacher decorated the classroom with educational posters."
      ]
    },
    {
      word: "Homework",
      phonetics: "/ˈhōmˌwərk/",
      partOfSpeech: "noun",
      definition: "schoolwork that a student is required to do at home.",
      synonyms: ["assignment", "task", "project"],
      antonyms: ["classwork", "recreation"],
      examples: [
        "She spent the evening doing her homework.",
        "The teacher assigned math homework for the weekend.",
        "Students are expected to complete their homework on time."
      ]
    },
    {
      word: "Lecture",
      phonetics: "/ˈlek(t)SHər/",
      partOfSpeech: "noun",
      definition: "an educational talk to an audience, especially one of students in a university.",
      synonyms: ["speech", "address", "presentation"],
      antonyms: ["discussion", "seminar"],
      examples: [
        "The professor gave an engaging lecture on quantum physics.",
        "Students took notes during the lecture.",
        "She attended a lecture about medieval history."
      ]
    },
    {
      word: "Curriculum",
      phonetics: "/kəˈrikyələm/",
      partOfSpeech: "noun",
      definition: "the subjects comprising a course of study in a school or college.",
      synonyms: ["syllabus", "course", "program"],
      antonyms: ["extracurricular", "unscheduled"],
      examples: [
        "The curriculum includes math, science, and history.",
        "The new curriculum focuses on critical thinking and problem-solving skills.",
        "Teachers are developing a curriculum for the upcoming school year."
      ]
    },
    {
      word: "Graduation",
      phonetics: "/ˌɡrajəˈwāSH(ə)n/",
      partOfSpeech: "noun",
      definition: "the receiving or conferring of an academic degree or diploma.",
      synonyms: ["commencement", "convocation", "completion"],
      antonyms: ["matriculation", "enrollment"],
      examples: [
        "Her graduation ceremony was held in the university auditorium.",
        "After graduation, he plans to travel abroad.",
        "Graduation is a significant milestone in a student's life."
      ]
    },
    {
      word: "Examination",
      phonetics: "/iɡˌzaməˈnāSH(ə)n/",
      partOfSpeech: "noun",
      definition: "a formal test of a person's knowledge or proficiency in a subject or skill.",
      synonyms: ["test", "quiz", "assessment"],
      antonyms: ["review", "overview"],
      examples: [
        "Students prepared for the final examination.",
        "Examinations are held at the end of each semester.",
        "He passed the examination with flying colors."
      ]
    },
    {
      word: "Scholarship",
      phonetics: "/ˈskälərˌSHip/",
      partOfSpeech: "noun",
      definition: "a grant or payment made to support a student's education, awarded on the basis of academic or other achievement.",
      synonyms: ["grant", "fellowship", "bursary"],
      antonyms: ["tuition", "fee"],
      examples: [
        "She received a scholarship to attend the prestigious university.",
        "The scholarship covered all her tuition fees.",
        "Scholarships are often awarded based on academic merit."
      ]
    },
    {
      word: "Tuition",
      phonetics: "/t(y)o͞oˈiSH(ə)n/",
      partOfSpeech: "noun",
      definition: "the money paid for instruction at a school or university.",
      synonyms: ["fee", "education cost", "instruction fee"],
      antonyms: ["scholarship", "grant"],
      examples: [
        "The university's tuition has increased this year.",
        "Many students take out loans to pay for their tuition.",
        "Tuition fees vary depending on the course and institution."
      ]
    },
    {
      word: "Enrollment",
      phonetics: "/inˈrōlmənt/",
      partOfSpeech: "noun",
      definition: "the action of enrolling or being enrolled.",
      synonyms: ["registration", "admission", "entry"],
      antonyms: ["withdrawal", "disenrollment"],
      examples: [
        "Enrollment for the new semester begins next week.",
        "The school saw a significant increase in enrollment.",
        "Online enrollment is available for new students."
      ]
    },
    {
      word: "Discipline",
      phonetics: "/ˈdisəplən/",
      partOfSpeech: "noun",
      definition: "the practice of training people to obey rules or a code of behavior, using punishment to correct disobedience.",
      synonyms: ["control", "regulation", "training"],
      antonyms: ["negligence", "disorder"],
      examples: [
        "Discipline in the classroom is essential for effective learning.",
        "He maintains strict discipline in his study routine.",
        "The school's discipline policy includes detention for rule violations."
      ]
    },
    {
      word: "Syllabus",
      phonetics: "/ˈsiləbəs/",
      partOfSpeech: "noun",
      definition: "an outline of the subjects in a course of study or teaching.",
      synonyms: ["curriculum", "program", "course outline"],
      antonyms: ["unscheduled", "extracurricular"],
      examples: [
        "The professor handed out the syllabus on the first day of class.",
        "The syllabus includes all the topics that will be covered in the course.",
        "Students should review the syllabus to know the course requirements."
      ]
    },
    {
      word: "Extracurricular",
      phonetics: "/ˌekstrəkəˈrikyələr/",
      partOfSpeech: "adjective",
      definition: "(of an activity at a school or college) pursued in addition to the normal course of study.",
      synonyms: ["after-school", "nonacademic", "additional"],
      antonyms: ["curricular", "academic"],
      examples: [
        "She is involved in several extracurricular activities, including the debate team and the chess club.",
        "Extracurricular activities are important for a well-rounded education.",
        "The school offers a variety of extracurricular programs for students."
      ]
    },
    {
      word: "Faculty",
      phonetics: "/ˈfakəltē/",
      partOfSpeech: "noun",
      definition: "the teaching staff of a university or college, or of one of its departments or divisions, viewed as a body.",
      synonyms: ["staff", "professors", "teachers"],
      antonyms: ["students", "pupils"],
      examples: [
        "The faculty met to discuss the new curriculum.",
        "She is a member of the faculty at the university.",
        "The faculty includes distinguished scholars from various fields."
      ]
    },
    {
      word: "Pedagogy",
      phonetics: "/ˈpedəˌɡäjē/",
      partOfSpeech: "noun",
      definition: "the method and practice of teaching, especially as an academic subject or theoretical concept.",
      synonyms: ["teaching", "education", "instruction"],
      antonyms: ["ignorance", "misinstruction"],
      examples: [
        "She is studying pedagogy to become a better teacher.",
        "Modern pedagogy emphasizes student-centered learning.",
        "Effective pedagogy involves a variety of teaching techniques."
      ]
    },
    {
      word: "Accreditation",
      phonetics: "/əˌkredəˈtāSH(ə)n/",
      partOfSpeech: "noun",
      definition: "the process by which an institution is certified as meeting certain standards.",
      synonyms: ["certification", "endorsement", "approval"],
      antonyms: ["disapproval", "certification"],
      examples: [
        "The college received accreditation from a national educational organization.",
        "Accreditation ensures that the school meets high standards of education.",
        "Programs must go through a rigorous process to gain accreditation."
      ]
    },
    {
      word: "Matriculation",
      phonetics: "/məˌtrikyəˈlāSH(ə)n/",
      partOfSpeech: "noun",
      definition: "the action of matriculating at a college or university.",
      synonyms: ["enrollment", "admission", "entry"],
      antonyms: ["graduation", "completion"],
      examples: [
        "Matriculation into the university requires meeting all admission requirements.",
        "The matriculation ceremony welcomed new students to the college.",
        "She completed her matriculation in the fall semester."
      ]
    },
    {
      word: "Alumni",
      phonetics: "/əˈləmˌnī/",
      partOfSpeech: "noun",
      definition: "graduates or former students of a particular school, college, or university.",
      synonyms: ["graduates", "former students", "alums"],
      antonyms: ["undergraduates", "students"],
      examples: [
        "The university has a strong network of alumni.",
        "Many alumni return to campus for reunions.",
        "The alumni association organizes events and fundraisers."
      ]
    },
    {
      word: "Professor",
      phonetics: "/prəˈfesər/",
      partOfSpeech: "noun",
      definition: "a teacher of the highest rank in a college or university.",
      synonyms: ["lecturer", "academic", "educator"],
      antonyms: ["student", "pupil"],
      examples: [
        "The professor gave a fascinating lecture on ancient history.",
        "She was promoted to full professor last year.",
        "Professors often conduct research in addition to teaching."
      ]
    },
    {
      word: "Undergraduate",
      phonetics: "/ˌəndərˈɡrajo͞oət/",
      partOfSpeech: "noun",
      definition: "a university student who has not yet received a first degree.",
      synonyms: ["student", "undergrad", "learner"],
      antonyms: ["graduate", "alumni"],
      examples: [
        "Undergraduate students typically live on campus.",
        "He is an undergraduate studying engineering.",
        "The undergraduate program lasts for four years."
      ]
    },
    {
      word: "Postgraduate",
      phonetics: "/ˌpōstˈɡrajo͞oət/",
      partOfSpeech: "noun",
      definition: "a student who has completed a first degree and is studying for a further degree.",
      synonyms: ["graduate student", "master's student", "doctoral student"],
      antonyms: ["undergraduate", "freshman"],
      examples: [
        "She is a postgraduate studying for a master's degree.",
        "Postgraduate students often engage in research projects.",
        "The university offers various postgraduate programs."
      ]
    },
    {
      word: "Thesis",
      phonetics: "/ˈTHēsis/",
      partOfSpeech: "noun",
      definition: "a long piece of writing on a particular subject that is done to earn a degree at a university.",
      synonyms: ["dissertation", "paper", "treatise"],
      antonyms: ["essay", "short paper"],
      examples: [
        "She defended her thesis in front of a panel of professors.",
        "The thesis took several years to complete.",
        "Writing a thesis is a requirement for most postgraduate programs."
      ]
    },
    {
      word: "Dissertation",
      phonetics: "/ˌdisərˈtāSH(ə)n/",
      partOfSpeech: "noun",
      definition: "a long essay on a particular subject, especially one written for a university degree or diploma.",
      synonyms: ["thesis", "paper", "treatise"],
      antonyms: ["essay", "short paper"],
      examples: [
        "His dissertation focused on climate change policy.",
        "She spent months researching for her dissertation.",
        "The dissertation is a key part of the doctoral program."
      ]
    },
    {
      word: "Seminar",
      phonetics: "/ˈseməˌnär/",
      partOfSpeech: "noun",
      definition: "a class at a college or university in which a small group of students and a teacher discuss a subject.",
      synonyms: ["discussion", "workshop", "conference"],
      antonyms: ["lecture", "speech"],
      examples: [
        "The seminar was on advanced molecular biology.",
        "Students actively participated in the seminar discussion.",
        "Seminars provide an opportunity for in-depth exploration of topics."
      ]
    },
    {
      word: "Transcript",
      phonetics: "/ˈtran(t)skript/",
      partOfSpeech: "noun",
      definition: "an official record of a student's work, showing the courses taken and the grades achieved.",
      synonyms: ["record", "report", "grade report"],
      antonyms: ["incomplete", "unrecorded"],
      examples: [
        "She requested a transcript to send to prospective employers.",
        "The transcript showed all the courses he had taken.",
        "Universities often require a transcript for admission."
      ]
    },
    {
      word: "Valedictorian",
      phonetics: "/ˌvaləˌdikˈtôrēən/",
      partOfSpeech: "noun",
      definition: "the student who has the highest academic rank in a class and who usually delivers the graduation speech.",
      synonyms: ["top student", "head of class", "graduation speaker"],
      antonyms: ["underachiever", "average student"],
      examples: [
        "The valedictorian gave an inspiring speech at the graduation ceremony.",
        "She worked hard throughout high school to become the valedictorian.",
        "The valedictorian is recognized for their outstanding academic achievements."
      ]
    },
    {
      word: "Salutatorian",
      phonetics: "/səˌlo͞otəˈtôrēən/",
      partOfSpeech: "noun",
      definition: "the student with the second highest academic rank in a class who often delivers the welcoming address at the graduation ceremony.",
      synonyms: ["second top student", "honor student", "graduation speaker"],
      antonyms: ["underachiever", "average student"],
      examples: [
        "The salutatorian welcomed the guests at the graduation ceremony.",
        "He was proud to be named the salutatorian of his class.",
        "The salutatorian achieved high grades throughout high school."
      ]
    },
    {
      word: "Semester",
      phonetics: "/səˈmestər/",
      partOfSpeech: "noun",
      definition: "a half-year term in a school or college, typically lasting fifteen to eighteen weeks.",
      synonyms: ["term", "session", "academic period"],
      antonyms: ["quarter", "trimester"],
      examples: [
        "Each semester consists of various courses and exams.",
        "The fall semester starts in September.",
        "He completed his semester with excellent grades."
      ]
    }
];

  return (
    <div>
      <style jsx>{`
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .header {
          background-color: #4CAF50;
          color: white;
          text-align: center;
          padding: 1rem;
        }
        .container {
          width: 80%;
          margin: auto;
          overflow: hidden;
        }
        .category {
          background: #fff;
          padding: 20px;
          margin: 20px 0;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
        }
        .category h2 {
          margin: 0 0 10px;
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
          justify-content: space-around;
          width: 200px;
        }
        .buttons a {
          text-decoration: none;
          color: white;
          background: #333;
          padding: 10px 20px;
          border-radius: 5px;
          transition: background 0.3s;
          cursor: pointer;
          border: none;
        }
        .buttons a:hover {
          background: #4CAF50;
        }
        .levels {
          display: flex;
          justify-content: center;
          margin: 20px 0;
        }
        .levels a {
          text-decoration: none;
          color: white;
          background: #333;
          padding: 10px 20px;
          margin: 0 10px;
          border-radius: 5px;
          transition: background 0.3s;
          cursor: pointer;
          border: none;
        }
        .levels a:hover, .levels a.active {
          background: #4CAF50;
        }
        .word {
          background: #fff;
          padding: 20px;
          margin: 20px 0;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .word h2 {
          margin: 0 0 10px;
          color: #333;
        }
        .phonetics, .part-of-speech {
          color: #666;
          font-style: italic;
        }
        .definition, .synonyms, .antonyms, .examples {
          margin: 10px 0;
        }
        .synonyms span, .antonyms span {
          display: inline-block;
          background: #eee;
          padding: 5px;
          margin: 2px;
          border-radius: 3px;
        }
        .page-title {
          color: white;
          text-align: center;
          padding: 2rem 0;
        }
        .page-title h1 {
          margin: 0;
          font-size: 2.5rem;
        }
        .page-title p {
          margin: 0.5rem 0 0;
          font-size: 1.1rem;
        }
        
      `}</style>

      <div className="page-title">
        <div className="container">
          <h1>School and Education</h1>
          <p>Learn School and Education related vocabulary</p>
        </div>
      </div>

      <nav className="breadcrumbs">
          <div className="container">
          <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/english">English</Link></li>
              <li><Link to="/english/vocabulary">Vocabulary</Link></li>
              <li><Link to="/english/vocabulary/main-page">VocabularyEndeavour</Link></li>
              <li className="current">School and Education</li>
            </ol>
          </div>
        </nav>

      <div className="container">

        {vocabularyWords.map((wordData, index) => (
          <div key={index} className="word">
            <h2>{wordData.word}</h2>
            <div className="phonetics">{wordData.phonetics}</div>
            <div className="part-of-speech">{wordData.partOfSpeech}</div>
            <div className="definition">
              <strong>Definition:</strong> {wordData.definition}
            </div>
            <div className="synonyms">
              <strong>Synonyms:</strong> {wordData.synonyms.map((synonym, idx) => (
                <span key={idx}>{synonym}</span>
              ))}
            </div>
            <div className="antonyms">
              <strong>Antonyms:</strong> {wordData.antonyms.map((antonym, idx) => (
                <span key={idx}>{antonym}</span>
              ))}
            </div>
            <div className="examples">
              <strong>Examples:</strong>
              <ul>
                {wordData.examples.map((example, idx) => (
                  <li key={idx}>{example}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolVocabularyApp;