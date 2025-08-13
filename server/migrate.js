// server/migrate.js
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to your database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sanghamitra_learning', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

const runMigration = async () => {
  console.log('🚀 Starting Migration Process...\n');
  
  try {
    // PHASE 1: Enhance existing Questions collection
    console.log('📝 PHASE 1: Enhancing Questions Collection...');
    
    // Step 1: Add new fields to existing questions
    const enhanceResult = await db.collection('questions').updateMany(
      {}, // all documents
      {
        $set: {
          // New categorization
          subject: "Math",
          topic: "Arithmetic", // we'll update this per operationType below
          
          // Enhanced metadata
          prerequisiteSkills: [],
          tags: ["finger-exercise"],
          isActive: true,
          
          // Enhanced error tracking structure
          errorTypes: {},
          
          // Timestamps
          createdAt: new Date(),
          updatedAt: new Date()
        }
      }
    );
    
    console.log(`✅ Enhanced ${enhanceResult.modifiedCount} questions with new fields`);
    
    // Step 2: Map operationType to better topic structure
    console.log('🗂️  Mapping operation types to topics...');
    
    const topicMappings = [
      { operation: "addition", topic: "Arithmetic", subtopic: "Addition" },
      { operation: "subtraction", topic: "Arithmetic", subtopic: "Subtraction" },
      { operation: "multiplication", topic: "Arithmetic", subtopic: "Multiplication" },
      { operation: "division", topic: "Arithmetic", subtopic: "Division" },
      { operation: "fractions", topic: "Fractions", subtopic: "Basic Fractions" },
      { operation: "decimals", topic: "Decimals", subtopic: "Basic Decimals" }
    ];
    
    for (const mapping of topicMappings) {
      const updateResult = await db.collection('questions').updateMany(
        { operationType: mapping.operation },
        {
          $set: {
            topic: mapping.topic,
            subtopic: mapping.subtopic
          }
        }
      );
      console.log(`✅ Updated ${updateResult.modifiedCount} ${mapping.operation} questions`);
    }
    
    // PHASE 2: Add prerequisite skills based on operation type
    console.log('\n🔗 PHASE 2: Adding Prerequisite Skills...');
    
    const prerequisiteMap = [
      { 
        operation: "addition", 
        prerequisites: ["number recognition", "counting", "number bonds"] 
      },
      { 
        operation: "subtraction", 
        prerequisites: ["addition", "number recognition", "place value"] 
      },
      { 
        operation: "multiplication", 
        prerequisites: ["addition", "skip counting", "times tables"] 
      },
      { 
        operation: "division", 
        prerequisites: ["multiplication", "subtraction", "number facts"] 
      },
      { 
        operation: "fractions", 
        prerequisites: ["division", "part-whole relationships", "equivalent parts"] 
      },
      { 
        operation: "decimals", 
        prerequisites: ["fractions", "place value", "decimal notation"] 
      }
    ];
    
    for (const prereq of prerequisiteMap) {
      const prereqResult = await db.collection('questions').updateMany(
        { operationType: prereq.operation },
        {
          $set: {
            prerequisiteSkills: prereq.prerequisites
          }
        }
      );
      console.log(`✅ Added prerequisites to ${prereqResult.modifiedCount} ${prereq.operation} questions`);
    }
    
    // PHASE 3: Structure existing commonErrors field
    console.log('\n🐛 PHASE 3: Structuring Error Types...');
    
    // Get all questions to restructure their commonErrors
    const questions = await db.collection('questions').find({}).toArray();
    
    for (const question of questions) {
      if (question.commonErrors && Array.isArray(question.commonErrors)) {
        const errorTypes = {};
        
        question.commonErrors.forEach((error, index) => {
          errorTypes[error] = {
            description: `Common error in ${question.operationType}`,
            frequency: index === 0 ? "high" : index === 1 ? "medium" : "low",
            remediation: `Practice ${question.operationType} basics`
          };
        });
        
        await db.collection('questions').updateOne(
          { _id: question._id },
          {
            $set: {
              errorTypes: errorTypes,
              updatedAt: new Date()
            }
          }
        );
      }
    }
    
    console.log(`✅ Structured error types for questions`);
    
    // PHASE 4: Create indexes for better performance
    console.log('\n🚀 PHASE 4: Creating Database Indexes...');
    
    await db.collection('questions').createIndex({ operationType: 1 });
    await db.collection('questions').createIndex({ topic: 1, subtopic: 1 });
    await db.collection('questions').createIndex({ difficultyLevel: 1 });
    await db.collection('questions').createIndex({ isActive: 1 });
    
    console.log('✅ Created performance indexes');
    
    // PHASE 5: Verify migration
    console.log('\n✅ PHASE 5: Verification...');
    
    const totalQuestions = await db.collection('questions').countDocuments();
    const questionsWithNewFields = await db.collection('questions').countDocuments({ 
      subject: { $exists: true },
      topic: { $exists: true },
      isActive: { $exists: true }
    });
    
    console.log(`📊 Migration Results:`);
    console.log(`   Total questions: ${totalQuestions}`);
    console.log(`   Questions with new fields: ${questionsWithNewFields}`);
    console.log(`   Migration success rate: ${(questionsWithNewFields/totalQuestions*100).toFixed(1)}%`);
    
    if (questionsWithNewFields === totalQuestions) {
      console.log('\n🎉 MIGRATION COMPLETED SUCCESSFULLY!');
      console.log('\n📋 Next Steps:');
      console.log('   1. Add the new model files to your project');
      console.log('   2. Update your finger exercise routes');
      console.log('   3. Create analytics endpoints');
      console.log('   4. Build the admin dashboard');
    } else {
      console.log('\n⚠️  Migration incomplete. Please check the logs above.');
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the migration
runMigration();