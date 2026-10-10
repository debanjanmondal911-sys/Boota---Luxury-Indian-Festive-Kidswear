import React, { useState, useEffect } from 'react';
import { AnnouncementMessage } from '../types';
import { Settings, X, Check } from 'lucide-react';

interface AnnouncementBarProps {
  messages: AnnouncementMessage[];
  onUpdateMessages?: (newMessages: AnnouncementMessage[]) => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  messages,
  onUpdateMessages,
}) => {
  const activeMessages = messages.filter((m) => m.active);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [editableMessages, setEditableMessages] = useState<AnnouncementMessage[]>(messages);

  useEffect(() => {
    setEditableMessages(messages);
  }, [messages]);

  useEffect(() => {
    if (activeMessages.length <= 1) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % activeMessages.length);
        setFade(true);
      }, 400); // 400ms fade transition
    }, 5000); // 5 seconds rotation per spec

    return () => clearInterval(interval);
  }, [activeMessages.length]);

  const handleSaveAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateMessages) {
      onUpdateMessages(editableMessages);
    }
    setAdminModalOpen(false);
  };

  const handleToggleActive = (id: string) => {
    setEditableMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, active: !msg.active } : msg))
    );
  };

  const handleTextChange = (id: string, text: string) => {
    setEditableMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, text } : msg))
    );
  };

  if (activeMessages.length === 0) {
    return null;
  }

  return (
    <>
      <div className="relative w-full h-[36px] bg-[#F9D0D6] border-b border-[#E8DADD] text-[#962949] flex items-center justify-center select-none overflow-hidden z-20">
        <div className="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between text-[12px] md:text-[13px] font-manrope font-medium tracking-[0.03em]">
          <div className="w-6 hidden md:block" />
          
          {/* Static Centered Rotating Message with Fade */}
          <div className="flex-1 text-center truncate px-2">
            <span
              className={`inline-block transition-opacity duration-400 ease-in-out ${
                fade ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {activeMessages[currentIndex % activeMessages.length]?.text}
            </span>
          </div>

          {/* Right Spacer to keep text perfectly centered */}
          <div className="w-6 hidden md:block" />
        </div>
      </div>

      {/* Admin Announcement Editor Modal */}
      {adminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-[#FFFFFF] border border-[#E8DADD] rounded-[6px] max-w-lg w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setAdminModalOpen(false)}
              className="absolute top-4 right-4 text-[#6F6265] hover:text-[#2B2224]"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-[20px] text-[#962949] font-medium mb-2">
              Announcement Bar Settings
            </h3>
            <p className="text-[13px] text-[#6F6265] mb-5">
              Edit or enable/disable up to 3 static messages. Messages cycle every 5 seconds with a smooth fade.
            </p>

            <form onSubmit={handleSaveAdmin} className="space-y-4">
              {editableMessages.map((msg, index) => (
                <div key={msg.id} className="p-3.5 border border-[#E8DADD] rounded-[4px] bg-[#FFFDF9]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] font-semibold uppercase text-[#962949]">
                      Message {index + 1} ({msg.type})
                    </span>
                    <label className="flex items-center gap-2 cursor-pointer text-[12px] text-[#2B2224]">
                      <input
                        type="checkbox"
                        checked={msg.active}
                        onChange={() => handleToggleActive(msg.id)}
                        className="rounded border-[#E8DADD] text-[#962949] focus:ring-[#962949]"
                      />
                      <span>{msg.active ? 'Enabled' : 'Disabled'}</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={msg.text}
                    onChange={(e) => handleTextChange(msg.id, e.target.value)}
                    className="w-full text-[13px] px-3 py-2 border border-[#E8DADD] rounded-[4px] bg-white text-[#2B2224] focus:outline-none focus:border-[#962949]"
                    placeholder="Enter announcement text..."
                  />
                </div>
              ))}

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAdminModalOpen(false)}
                  className="px-4 py-2 border border-[#E8DADD] text-[#6F6265] text-[13px] rounded-[4px] hover:bg-[#F9D0D6]/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#962949] text-white text-[13px] font-medium rounded-[4px] hover:bg-[#80223d] transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> Save Announcements
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
