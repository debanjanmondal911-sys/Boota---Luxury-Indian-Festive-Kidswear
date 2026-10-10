import React, { useState, useEffect } from 'react';
import { X, Smartphone, Mail, ShieldCheck, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { UserProfile } from '../../types/account';
import { initialUserProfile } from '../../data/mockAccountData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  onOpenGuestReturn: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onOpenGuestReturn,
}) => {
  const [authMode, setAuthMode] = useState<'otp' | 'email' | 'guest'>('otp');

  // Mobile OTP state
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValues, setOtpValues] = useState(['1', '2', '3', '4', '5', '6']);
  const [resendTimer, setResendTimer] = useState(30);

  // Email state
  const [email, setEmail] = useState('ananya.sharma@example.com');
  const [password, setPassword] = useState('••••••••••');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpSent && resendTimer > 0) {
      timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpSent, resendTimer]);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length >= 10) {
      setOtpSent(true);
      setResendTimer(30);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // Successful login simulation
    const loggedUser: UserProfile = {
      ...initialUserProfile,
      phone: `+91 ${mobileNumber}`,
      isLoggedIn: true,
    };
    onLoginSuccess(loggedUser);
    onClose();
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const loggedUser: UserProfile = {
      ...initialUserProfile,
      email,
      isLoggedIn: true,
    };
    onLoginSuccess(loggedUser);
    onClose();
  };

  const handleGoogleLogin = () => {
    const loggedUser: UserProfile = {
      ...initialUserProfile,
      name: 'Ananya Sharma',
      email: 'ananya.sharma@gmail.com',
      isLoggedIn: true,
    };
    onLoginSuccess(loggedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#2B2224]/65 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4">
        <div className="relative w-full max-w-md bg-[#FFFDF9] border border-[#E8DADD] rounded-[6px] shadow-2xl p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#6F6265] hover:text-[#2B2224] rounded-full p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Heading */}
          <div className="text-center mb-6">
            <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#962949] flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Boota Parent Account
            </span>
            <h3 className="font-serif text-[26px] font-semibold text-[#2B2224] mt-1">
              Welcome Back
            </h3>
            <p className="text-[13px] text-[#6F6265] mt-1">
              Track orders, download invoices, or initiate exchanges in under 2 minutes.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex border-b border-[#E8DADD] mb-6 text-[13px] font-semibold uppercase tracking-wide">
            <button
              onClick={() => {
                setAuthMode('otp');
                setOtpSent(false);
              }}
              className={`flex-1 pb-2.5 transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                authMode === 'otp'
                  ? 'border-b-2 border-[#962949] text-[#962949]'
                  : 'text-[#6F6265] hover:text-[#2B2224]'
              }`}
            >
              <Smartphone className="w-4 h-4" /> Mobile OTP
            </button>
            <button
              onClick={() => setAuthMode('email')}
              className={`flex-1 pb-2.5 transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                authMode === 'email'
                  ? 'border-b-2 border-[#962949] text-[#962949]'
                  : 'text-[#6F6265] hover:text-[#2B2224]'
              }`}
            >
              <Mail className="w-4 h-4" /> Email
            </button>
            <button
              onClick={() => setAuthMode('guest')}
              className={`flex-1 pb-2.5 transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                authMode === 'guest'
                  ? 'border-b-2 border-[#962949] text-[#962949]'
                  : 'text-[#6F6265] hover:text-[#2B2224]'
              }`}
            >
              <RotateCcw className="w-4 h-4" /> Guest
            </button>
          </div>

          {/* PRIMARY: Mobile OTP */}
          {authMode === 'otp' && (
            <div className="space-y-4">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-[12px] uppercase font-semibold text-[#6F6265] mb-1.5">
                      10-Digit Mobile Number *
                    </label>
                    <div className="flex rounded-[4px] border border-[#E8DADD] bg-white overflow-hidden focus-within:border-[#962949]">
                      <span className="px-3 py-2.5 bg-[#FAF6F4] text-[#6F6265] text-[14px] font-medium border-r border-[#E8DADD]">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        placeholder="98765 43210"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="flex-1 px-3 py-2.5 text-[14px] focus:outline-none"
                      />
                    </div>
                    <span className="text-[11.5px] text-[#6F6265] mt-1 block">
                      We’ll send a secure one-time passcode via SMS &amp; WhatsApp.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#962949] hover:bg-[#7D223C] text-white font-semibold text-[13px] tracking-[0.06em] uppercase rounded-[4px] transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    Send One-Time Password <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="text-center">
                    <p className="text-[13px] text-[#2B2224]">
                      Enter 6-digit OTP sent to <strong>+91 {mobileNumber}</strong>
                    </p>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-[12px] text-[#962949] hover:underline mt-0.5"
                    >
                      Change Number
                    </button>
                  </div>

                  <div className="flex justify-center gap-2">
                    {otpValues.map((val, idx) => (
                      <input
                        key={idx}
                        type="text"
                        maxLength={1}
                        value={val}
                        onChange={(e) => {
                          const updated = [...otpValues];
                          updated[idx] = e.target.value.slice(-1);
                          setOtpValues(updated);
                        }}
                        className="w-10 h-12 text-center text-[18px] font-bold border border-[#E8DADD] rounded-[4px] bg-white focus:outline-none focus:border-[#962949]"
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[12px] text-[#6F6265] pt-1">
                    <span>
                      {resendTimer > 0 ? (
                        `Resend OTP in ${resendTimer}s`
                      ) : (
                        <button
                          type="button"
                          onClick={() => setResendTimer(30)}
                          className="text-[#962949] font-medium hover:underline cursor-pointer"
                        >
                          Resend Code Now
                        </button>
                      )}
                    </span>
                    <span className="text-[#2E7D32]">Demo Code: 123456</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#962949] hover:bg-[#7D223C] text-white font-semibold text-[13px] tracking-[0.06em] uppercase rounded-[4px] transition-colors cursor-pointer"
                  >
                    Verify &amp; Continue
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ALTERNATIVE: Email + Password */}
          {authMode === 'email' && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-[12px] uppercase font-semibold text-[#6F6265] mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#E8DADD] px-3.5 py-2.5 text-[14px] rounded-[4px] focus:outline-none focus:border-[#962949]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[12px] uppercase font-semibold text-[#6F6265]">
                    Password *
                  </label>
                  <a href="#forgot" className="text-[12px] text-[#962949] hover:underline">
                    Forgot?
                  </a>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-[#E8DADD] px-3.5 py-2.5 text-[14px] rounded-[4px] focus:outline-none focus:border-[#962949]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#962949] hover:bg-[#7D223C] text-white font-semibold text-[13px] tracking-[0.06em] uppercase rounded-[4px] transition-colors cursor-pointer"
              >
                Sign In
              </button>
            </form>
          )}

          {/* GUEST: Fast Track & Return */}
          {authMode === 'guest' && (
            <div className="space-y-4 text-center">
              <div className="p-4 bg-[#FAF6F4] rounded-[6px] border border-[#E8DADD] text-left text-[13px] text-[#6F6265] space-y-2">
                <p className="font-semibold text-[#2B2224] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#962949]" /> Instant Guest Self-Service
                </p>
                <p>
                  No password or account required! Track your active parcel or start a size exchange/return in under 2 minutes with your Order Number and Mobile Number.
                </p>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenGuestReturn();
                }}
                className="w-full py-3 bg-[#962949] hover:bg-[#7D223C] text-white font-semibold text-[13px] tracking-[0.06em] uppercase rounded-[4px] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                Open Fast Return &amp; Exchange Portal <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Optional Google Sign-In */}
          {authMode !== 'guest' && (
            <div className="mt-6 pt-5 border-t border-[#E8DADD] text-center space-y-3">
              <span className="text-[12px] text-[#6F6265]">Or sign in with</span>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-2.5 px-4 bg-white border border-[#E8DADD] hover:border-[#2B2224] rounded-[4px] text-[13px] font-semibold text-[#2B2224] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Continue with Google
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
