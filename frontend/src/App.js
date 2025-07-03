// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Courses from "./components/Courses";
import English from "./pages/English/English";
import Vocabulary from "./pages/English/vocabulary/vocabulary";
import RC from "./pages/English/RC/RC";
import Writing from "./pages/English/writing/writing";
import HomeAbout from "./components/HomeAbout";
import Math from "./pages/Math/Math";
import Algebra from "./pages/Math/Algebra/Algebra";
import Fraction from "./pages/Math/Algebra/Fraction";
import Decimals from "./pages/Math/Algebra/Decimals";
import LoginPage from './pages/loginPage';
import Register from './pages/register';
import VocabularyDiagnosticTest from './pages/English/vocabulary/VocabularyDiagnosticTest';
import Programming from './pages/Programming/programming';
import VocabularyGuide from './pages/English/vocabulary/vocabularyGuide';
import VocabularyEndeavourMain from "./pages/English/vocabulary/vocabularyEndeavourMain";
import VocabularyEndeavourMoney from "./pages/English/vocabulary/money";
import VocabularyEndeavourPolitics from "./pages/English/vocabulary/politics";
import VocabularyEndeavourSchool from "./pages/English/vocabulary/school-and-education";
import VocabularyEndeavourTechnology from "./pages/English/vocabulary/technology";
import StudentDashboard from './pages/Student/dashboard';
import TutorDashboard from './pages/Tutor/adminDashboard';
import CTFoundation1 from './pages/Programming/CT_foundation_1';
import CTFoundation2 from './pages/Programming/CT_foundation_2';
import CTFoundation3 from './pages/Programming/CT_foundation_3';
import CTFoundation4 from "./pages/Programming/CT_Foundation_4";
import PythonBasics from './pages/Programming/Python_Basics';
import PythonConditionals from "./pages/Programming/Python_Conditionals";
import PythonLoops from "./pages/Programming/Python_Loop";
import PythonFunctions from "./pages/Programming/Python_Functions";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<><Hero /><Courses /><HomeAbout/></>} />
            <Route path="/english" element={<English />} />
            <Route path="/math" element={<><Math /></>} />
            <Route path="/programming" element={<><Programming /></>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/tutor/dashboard" element={<TutorDashboard />} />
            <Route path="/english/vocabulary" element={<Vocabulary />} />
            <Route path="/english/vocabulary/vocabulary-diagnostic-test" element={<VocabularyDiagnosticTest />} />
            <Route path="/english/vocabulary/guide" element={<VocabularyGuide />} />
            <Route path="/english/vocabulary/main-page" element={<VocabularyEndeavourMain />} />
            <Route path="/english/vocabulary/money" element={<VocabularyEndeavourMoney />} />
            <Route path="/english/vocabulary/politics" element={<VocabularyEndeavourPolitics />} />
            <Route path="/english/vocabulary/school-and-education" element={<VocabularyEndeavourSchool />} />
            <Route path="/english/vocabulary/technology" element={<VocabularyEndeavourTechnology />} />
            <Route path="/english/rc" element={<RC />} />
            <Route path="/english/writing" element={<Writing />} />

            <Route path="/math/algebra" element={<Algebra />} />
            <Route path="/math/algebra/fraction" element={<Fraction />} />
            <Route path="/math/algebra/decimals" element={<Decimals />} />

            <Route path="/programming/ct_foundation_1" element={<CTFoundation1 />} />
            <Route path="/programming/ct-foundation-1" element={<CTFoundation2 />} />
            <Route path="/programming/ct-foundation-2" element={<CTFoundation3 />} />
            <Route path="/programming/ct-foundation-3" element={<CTFoundation4/>} />
            <Route path="/programming/python-basics" element={<PythonBasics />} />
            <Route path="/programming/python-conditionals" element={<PythonConditionals />} />
            <Route path="/programming/python-loops" element={<PythonLoops/>} />
            <Route path="/programming/python-functions" element={<PythonFunctions />} />

          </Routes>
        </main>
        <Footer />
      </Router>
      </AuthProvider>
  );
}

export default App;
