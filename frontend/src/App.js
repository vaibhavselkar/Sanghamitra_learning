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
import StudentDashboard from './pages/Student/dashboard';
import TutorDashboard from './pages/Tutor/adminDashboard';

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
            <Route path="/english/rc" element={<RC />} />
            <Route path="/english/writing" element={<Writing />} />

            <Route path="/math/algebra" element={<Algebra />} />
            <Route path="/math/algebra/fraction" element={<Fraction />} />
            <Route path="/math/algebra/decimals" element={<Decimals />} />
          </Routes>
        </main>
        <Footer />
      </Router>
      </AuthProvider>
  );
}

export default App;
