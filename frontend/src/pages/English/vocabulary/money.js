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

const MoneyVocabularyApp = () => {
  
  const vocabularyWords = [
    {
      word: "Wealth",
      phonetics: "/welTH/",
      partOfSpeech: "noun",
      definition: "an abundance of valuable possessions or money.",
      synonyms: ["affluence", "riches", "prosperity"],
      antonyms: ["poverty", "destitution"],
      examples: [
        "She is known for her great wealth and generosity.",
        "He amassed his wealth through hard work and determination.",
        "The country's wealth is unevenly distributed."
      ]
    },
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
      definition: "a legal agreement by which a bank or other creditor lends money at interest in exchange for taking title of the debtor's property.",
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
          <h1>Money</h1>
          <p>Learn money related vocabulary</p>
        </div>
      </div>

      <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/english">English</Link></li>
              <li><Link to="/english/vocabulary">Vocabulary</Link></li>
              <li><Link to="/english/vocabulary/main-page">VocabularyEndeavour</Link></li>
              <li className="current">Money</li>
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

export default MoneyVocabularyApp;