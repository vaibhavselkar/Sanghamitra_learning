import React, { useState } from 'react';
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

const PoliticsVocabularyApp = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);
  
  const vocabularyWords = [
    {
      word: "Currency",
      phonetics: "/ˈkərənsē/",
      partOfSpeech: "noun",
      definition: "a system of money in general use in a particular country.",
      synonyms: ["money", "cash", "legal tender"],
      antonyms: ["barter"],
      examples: [
        "The dollar is a widely recognized currency.",
        "The currency of Japan is the yen.",
        "Cryptocurrencies are becoming popular alternatives to traditional currency."
      ]
    },
    {
      word: "Investment",
      phonetics: "/inˈvestmənt/",
      partOfSpeech: "noun",
      definition: "the action or process of investing money for profit.",
      synonyms: ["funding", "speculation", "venture"],
      antonyms: ["divestment"],
      examples: [
        "She made a wise investment in real estate.",
        "The company's investment strategy paid off.",
        "Investment in education is crucial for economic growth."
      ]
    },
    {
      word: "Income",
      phonetics: "/ˈinˌkəm/",
      partOfSpeech: "noun",
      definition: "money received, especially on a regular basis, for work or through investments.",
      synonyms: ["earnings", "revenue", "salary"],
      antonyms: ["expenses"],
      examples: [
        "His monthly income is substantial.",
        "They have a high household income.",
        "Income from the business supports their lifestyle."
      ]
    },
    {
      word: "Debt",
      phonetics: "/det/",
      partOfSpeech: "noun",
      definition: "something, typically money, that is owed or due.",
      synonyms: ["liability", "obligation", "arrears"],
      antonyms: ["credit", "asset"],
      examples: [
        "He is struggling to pay off his debts.",
        "The company is in debt to several suppliers.",
        "They fell into debt after the financial crisis."
      ]
    },
    {
      word: "Bankruptcy",
      phonetics: "/ˈbaNGkˌrəptsē/",
      partOfSpeech: "noun",
      definition: "the state of being bankrupt.",
      synonyms: ["insolvency", "failure", "liquidation"],
      antonyms: ["solvency", "wealth"],
      examples: [
        "The company declared bankruptcy last year.",
        "They filed for bankruptcy due to mounting debts.",
        "Bankruptcy laws protect individuals from excessive debt."
      ]
    },
    {
      word: "Loan",
      phonetics: "/lōn/",
      partOfSpeech: "noun",
      definition: "a thing that is borrowed, especially a sum of money that is expected to be paid back with interest.",
      synonyms: ["advance", "credit", "mortgage"],
      antonyms: ["repayment"],
      examples: [
        "They took out a loan to buy a house.",
        "The bank approved her loan application.",
        "He is repaying his student loans."
      ]
    },
    {
      word: "Interest",
      phonetics: "/ˈint(ə)rəst/",
      partOfSpeech: "noun",
      definition: "money paid regularly at a particular rate for the use of money lent, or for delaying the repayment of a debt.",
      synonyms: ["return", "yield", "profit"],
      antonyms: ["principal"],
      examples: [
        "The interest rate on the loan is very high.",
        "She earns interest on her savings account.",
        "Interest payments are due at the end of each month."
      ]
    },
    {
      word: "Tax",
      phonetics: "/taks/",
      partOfSpeech: "noun",
      definition: "a compulsory contribution to state revenue, levied by the government on workers' income and business profits, or added to the cost of some goods, services, and transactions.",
      synonyms: ["levy", "tariff", "duty"],
      antonyms: ["subsidy"],
      examples: [
        "They were fined for not paying their taxes on time.",
        "The government increased the tax on cigarettes.",
        "He is claiming a tax refund for his overpayment."
      ]
    },
    {
      word: "Dividend",
      phonetics: "/ˈdivəˌdend/",
      partOfSpeech: "noun",
      definition: "a sum of money paid regularly (typically quarterly) by a company to its shareholders out of its profits (or reserves).",
      synonyms: ["distribution", "share", "profit"],
      antonyms: ["loss"],
      examples: [
        "Shareholders received a large dividend this year.",
        "The company announced an increase in its quarterly dividend.",
        "Dividends are usually paid out of the company's profits."
      ]
    },
    {
      word: "Credit",
      phonetics: "/ˈkrɛdɪt/",
      partOfSpeech: "noun",
      definition: "the ability of a customer to obtain goods or services before payment, based on the trust that payment will be made in the future.",
      synonyms: ["trust", "loan", "deferred payment"],
      antonyms: ["cash payment"],
      examples: [
        "He has a good credit rating.",
        "They bought the car on credit.",
        "Credit card debts can quickly accumulate."
      ]
    },
    {
      word: "Budget",
      phonetics: "/ˈbəjət/",
      partOfSpeech: "noun",
      definition: "an estimate of income and expenditure for a set period of time.",
      synonyms: ["financial plan", "spending plan", "allocation"],
      antonyms: ["overspend"],
      examples: [
        "They managed to balance the budget.",
        "We need to stick to our budget for this project.",
        "The company has a large marketing budget."
      ]
    },
    {
      word: "Capital",
      phonetics: "/ˈkapədl/",
      partOfSpeech: "noun",
      definition: "wealth in the form of money or other assets owned by a person or organization or available for a purpose such as starting a company or investing.",
      synonyms: ["wealth", "funds", "resources"],
      antonyms: ["debt"],
      examples: [
        "They raised capital to start the new business.",
        "Investing capital wisely is crucial for success.",
        "The company's capital is tied up in real estate."
      ]
    },
    {
      word: "Equity",
      phonetics: "/ˈekwədē/",
      partOfSpeech: "noun",
      definition: "the value of the shares issued by a company.",
      synonyms: ["ownership", "stock", "interest"],
      antonyms: ["debt"],
      examples: [
        "He owns a significant amount of equity in the company.",
        "The equity market has been very volatile.",
        "They sold some of their equity to raise funds."
      ]
    },
    {
      word: "Expense",
      phonetics: "/ikˈspens/",
      partOfSpeech: "noun",
      definition: "the cost required for something; the money spent on something.",
      synonyms: ["cost", "outlay", "expenditure"],
      antonyms: ["income"],
      examples: [
        "They cut back on unnecessary expenses.",
        "His living expenses are quite high.",
        "The company reimbursed her travel expenses."
      ]
    },
    {
      word: "Fraud",
      phonetics: "/frôd/",
      partOfSpeech: "noun",
      definition: "wrongful or criminal deception intended to result in financial or personal gain.",
      synonyms: ["deception", "scam", "cheating"],
      antonyms: ["honesty"],
      examples: [
        "They were arrested for committing fraud.",
        "The company was involved in a major fraud case.",
        "He was a victim of credit card fraud."
      ]
    },
    {
      word: "Revenue",
      phonetics: "/ˈrevəˌn(y)o͞o/",
      partOfSpeech: "noun",
      definition: "income, especially when of a company or organization and of a substantial nature.",
      synonyms: ["income", "earnings", "proceeds"],
      antonyms: ["expense"],
      examples: [
        "The company's revenue increased by 20% this year.",
        "Advertising revenue is a major source of income.",
        "The new product line boosted their revenue significantly."
      ]
    },
    {
      word: "Asset",
      phonetics: "/ˈaset/",
      partOfSpeech: "noun",
      definition: "a useful or valuable thing, person, or quality.",
      synonyms: ["property", "resource", "advantage"],
      antonyms: ["liability"],
      examples: [
        "Her intelligence is a great asset.",
        "The company's assets include property and equipment.",
        "They listed their house as an asset on the financial statement."
      ]
    },
    {
      word: "Stock",
      phonetics: "/stäk/",
      partOfSpeech: "noun",
      definition: "the goods or merchandise kept on the premises of a business or warehouse and available for sale or distribution.",
      synonyms: ["inventory", "goods", "merchandise"],
      antonyms: ["debt"],
      examples: [
        "The store has a large stock of electronics.",
        "They need to check the stock before placing an order.",
        "The company is running low on stock."
      ]
    },
    {
      word: "Profit",
      phonetics: "/ˈpräfit/",
      partOfSpeech: "noun",
      definition: "a financial gain, especially the difference between the amount earned and the amount spent in buying, operating, or producing something.",
      synonyms: ["gain", "earnings", "benefit"],
      antonyms: ["loss"],
      examples: [
        "The company made a huge profit last year.",
        "They are aiming to increase their profit margin.",
        "The profit from the sale was invested back into the business."
      ]
    },
    {
      word: "Liability",
      phonetics: "/ˌlīəˈbilədē/",
      partOfSpeech: "noun",
      definition: "a company's legal financial debts or obligations that arise during the course of business operations.",
      synonyms: ["debt", "obligation", "burden"],
      antonyms: ["asset"],
      examples: [
        "The company's liabilities include loans and accounts payable.",
        "They are working to reduce their financial liabilities.",
        "Liabilities must be listed on the balance sheet."
      ]
    },
    {
      word: "Mortgage",
      phonetics: "/ˈmôrɡij/",
      partOfSpeech: "noun",
      definition: "a legal agreement by which a bank or other creditor lends money at interest in exchange for taking title of the debtor's property, with the condition that the conveyance of title becomes void upon the payment of the debt.",
      synonyms: ["home loan", "loan", "debt"],
      antonyms: ["repayment"],
      examples: [
        "They took out a mortgage to buy a house.",
        "The mortgage payment is due at the end of the month.",
        "He is struggling to pay off his mortgage."
      ]
    },
    {
      word: "Subsidy",
      phonetics: "/ˈsəbsədē/",
      partOfSpeech: "noun",
      definition: "a sum of money granted by the government or a public body to assist an industry or business so that the price of a commodity or service may remain low or competitive.",
      synonyms: ["grant", "allowance", "aid"],
      antonyms: ["tax"],
      examples: [
        "The government provides a subsidy for renewable energy projects.",
        "The farmers receive a subsidy to help them compete in the global market.",
        "The subsidy helps keep the price of public transportation low."
      ]
    },
    {
      word: "Bond",
      phonetics: "/bänd/",
      partOfSpeech: "noun",
      definition: "a debt security, similar to an IOU, issued by a corporation or government.",
      synonyms: ["debt security", "IOU", "note"],
      antonyms: ["equity"],
      examples: [
        "The company issued bonds to raise capital.",
        "Government bonds are considered safe investments.",
        "The bond market is experiencing high volatility."
      ]
    },
    {
      word: "Barter",
      phonetics: "/ˈbärdər/",
      partOfSpeech: "verb",
      definition: "exchange (goods or services) for other goods or services without using money.",
      synonyms: ["trade", "exchange", "swap"],
      antonyms: ["currency"],
      examples: [
        "The villagers bartered goods with each other.",
        "They bartered their services for food and lodging.",
        "Barter was a common practice before the advent of money."
      ]
    }
];
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % vocabularyWords.length);
    setShowDefinition(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + vocabularyWords.length) % vocabularyWords.length);
    setShowDefinition(false);
  };

  const toggleDefinition = () => {
    setShowDefinition(!showDefinition);
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Enter') {
        toggleDefinition();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const currentWord = vocabularyWords[currentIndex];

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
          <h1>Politics</h1>
          <p>Learn politics related vocabulary</p>
        </div>
      </div>

      <nav className="breadcrumbs">
          <div className="container">
          <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/english">English</Link></li>
              <li><Link to="/english/vocabulary">Vocabulary</Link></li>
              <li><Link to="/english/vocabulary/main-page">VocabularyEndeavour</Link></li>
              <li className="current">Politics</li>
            </ol>
          </div>
        </nav>

      <style jsx>{`
        .slide-enter {
          opacity: 0;
          transform: translateX(50px);
        }
        .slide-enter-active {
          opacity: 1;
          transform: translateX(0);
          transition: opacity 0.3s, transform 0.3s;
        }
        .slide-exit {
          opacity: 1;
          transform: translateX(0);
        }
        .slide-exit-active {
          opacity: 0;
          transform: translateX(-50px);
          transition: opacity 0.3s, transform 0.3s;
        }
      `}</style>

      {/* Main Slideshow Container */}
      <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
        
        {/* Progress Bar */}
        <div style={{ backgroundColor: '#e5e7eb', borderRadius: '1rem', height: '0.5rem', marginBottom: '2rem' }}>
          <div 
            style={{ 
              backgroundColor: '#4CAF50', 
              height: '100%', 
              borderRadius: '1rem', 
              width: `${((currentIndex + 1) / vocabularyWords.length) * 100}%`,
              transition: 'width 0.3s ease'
            }}
          />
        </div>

        {/* Progress Counter */}
        <div style={{ textAlign: 'center', marginBottom: '2rem', color: '#6b7280' }}>
          <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>
            {currentIndex + 1} of {vocabularyWords.length}
          </span>
        </div>

        {/* Main Card */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '1rem', 
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          padding: '3rem',
          minHeight: '500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}>
          
          {/* Word Front Side */}
          {!showDefinition ? (
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ 
                fontSize: '3rem', 
                fontWeight: 'bold', 
                color: '#1f2937', 
                margin: '0 0 1rem 0',
                letterSpacing: '-0.025em'
              }}>
                {currentWord.word}
              </h2>
              
              <div style={{ 
                fontSize: '1.5rem', 
                color: '#6b7280', 
                fontStyle: 'italic', 
                marginBottom: '1rem' 
              }}>
                {currentWord.phonetics}
              </div>
              
              <div style={{ 
                fontSize: '1.25rem', 
                color: '#4CAF50', 
                fontWeight: '600', 
                marginBottom: '2rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {currentWord.partOfSpeech}
              </div>
              
              <button 
                onClick={toggleDefinition}
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.75rem',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
              >
                Show Definition
              </button>

              <div style={{ 
                marginTop: '2rem', 
                fontSize: '0.875rem', 
                color: '#9ca3af',
                fontStyle: 'italic'
              }}>
                Click "Show Definition" or press Enter to reveal meaning
              </div>
            </div>
          ) : (
            /* Word Back Side - Full Information */
            <div>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold', 
                  color: '#1f2937', 
                  margin: '0 0 0.5rem 0'
                }}>
                  {currentWord.word}
                </h2>
                
                <div style={{ 
                  fontSize: '1.25rem', 
                  color: '#6b7280', 
                  fontStyle: 'italic' 
                }}>
                  {currentWord.phonetics} - {currentWord.partOfSpeech}
                </div>
              </div>

              {/* Definition */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '700', 
                  color: '#374151', 
                  marginBottom: '0.75rem' 
                }}>
                  Definition
                </h3>
                <p style={{ 
                  fontSize: '1.1rem', 
                  lineHeight: '1.6', 
                  color: '#1f2937',
                  margin: 0
                }}>
                  {currentWord.definition}
                </p>
              </div>

              {/* Synonyms & Antonyms */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '1.5rem', 
                marginBottom: '1.5rem' 
              }}>
                <div>
                  <h4 style={{ 
                    fontSize: '1rem', 
                    fontWeight: '600', 
                    color: '#059669', 
                    marginBottom: '0.75rem' 
                  }}>
                    Synonyms
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {currentWord.synonyms.map((synonym, idx) => (
                      <span key={idx} style={{
                        backgroundColor: '#dcfce7',
                        color: '#065f46',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}>
                        {synonym}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ 
                    fontSize: '1rem', 
                    fontWeight: '600', 
                    color: '#dc2626', 
                    marginBottom: '0.75rem' 
                  }}>
                    Antonyms
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {currentWord.antonyms.map((antonym, idx) => (
                      <span key={idx} style={{
                        backgroundColor: '#fecaca',
                        color: '#991b1b',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}>
                        {antonym}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Examples */}
              <div>
                <h4 style={{ 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  color: '#374151', 
                  marginBottom: '0.75rem' 
                }}>
                  Examples
                </h4>
                <ul style={{ 
                  margin: 0, 
                  paddingLeft: '1.25rem',
                  color: '#4b5563'
                }}>
                  {currentWord.examples.map((example, idx) => (
                    <li key={idx} style={{ 
                      marginBottom: '0.5rem',
                      lineHeight: '1.5'
                    }}>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button 
                  onClick={toggleDefinition}
                  style={{
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.75rem',
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
                >
                  Hide Definition
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Controls */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginTop: '2rem',
          padding: '0 1rem'
        }}>
          <button 
            onClick={prevSlide}
            disabled={currentIndex === 0}
            style={{
              backgroundColor: currentIndex === 0 ? '#d1d5db' : '#374151',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '3.5rem',
              height: '3.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease'
            }}
          >
            ←
          </button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {vocabularyWords.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setShowDefinition(false);
                }}
                style={{
                  width: '0.75rem',
                  height: '0.75rem',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: idx === currentIndex ? '#4CAF50' : '#d1d5db',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            disabled={currentIndex === vocabularyWords.length - 1}
            style={{
              backgroundColor: currentIndex === vocabularyWords.length - 1 ? '#d1d5db' : '#374151',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '3.5rem',
              height: '3.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              cursor: currentIndex === vocabularyWords.length - 1 ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease'
            }}
          >
            →
          </button>
        </div>

        {/* Keyboard Instructions */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem', 
          color: '#9ca3af',
          fontSize: '0.875rem'
        }}>
          Use arrow keys ← → to navigate, Enter to toggle definition, or click the buttons
        </div>

      </div>
    </div>

  );
};

export default PoliticsVocabularyApp;
