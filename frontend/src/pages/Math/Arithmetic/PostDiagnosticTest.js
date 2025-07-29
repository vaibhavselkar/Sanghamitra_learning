// src/pages/Math/Arithmetic/PostDiagnosticTest.js
import React from 'react';
import MathDiagnosticTest from '../../../components/MathDiagnosticTest';

const PostDiagnosticTest = () => {
  return (
    <MathDiagnosticTest
      diagnosticType="postArithmetic"
      testPhase="post"
      topicArea="arithmetic"
      displayName="Post-Arithmetic Diagnostic Test"
      description="Measure your improvement in arithmetic skills after completing lessons"
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
        { text: 'Post-Diagnostic Test' }
      ]}
      redirectPath="/math/arithmetic/post-diagnostic-results"
    />
  );
};

export default PostDiagnosticTest;
