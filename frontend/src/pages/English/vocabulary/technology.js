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

const TechnologyVocabularyApp = () => {
  
  const vocabularyWords = [
    {
      word: "Algorithm",
      phonetics: "/ˈalɡəˌriT͟Həm/",
      partOfSpeech: "noun",
      definition: "a process or set of rules to be followed in calculations or other problem-solving operations, especially by a computer.",
      synonyms: ["procedure", "formula", "method"],
      antonyms: ["randomness", "improvisation"],
      examples: [
        "The search engine uses a complex algorithm to rank websites.",
        "Algorithms are essential for data processing and analysis.",
        "She developed an algorithm to optimize the company's logistics."
      ]
    },
    {
      word: "Bandwidth",
      phonetics: "/ˈbandˌwidTH/",
      partOfSpeech: "noun",
      definition: "the range of frequencies within a given band, in particular that used for transmitting a signal.",
      synonyms: ["capacity", "range", "frequency"],
      antonyms: ["narrowband", "limitation"],
      examples: [
        "The network's bandwidth determines how much data can be transmitted at once.",
        "High bandwidth is crucial for streaming video content.",
        "Bandwidth limitations can affect internet speed."
      ]
    },
    {
      word: "Cache",
      phonetics: "/kaSH/",
      partOfSpeech: "noun",
      definition: "a hardware or software component that stores data so future requests for that data can be served faster.",
      synonyms: ["storage", "reserve", "repository"],
      antonyms: ["delete", "erase"],
      examples: [
        "The browser cache stores images and files to speed up loading times.",
        "Clearing the cache can resolve some performance issues.",
        "The CPU cache improves processing speed by storing frequently accessed data."
      ]
    },
    {
      word: "Debug",
      phonetics: "/dēˈbəɡ/",
      partOfSpeech: "verb",
      definition: "identify and remove errors from (computer hardware or software).",
      synonyms: ["fix", "repair", "troubleshoot"],
      antonyms: ["corrupt", "damage"],
      examples: [
        "He spent hours debugging the code.",
        "The software needs to be debugged before release.",
        "Debugging is a critical step in the development process."
      ]
    },
    {
      word: "Encryption",
      phonetics: "/inˈkripSHən/",
      partOfSpeech: "noun",
      definition: "the process of converting information or data into a code, especially to prevent unauthorized access.",
      synonyms: ["coding", "ciphering", "encoding"],
      antonyms: ["decryption", "decoding"],
      examples: [
        "Encryption is used to protect sensitive information.",
        "The data was secured using advanced encryption techniques.",
        "Encryption ensures the privacy of online communications."
      ]
    },
    {
      word: "Firewall",
      phonetics: "/ˈfī(ə)rˌwôl/",
      partOfSpeech: "noun",
      definition: "a part of a computer system or network that is designed to block unauthorized access while permitting outward communication.",
      synonyms: ["security system", "barrier", "protection"],
      antonyms: ["gateway", "vulnerability"],
      examples: [
        "The firewall helps protect the network from cyber attacks.",
        "Configuring the firewall correctly is essential for security.",
        "Firewalls can be hardware-based or software-based."
      ]
    },
    {
      word: "Gigabyte",
      phonetics: "/ˈɡiɡəˌbīt/",
      partOfSpeech: "noun",
      definition: "a unit of information equal to one billion (10^9) bytes.",
      synonyms: ["GB", "gig", "memory"],
      antonyms: ["megabyte", "kilobyte"],
      examples: [
        "The smartphone comes with 64 gigabytes of storage.",
        "Files larger than a gigabyte may take longer to download.",
        "The hard drive has a capacity of 500 gigabytes."
      ]
    },
    {
      word: "Hardware",
      phonetics: "/ˈhärdˌwer/",
      partOfSpeech: "noun",
      definition: "the physical components of a computer system.",
      synonyms: ["equipment", "machinery", "apparatus"],
      antonyms: ["software", "programs"],
      examples: [
        "The hardware includes the CPU, RAM, and motherboard.",
        "Upgrading the hardware can improve the computer's performance.",
        "He built his own computer from hardware components."
      ]
    },
    {
      word: "Interface",
      phonetics: "/ˈin(t)ərˌfās/",
      partOfSpeech: "noun",
      definition: "a point where two systems, subjects, organizations, etc., meet and interact.",
      synonyms: ["connection", "interaction", "link"],
      antonyms: ["disconnection", "isolation"],
      examples: [
        "The user interface should be intuitive and easy to use.",
        "The interface between the two systems needs to be improved.",
        "The software provides a graphical interface for users."
      ]
    },
    {
      word: "JavaScript",
      phonetics: "/ˈjävəˌskript/",
      partOfSpeech: "noun",
      definition: "an object-oriented computer programming language commonly used to create interactive effects within web browsers.",
      synonyms: ["JS", "scripting language", "programming language"],
      antonyms: ["HTML", "CSS"],
      examples: [
        "JavaScript is widely used for web development.",
        "The website uses JavaScript to enhance user experience.",
        "Learning JavaScript is essential for front-end developers."
      ]
    },
    {
      word: "Kernel",
      phonetics: "/ˈkərn(ə)l/",
      partOfSpeech: "noun",
      definition: "the central part of an operating system, managing system resources and communication between hardware and software.",
      synonyms: ["core", "nucleus", "heart"],
      antonyms: ["shell", "surface"],
      examples: [
        "The Linux kernel is open-source and highly customizable.",
        "The kernel handles low-level tasks such as memory management.",
        "Updating the kernel can improve system performance."
      ]
    },
    {
      word: "Latency",
      phonetics: "/ˈlātənsē/",
      partOfSpeech: "noun",
      definition: "the delay before a transfer of data begins following an instruction for its transfer.",
      synonyms: ["delay", "lag", "wait time"],
      antonyms: ["speed", "immediacy"],
      examples: [
        "Low latency is crucial for real-time applications like video conferencing.",
        "High latency can cause delays in data transmission.",
        "The network upgrade reduced latency significantly."
      ]
    },
    {
      word: "Malware",
      phonetics: "/ˈmalˌwer/",
      partOfSpeech: "noun",
      definition: "software that is specifically designed to disrupt, damage, or gain unauthorized access to a computer system.",
      synonyms: ["virus", "spyware", "ransomware"],
      antonyms: ["antivirus", "security software"],
      examples: [
        "Installing antivirus software can help protect against malware.",
        "The system was infected with malware after visiting a malicious website.",
        "Malware can steal personal information or damage files."
      ]
    },
    {
      word: "Network",
      phonetics: "/ˈnetˌwərk/",
      partOfSpeech: "noun",
      definition: "a group of interconnected computers and devices that can share resources and information.",
      synonyms: ["system", "web", "grid"],
      antonyms: ["standalone", "isolated"],
      examples: [
        "The office network allows employees to share files and printers.",
        "Setting up a secure network is essential for data protection.",
        "The devices are connected to a wireless network."
      ]
    },
    {
      word: "Operating System",
      phonetics: "/ˈäpəˌrādiNG ˈsistəm/",
      partOfSpeech: "noun",
      definition: "the software that supports a computer's basic functions, such as scheduling tasks, executing applications, and controlling peripherals.",
      synonyms: ["OS", "system software", "platform"],
      antonyms: ["hardware", "firmware"],
      examples: [
        "Windows, macOS, and Linux are popular operating systems.",
        "The operating system manages hardware resources and software applications.",
        "Updating the operating system can improve security and performance."
      ]
    },
    {
      word: "Protocol",
      phonetics: "/ˈprōdəˌkôl/",
      partOfSpeech: "noun",
      definition: "a set of rules governing the exchange or transmission of data between devices.",
      synonyms: ["rules", "convention", "standard"],
      antonyms: ["chaos", "disorganization"],
      examples: [
        "HTTP and HTTPS are protocols used for transmitting data over the web.",
        "The network protocol ensures reliable communication between devices.",
        "Protocols are essential for interoperability between different systems."
      ]
    },
    {
      word: "Quantum Computing",
      phonetics: "/ˈkwän(t)əm kəmˈpyo͞odiNG/",
      partOfSpeech: "noun",
      definition: "the area of study focused on developing computer technology based on the principles of quantum theory.",
      synonyms: ["quantum technology", "advanced computing"],
      antonyms: ["classical computing", "traditional computing"],
      examples: [
        "Quantum computing promises to solve complex problems faster than classical computers.",
        "Researchers are exploring the potential of quantum computing in cryptography.",
        "Quantum computing utilizes qubits instead of classical bits."
      ]
    },
    {
      word: "Router",
      phonetics: "/ˈroudər/",
      partOfSpeech: "noun",
      definition: "a device that forwards data packets between computer networks, typically connecting a local network to the internet.",
      synonyms: ["network device", "gateway", "hub"],
      antonyms: ["modem", "switch"],
      examples: [
        "The router provides Wi-Fi connectivity for the entire house.",
        "He configured the router to enhance network security.",
        "Routers are essential for connecting multiple devices to the internet."
      ]
    },
    {
      word: "Server",
      phonetics: "/ˈsərvər/",
      partOfSpeech: "noun",
      definition: "a computer or computer program that manages access to a centralized resource or service in a network.",
      synonyms: ["host", "mainframe", "network computer"],
      antonyms: ["client", "workstation"],
      examples: [
        "The server hosts the company's website and email system.",
        "Upgrading the server improved the performance of the network.",
        "Servers are critical for managing network resources."
      ]
    },
    {
      word: "Software",
      phonetics: "/ˈsôf(t)wer/",
      partOfSpeech: "noun",
      definition: "the programs and other operating information used by a computer.",
      synonyms: ["application", "program", "system"],
      antonyms: ["hardware", "equipment"],
      examples: [
        "She installed new software to edit photos.",
        "The software needs to be updated regularly for security.",
        "Developers create software to perform specific tasks on a computer."
      ]
    },
    {
      word: "Trojan",
      phonetics: "/ˈtrōjən/",
      partOfSpeech: "noun",
      definition: "a type of malware that is often disguised as legitimate software.",
      synonyms: ["virus", "malware", "spyware"],
      antonyms: ["antivirus", "security software"],
      examples: [
        "The Trojan was hidden in a seemingly harmless email attachment.",
        "Installing antivirus software can help detect and remove Trojans.",
        "Trojan attacks can compromise personal information and system security."
      ]
    },
    {
      word: "Upload",
      phonetics: "/ˈəpˌlōd/",
      partOfSpeech: "verb",
      definition: "transfer (data) to another computer system; especially to the internet or a larger computer.",
      synonyms: ["transfer", "send", "transmit"],
      antonyms: ["download", "receive"],
      examples: [
        "She uploaded the photos to the cloud storage service.",
        "It took a long time to upload the video file due to its size.",
        "Uploading files to the server is part of the backup process."
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
          <h1>Technology</h1>
          <p>Learn technology related vocabulary</p>
        </div>
      </div>

      <nav className="breadcrumbs">
          <div className="container">
          <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/english">English</Link></li>
              <li><Link to="/english/vocabulary">Vocabulary</Link></li>
              <li><Link to="/english/vocabulary/main-page">VocabularyEndeavour</Link></li>
              <li className="current">Technology</li>
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

export default TechnologyVocabularyApp;