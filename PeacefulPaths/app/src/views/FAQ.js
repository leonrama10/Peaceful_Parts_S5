import React, { useState } from 'react';
import '../css/FAQ.css';

const faqData = [
{ question: "Who are the therapists?", answer: "Therapists on PeacefulParts are licensed, trained, experienced, and accredited psychologists (PhD / PsyD), marriage and family therapists (LMFT), clinical social workers (LCSW / LMSW), and licensed professional counselors (LPC)." },
  { question: "Who will be helping me?", answer: "You will be matched with a therapist based on your preferences and needs." },
  { question: "Is PeacefulParts right for me?", answer: "PeacefulParts may be right for you if you're looking for convenience, flexibility, and professional support in dealing with personal issues." },
  { question: "How much does it cost?", answer: "The cost of therapy through PeacefulParts depends on how much the therapist decides the cost to be for a meeting, first you book a meeting, then you pay for it." },
  { question: "After I sign up, how long until I'm matched with a therapist?", answer: "Once you complete the sign-up process, you are matched with a therapist, based on the questionnaire you filled." },
  { question: "How will I communicate with my therapist?", answer: "You can communicate with your therapist through messages, phone, or video sessions." },
  { question: "Can PeacefulParts substitute for traditional face-to-face therapy?", answer: "While PeacefulParts offers many benefits, it might not be suitable for everyone or for severe cases. It's best to consider your personal needs and consult with a healthcare provider." },
  { question: "How long can I use PeacefulParts?", answer: "You can use PeacefulParts as long as you need it. The service is flexible and you can stop at any time." },
  { question: "How can I be sure that this is an effective form of therapy?", answer: "Effectiveness varies by individual. Many studies show that online therapy can be as effective as in-person therapy for various issues." },
];

const FAQ = () => {
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  return (
  <div className="faq-kryesori-1">
    <div className="faq-container">
      <h1 className="faq-h1-1">Frequently asked questions</h1>
      {faqData.map((item, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleQuestion(index)}>
            <h5>{item.question}</h5>
            <span className="faq-toggle">{openQuestionIndex === index ? '▲' : '▼'}</span>
          </div>
          <hr/>
          {openQuestionIndex === index && <div className="faq-answer">{item.answer}</div>}
        </div>
      ))}
    </div>
  </div>
  );
};

export default FAQ;