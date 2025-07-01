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

const VocabularyGuide = () => {
  return (
     <>
    {/* Embedded CSS styles */}
    <style>{`
    body {
      font-family: 'Roboto', sans-serif;
      font-size: 14px;
    }

    .guide-content .section {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .guide-content h2,
    .guide-content h3,
    .guide-content h4 {
      margin-top: 20px;
      margin-bottom: 10px;
      font-weight: 500;
    }

    .guide-content p {
      margin-bottom: 10px;
      line-height: 1.6;
    }

    .icon {
      font-size: 1.2rem;
      margin-right: 5px;
      color: #007bff;
    }

    .icon-intro {
      color: #28a745;
    }

    .icon-def {
      color: #17a2b8;
    }

    .icon-imp {
      color: #ffc107;
    }

    .icon-strategy {
      color: #dc3545;
    }

    .icon-mistake {
      color: #fd7e14;
    }

    .icon-conclusion {
      color: #6f42c1;
    }
  `}</style>
    <main className="main">
      {/* Page Title */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Vocabulary Guide</h1>
                <p className="mb-0">
                  A vocabulary guide enhances communication and reading comprehension,
                  supports academic success, and aids professional development by helping
                  individuals express ideas clearly and understand texts better.
                </p>
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
              <li className="current">Vocabulary Guide</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Guide Content Section */}
      <section className="guide-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">

              {/* Introduction */}
              <div className="section" >
                <h2><i className="bi bi-book icon icon-intro"></i> Introduction to Vocabulary</h2>
                <h3><i className="bi bi-arrow-right-circle icon icon-intro"></i>1. Introduction</h3>
                <p>
                  I want to congratulate you on choosing a path to learn vocabulary. I know it’s often seen as boring, and most of the vocabulary we learn from traditional methods is easily forgotten, leading to what we call Low Value Activity (LVA). To transform this into a High Value Activity (HVA), we have put in the effort to create this platform for you. You can now play vocabulary games and have fun while learning. However, before diving in, it’s important to go through this document to learn effective strategies and avoid common mistakes. Most people who choose the traditional way might learn vocabulary to some extent but will not retain it for a lifetime. By following our approach, there is a high chance you will retain vocabulary and use those words in conversation. While this path requires effort, it promises to be fun and adventurous. So, without wasting time, let’s dive into the pool of vocabulary.                  {/* [Full text remains same as HTML] */}
                </p>
              </div>

              {/* Definition */}
              <div className="section" >
                <h3><i className="bi bi-arrow-right-circle icon icon-intro"></i> Definition</h3>
                <p>
                  Vocabulary consists of the words in a language that a person knows and uses. It includes the collection of words understood by someone and those they can use in communication. Vocabulary can be active—words we frequently use when speaking or writing—or passive—words we understand but do not use often. Vocabulary is a crucial aspect of language skills, significantly affecting communication effectiveness.                </p>
              </div>

              {/* Importance */}
              <div className="section" >
                <h3><i className="bi bi-arrow-right-circle icon icon-intro"></i> Importance</h3>
                <p>
                  Pay attention to the words surrounding an unfamiliar word in a sentence. They can provide hints about the meaning. Practice by reading sentences and guessing the meaning of unknown words before looking them up. Replace the unfamiliar word with a blank and try to deduce what word can fit without changing the sentence’s meaning. The unknown word’s meaning will likely be similar or opposite to the word you’ve guessed based on the sentence structure.
                </p>
              </div>

              {/* Strategies for Learning Vocabulary */}
              <div className="section" >
                <h3><i class="bi bi-arrow-right-circle icon icon-intro"></i>Strategies for Learning Vocabulary</h3>
                <h4><i class="bi bi-check-circle icon icon-intro"></i>Context Clues</h4>
                <p>Pay attention to the words surrounding an unfamiliar word in a sentence. They can provide hints about the meaning. Practice by reading sentences and guessing the meaning of unknown words before looking them up. Replace the unfamiliar word with a blank and try to deduce what word can fit without changing the sentence’s meaning. The unknown word’s meaning will likely be similar or opposite to the word you’ve guessed based on the sentence structure.</p>
                
                <h4><i class="bi bi-check-circle icon icon-intro"></i>Word Maps</h4>
                <p>Create visual diagrams that show the relationships between a word, its definition, synonyms, antonyms, and usage in sentences. Write the word in the center, with synonyms and antonyms branching out, to understand and remember the word better.</p>
                
                <h4><i class="bi bi-check-circle icon icon-intro"></i>Flashcards</h4>
                <p>Use cards with the word on one side and its definition and an example sentence on the other. Regularly review these cards to reinforce memory.</p>
                
                <h4><i class="bi bi-check-circle icon icon-intro"></i>Reading Regularly</h4>
                <p>Read a variety of materials such as books, articles, and blogs. This exposure to new words in different contexts makes them easier to understand and remember.</p>
                
                <h4><i class="bi bi-check-circle icon icon-intro"></i>Use New Words</h4>
                <p>Make a conscious effort to use newly learned words in your daily conversations and writing. This reinforces your memory and deepens your understanding.</p>
                
                <h4><i class="bi bi-check-circle icon icon-intro"></i>Learn Root Words</h4>
                <p>Many English words are derived from Greek and Latin roots. By learning common roots, prefixes, and suffixes, you can often figure out the meanings of unfamiliar words. For example, the prefix “mis-” means incorrectly or badly, so words like misaligned, mislead, and misspelled can be understood without much effort.</p>
                
                <h4><i class="bi bi-check-circle icon icon-intro"></i>Practice with Apps</h4>
                <p>Use vocabulary-building apps and websites for interactive learning experiences, quizzes, and games to make learning enjoyable.</p>
            </div>

              {/* Common Mistakes to Avoid */}
              <div className="section" >
              <h3><i class="bi bi-arrow-right-circle icon icon-intro"></i>Common Mistakes to Avoid</h3>
              <h4><i class="bi bi-x-circle icon icon-intro"></i>Learning in Isolation</h4>
              <p>Don't just memorize words and their definitions. Understand how they are used in sentences and different contexts. Learning words in isolation can lead to a superficial understanding and a higher chance of forgetting them.</p>
              
              <h4><i class="bi bi-x-circle icon icon-intro"></i>Overloading Yourself</h4>
              <p>Avoid trying to learn too many new words at once. Focus on a manageable number of words each day, reviewing and practicing them regularly.</p>
              
              <h4><i class="bi bi-x-circle icon icon-intro"></i>Ignoring Pronunciation</h4>
              <p>Don't overlook the pronunciation of new words. Mispronouncing words can lead to misunderstandings and lack of confidence in using them.</p>
              
              <h4><i class="bi bi-x-circle icon icon-intro"></i>Lack of Practice</h4>
              <p>Simply reading new words is not enough. Practice using them in sentences, conversations, and writing to reinforce your memory and understanding.</p>
              
              <h4><i class="bi bi-x-circle icon icon-intro"></i>Not Reviewing Regularly</h4>
              <p>Failing to review new words regularly can result in forgetting them. Make a habit of revisiting and practicing previously learned words.</p>
            </div>

              {/* Conclusion */}
              <div className="section" >
                <h3><i className="bi bi-check-circle icon icon-intro"></i> Conclusion</h3>
                <p>
                Building a strong vocabulary requires consistent effort, practice, and a variety of strategies. By understanding the importance of vocabulary, using effective learning methods, and avoiding common mistakes, you can enhance your communication skills, academic performance, and overall confidence. Keep exploring, learning, and applying new words to enrich your language and open up new opportunities in both personal and professional spheres.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
};

export default VocabularyGuide;
