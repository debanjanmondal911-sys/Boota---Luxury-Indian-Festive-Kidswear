import React, { useState } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';

export const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    {
      sender: 'bot',
      text: 'Namaste! Welcome to Boota. Can I help you with sizing, fabric details, or dispatch times for the Gulnar Silk Lehenga Set?',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInput('');

    setTimeout(() => {
      let reply =
        'Our artisans craft each piece with soft 100% cotton voile lining for complete comfort. Orders dispatch within 24-48 hours with complimentary 7-day size exchanges!';
      const lower = userText.toLowerCase();
      if (lower.includes('size')) {
        reply =
          'The Gulnar Silk Lehenga fits true to age. If your child is between sizes or tall, we suggest choosing the next size up. The elasticated waist provides gentle flexibility.';
      } else if (lower.includes('ship') || lower.includes('delivery')) {
        reply =
          'Standard delivery takes 3-7 days across India. All prepaid orders above ₹1,499 receive free express shipping.';
      } else if (lower.includes('fabric') || lower.includes('wash')) {
        reply =
          'The set is made from pure Chanderi silk with hand-applied Gota Patti borders and 100% breathable cotton lining. Dry cleaning is recommended.';
      }
      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Action Button matching user reference image */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-[52px] h-[52px] bg-[#962949] hover:bg-[#7A1F3B] text-[#FFFFFF] rounded-full shadow-[0_4px_24px_rgba(150,41,73,0.35)] flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
          aria-label="Open chat"
        >
          <MessageCircle className="w-[22px] h-[22px] text-white stroke-[2]" />
        </button>
      )}

      {/* Concierge Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-[#FFFDF9] border border-[#E8DADD] rounded-[4px] overflow-hidden flex flex-col h-[420px]">
          {/* Header */}
          <div className="bg-[#962949] text-[#FFFFFF] p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-[4px] bg-[#FFFFFF]/20 flex items-center justify-center font-serif italic font-bold text-sm">
                b
              </div>
              <div>
                <h4 className="font-serif font-semibold text-[16px]">Boota Concierge</h4>
                <p className="text-[11px] text-[#F9D0D6]">Online • Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#FFFFFF]/80 hover:text-[#FFFFFF] cursor-pointer p-1 rounded-[4px]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick chips */}
          <div className="px-3 py-2 bg-[#F9D0D6]/30 border-b border-[#E8DADD] flex gap-2 overflow-x-auto text-[12px]">
            <button
              onClick={() =>
                setMessages((prev) => [
                  ...prev,
                  { sender: 'user', text: 'How is the sizing?' },
                  {
                    sender: 'bot',
                    text: 'Fits true to age! With elasticated waistbands and soft cotton lining, you can pick her regular age or 1 size up if she is tall.',
                  },
                ])
              }
              className="px-2.5 py-1 bg-[#FFFFFF] border border-[#E8DADD] text-[#962949] rounded-[4px] whitespace-nowrap hover:bg-[#F9D0D6]/50"
            >
              Sizing Help
            </button>
            <button
              onClick={() =>
                setMessages((prev) => [
                  ...prev,
                  { sender: 'user', text: 'When will this arrive?' },
                  {
                    sender: 'bot',
                    text: 'We dispatch orders within 24-48 hrs. Expected doorstep delivery is 3 to 7 business days.',
                  },
                ])
              }
              className="px-2.5 py-1 bg-[#FFFFFF] border border-[#E8DADD] text-[#962949] rounded-[4px] whitespace-nowrap hover:bg-[#F9D0D6]/50"
            >
              Delivery Time
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-[13.5px]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] p-3 rounded-[4px] leading-relaxed border ${
                    m.sender === 'user'
                      ? 'bg-[#962949] text-[#FFFFFF] border-[#962949]'
                      : 'bg-[#FFFFFF] text-[#2B2224] border-[#E8DADD]'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 border-t border-[#E8DADD] flex items-center gap-2 bg-[#FFFFFF]">
            <input
              type="text"
              placeholder="Ask about sizing, fabric or delivery..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 text-[13px] bg-[#FFFDF9] border border-[#E8DADD] rounded-[4px] px-3 py-2 focus:outline-none focus:border-[#962949] text-[#2B2224]"
            />
            <button
              type="submit"
              className="p-2 bg-[#962949] hover:bg-[#7A1F3B] text-[#FFFFFF] rounded-[4px] cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
