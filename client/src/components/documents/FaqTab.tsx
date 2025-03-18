import { useState } from "react";

const FaqTab = () => {
  const faqs = [
    {
      question: "What is your refund policy?",
      answer: "We offer a 30-day money-back guarantee.",
    },
    {
      question: "How do I change my password?",
      answer: "You can reset your password from the settings page.",
    },
    {
      question: "Do you offer customer support?",
      answer:
        "Yes, we have 24/7 customer support available via chat and email.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-xl mx-auto py-4 flex flex-col gap-3">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`{mb-4 border-2 rounded-lg ${
            openIndex === index ? "border-primary" : "border-gray-500"
          }`}
        >
          <button
            className="w-full text-left p-3 font-semibold decoration-secondary rounded-md"
            onClick={() => toggleFaq(index)}
          >
            {faq.question}
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-40 p-3 " : "max-h-0"
            }`}
          >
            <p className="decoration-secondary">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqTab;
