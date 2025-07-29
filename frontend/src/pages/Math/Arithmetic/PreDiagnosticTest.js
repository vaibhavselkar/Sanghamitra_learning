// src/pages/Math/Arithmetic/PreDiagnosticTest.js
import React from 'react';
import MathDiagnosticTest from '../../../components/MathDiagnosticTest';

const PreDiagnosticTest = () => {
  return (
    <MathDiagnosticTest
      diagnosticType="preArithmetic"
      testPhase="pre"
      topicArea="arithmetic"
      displayName="Pre-Arithmetic Diagnostic Test"
      description="Assess your current arithmetic skills before starting lessons"
      topics={[
        'addition',
        'subtraction',
        'multiplication',
        'division',
        'dealing-with-negative-sign',
        'fractions',
        'decimals',
        'ratio-proportion-percentage'
      ]}
      difficulties={['easy', 'medium', 'hard']}
      questionsPerTopic={3}
      breadcrumbs={[
        { text: 'Home', url: '/' },
        { text: 'Math', url: '/math' },
        { text: 'Arithmetic', url: '/math/arithmetic' },
        { text: 'Pre-Diagnostic Test' }
      ]}
        redirectPath={`/DiagnosticAnalytics?topicArea=arithmetic&testType=arithmeticPre`}
    />
  );
};

export default PreDiagnosticTest;
