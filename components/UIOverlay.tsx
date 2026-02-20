
import React, { useState, useEffect } from 'react';
import { LevelConfig, GameStatus } from '../types';

interface UIOverlayProps {
  level: LevelConfig;
  status: GameStatus;
  isWrongAnswer: boolean;
  currentQuestionIdx: number;
  onAnswer: (answer: string) => void;
  onPinSubmit: (pin: string) => void;
  onClose: () => void;
  onRestart: () => void;
  onContinue?: () => void;
}

const UIOverlay: React.FC<UIOverlayProps> = ({ 
  level, 
  status, 
  isWrongAnswer, 
  currentQuestionIdx,
  onAnswer, 
  onPinSubmit,
  onClose,
  onRestart,
  onContinue
}) => {
  const [inputValue, setInputValue] = useState('');
  const [pinValue, setPinValue] = useState('');
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setInputValue('');
    setPinValue('');
    setShowHint(false);
  }, [currentQuestionIdx, status]);

  if (status === 'GAME_COMPLETE') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50/95 backdrop-blur-xl p-4 sm:p-6">
        <div className="max-w-sm w-full p-6 sm:p-8 text-center bg-white border border-slate-200 shadow-2xl rounded-sm">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 mb-2 sm:mb-3 italic tracking-normal leading-relaxed">VAULT BREACHED</h2>
            <p className="text-xs text-slate-500 mb-3 sm:mb-4 leading-relaxed uppercase tracking-normal px-6 break-words">
              Expert proficiency confirmed. Security terminated.
            </p>
            <button onClick={onRestart} className="w-full py-2 sm:py-3 bg-slate-900 text-white font-black uppercase tracking-normal text-[9px] sm:text-[10px] hover:bg-slate-800 transition-colors rounded-sm">Return Home</button>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'PROMO_SCREEN') {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950 p-3 sm:p-4 md:p-6 overflow-hidden">
        {/* Tech Background Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] [background-size:20px_20px] sm:[background-size:30px_30px] md:[background-size:40px_40px]"></div>
        </div>
        
        <div className="max-w-6xl w-full grid grid-cols-1 xl:grid-cols-2 bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] rounded-sm border-t-[8px] sm:border-t-[12px] md:border-t-[16px] border-blue-600 relative z-10 animate-in fade-in zoom-in slide-in-from-bottom-12 duration-700 overflow-hidden overflow-y-auto max-h-[95vh]">
          
          {/* LEFT PART: PRIZES & CERTIFICATES */}
          <div className="p-6 sm:p-8 md:p-10 lg:p-14 bg-slate-50 border-r border-slate-100 flex flex-col justify-center order-2 xl:order-1">
            <div className="mb-6 flex items-center gap-2">
              <span className="h-1 w-8 bg-blue-600"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Reward Protocol Active</span>
            </div>
            
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 mb-2 italic tracking-normal leading-relaxed uppercase">Impressive Logic</h3>
            <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-normal mb-3 sm:mb-4">Stage 01 Complete</p>
            
            <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
              <div className="text-[9px] sm:text-[10px] font-black text-slate-900 uppercase tracking-normal mb-2 flex items-center gap-2">
                <span className="w-3 sm:w-4 h-px bg-slate-300"></span>
                Top 3 Prizes
              </div>
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                <div className="flex items-center justify-between p-3 sm:p-4 md:p-5 bg-white border border-slate-200 border-l-4 sm:border-l-6 md:border-l-8 border-yellow-400 shadow-sm animate-in slide-in-from-left duration-500 delay-100">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-base sm:text-lg font-black text-yellow-500">01</span>
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-normal text-slate-400 break-words">Winner</span>
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900">300</span>
                </div>
                <div className="flex items-center justify-between p-3 sm:p-4 md:p-5 bg-white border border-slate-200 border-l-4 sm:border-l-6 md:border-l-8 border-slate-300 shadow-sm animate-in slide-in-from-left duration-500 delay-200">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-base sm:text-lg font-black text-slate-400">02</span>
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-normal text-slate-400 break-words">Runner Up</span>
                  </div>
                  <span className="text-xl sm:text-2xl font-black text-slate-900">200</span>
                </div>
                <div className="flex items-center justify-between p-3 sm:p-4 md:p-5 bg-white border border-slate-200 border-l-4 sm:border-l-6 md:border-l-8 border-orange-400 shadow-sm animate-in slide-in-from-left duration-500 delay-300">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-base sm:text-lg font-black text-orange-400">03</span>
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-normal text-slate-400 break-words">Third Place</span>
                  </div>
                  <span className="text-lg sm:text-xl font-black text-slate-900">100</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="text-[9px] sm:text-[10px] font-black text-slate-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="w-3 sm:w-4 h-px bg-slate-300"></span>
                Official Validation
              </div>
              
              <div className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-blue-600 text-white rounded-sm transition-all hover:scale-[1.02] shadow-lg shadow-blue-600/20">
                <div className="w-10 sm:w-12 h-10 sm:h-12 flex-shrink-0 flex items-center justify-center bg-white/20 rounded-full">
                  <svg className="w-4 sm:w-6 h-4 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[10px] sm:text-[12px] font-black uppercase tracking-widest leading-none mb-1">Merit Certificate</h4>
                  <p className="text-[8px] sm:text-[9px] text-blue-100 uppercase tracking-widest opacity-80">Awarded for professional precision.</p>
                </div>
              </div>

              <div className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-white border border-slate-200 rounded-sm transition-all hover:bg-slate-50">
                <div className="w-10 sm:w-12 h-10 sm:h-12 flex-shrink-0 flex items-center justify-center bg-slate-100 text-slate-400 rounded-full">
                  <svg className="w-4 sm:w-6 h-4 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[10px] sm:text-[12px] font-black uppercase tracking-widest text-slate-900 leading-none mb-1">Participation Certificate</h4>
                  <p className="text-[8px] sm:text-[9px] text-slate-500 uppercase tracking-widest">For all successful session participants.</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PART: THE PITCH & ACTION */}
          <div className="p-6 sm:p-8 md:p-10 lg:p-14 bg-white flex flex-col items-center text-center justify-center relative order-1 xl:order-2">
            <div className="absolute top-0 right-0 p-4 sm:p-6 opacity-5 pointer-events-none hidden md:block">
               <span className="text-[8rem] sm:text-[10rem] md:text-[12rem] font-black italic">C</span>
            </div>

            <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 mb-6 sm:mb-8 md:mb-10 relative group animate-float flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-600/10 blur-[40px] sm:blur-[60px] md:blur-[80px] group-hover:bg-blue-600/20 transition-all rounded-full"></div>
                <div className="relative w-full h-full border-4 sm:border-6 md:border-8 border-slate-950 bg-slate-100 p-2 sm:p-3 md:p-4 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] sm:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] md:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden rounded-sm transform group-hover:rotate-1 transition-transform">
                    {/* QR Code Implementation for Payment/Form */}
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://forms.gle/G7yYdCQqQqyPc1Rs5" 
                      alt="Google Pay Challenge QR" 
                      className="w-full h-full object-contain mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-slate-100">
                       <div className="w-6 h-1 sm:w-8 sm:h-1.5 md:w-10 md:h-2 bg-blue-600 rounded-lg"></div>
                    </div>
                </div>
            </div>

            <div className="max-w-md w-full space-y-6 sm:space-y-8 z-10">
              <div className="space-y-3 sm:space-y-4">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-900 font-black leading-tight uppercase italic tracking-tighter">
                  Just <span className="text-blue-600 px-1 sm:px-2 bg-blue-50 border-b-2 sm:border-b-4 border-blue-600">20</span> can change your coding mindset.
                </p>
                <p className="text-[10px] sm:text-[11px] md:text-sm text-slate-500 font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em]">Test your engineering limits today.</p>
              </div>
              
              <div className="relative py-4 sm:py-6 px-4 sm:px-6 md:px-8 border border-slate-100 bg-slate-50/50 italic text-[11px] sm:text-[12px] md:text-[13px] text-slate-600 leading-relaxed font-serif">
                <span className="absolute -top-3 sm:-top-4 left-2 sm:left-4 text-2xl sm:text-3xl md:text-4xl text-blue-200 font-serif">"</span>
                "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it."
                <span className="absolute -bottom-6 sm:-bottom-8 md:-bottom-10 right-2 sm:right-4 text-2xl sm:text-3xl md:text-4xl text-blue-200 font-serif">"</span>
              </div>

              <div className="pt-4 sm:pt-6">
                <a 
                  href="https://forms.gle/G7yYdCQqQqyPc1Rs5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-full py-4 sm:py-5 md:py-6 lg:py-7 bg-slate-950 text-white font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] text-[12px] sm:text-[14px] md:text-[16px] transition-all shadow-[0_15px_30px_-5px_rgba(0,0,0,0.4)] sm:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.4)] md:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.4)] hover:bg-blue-600 hover:-translate-y-1 sm:hover:-translate-y-2 active:translate-y-0 rounded-sm"
                >
                  <span className="relative z-10">Initialize Entry</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ml-2 sm:ml-4 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} sm:strokeWidth={2} md:strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 border-t border-slate-100 pt-4 sm:pt-6">
                 <button 
                  onClick={onRestart}
                  className="text-[8px] sm:text-[9px] text-slate-400 hover:text-slate-900 font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] transition-colors border-b border-transparent hover:border-slate-900 pb-1"
                >
                  Terminate Session
                </button>
                <span className="text-[7px] sm:text-[8px] text-slate-300 uppercase tracking-widest font-black">Official Challenge v1.4</span>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(1deg); }
          }
          .animate-float {
            animation: float 8s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  if (status === 'LEVEL_TRANSITIONING') {
    return (
      <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center pointer-events-none">
          <div className="space-y-4 text-center animate-pulse px-4">
            <h2 className="text-slate-900 text-5xl font-black italic tracking-tighter uppercase" style={{ color: level.themeColor }}>Authorized</h2>
            <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-1 w-10 bg-slate-200 overflow-hidden">
                        <div className="h-full bg-slate-900 animate-[loading_1s_infinite]" style={{ backgroundColor: level.themeColor, animationDelay: `${i * 0.1}s` }}></div>
                    </div>
                ))}
            </div>
          </div>
          <style>{`
            @keyframes loading {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
          `}</style>
      </div>
    );
  }

  if (status === 'LEVEL_INTRO') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white p-4">
        <div className="text-center space-y-6 animate-in fade-in zoom-in duration-700">
           <h2 className="text-[10px] text-slate-400 uppercase tracking-[1em] mb-2">Syncing Environment...</h2>
           <h1 className="text-8xl md:text-[12rem] font-black italic tracking-tighter leading-none" style={{ color: level.themeColor }}>0{level.id}</h1>
           <div className="w-48 h-1 bg-slate-100 mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-slate-900 animate-[progress_3s_linear_infinite]" style={{ backgroundColor: level.themeColor }}></div>
           </div>
           <style>{`
             @keyframes progress {
               0% { transform: translateX(-100%); }
               100% { transform: translateX(100%); }
             }
           `}</style>
        </div>
      </div>
    );
  }

  if (status === 'PIN_ENTRY') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/10 backdrop-blur-md p-3 sm:p-4">
        <div className="max-w-xs sm:max-w-sm w-full bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl relative rounded-sm">
          <button onClick={onClose} className="absolute top-3 sm:top-4 right-3 sm:right-4 text-slate-400 hover:text-slate-900 text-sm sm:text-base">[ X ]</button>
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-bold uppercase tracking-widest text-slate-900 mb-1">Security PIN</h3>
            <p className="text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-widest italic">Check illuminated mobile device</p>
          </div>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-4 sm:mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button 
                key={num} 
                onClick={() => pinValue.length < 4 && setPinValue(prev => prev + num)}
                className="h-12 sm:h-14 bg-slate-50 border border-slate-200 text-slate-900 font-bold hover:bg-slate-100 transition-colors rounded-sm text-sm sm:text-base"
              >
                {num}
              </button>
            ))}
            <button 
              onClick={() => setPinValue('')}
              className="h-12 sm:h-14 bg-red-50 border border-red-100 text-red-500 font-bold text-[8px] sm:text-[10px] uppercase rounded-sm"
            >
              Clear
            </button>
            <button 
              key={0} 
              onClick={() => pinValue.length < 4 && setPinValue(prev => prev + 0)}
              className="h-12 sm:h-14 bg-slate-50 border border-slate-200 text-slate-900 font-bold rounded-sm text-sm sm:text-base"
            >
              0
            </button>
            <button 
              onClick={() => onPinSubmit(pinValue)}
              className="h-12 sm:h-14 bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold text-[8px] sm:text-[10px] uppercase rounded-sm"
            >
              Enter
            </button>
          </div>
          <div className="flex justify-center gap-2 sm:gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-8 sm:w-10 h-12 sm:h-14 border-b-2 border-slate-900 flex items-center justify-center text-xl sm:text-2xl font-black">
                {pinValue[i] ? '*' : ''}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (status !== 'QUESTIONING') return null;

  const question = level.questions[currentQuestionIdx];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/10 backdrop-blur-md p-3 sm:p-4 md:p-6 overflow-y-auto">
      <div className={`max-w-lg sm:max-w-xl w-full bg-white border border-slate-200 p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl relative my-auto rounded-sm ${isWrongAnswer ? 'animate-shake' : ''}`}>
        <button onClick={onClose} className="absolute top-4 sm:top-6 right-4 sm:right-6 text-slate-400 hover:text-slate-900 transition-colors text-sm sm:text-base">[ CLOSE ]</button>

        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-slate-100 pb-4 sm:pb-6 gap-2">
          <div className="space-y-1">
            <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-[0.3em] sm:tracking-[0.4em]">{question.topic}</span>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <span className="text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 border border-slate-200 text-slate-500 inline-block w-fit">LAYER 0{currentQuestionIdx + 1}</span>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-tight">{question.prompt}</h3>
            </div>
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <button 
            onClick={() => setShowHint(!showHint)} 
            className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
          >
            {showHint ? '[ HIDE HINT ]' : '[ SHOW HINT ]'}
          </button>
          {showHint && (
            <div className="mt-2 sm:mt-3 p-3 sm:p-4 bg-blue-50/50 border-l-4 border-blue-600 animate-in slide-in-from-left duration-300">
               <p className="text-[10px] sm:text-[11px] text-blue-800 font-bold uppercase tracking-tight leading-relaxed italic">
                 {question.hint}
               </p>
            </div>
          )}
        </div>

        {isWrongAnswer && (
          <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-red-50 border border-red-200 text-red-600 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest animate-pulse">
            Fatal Error: Decryption Mismatch. Security Compromised.
          </div>
        )}

        <div className="space-y-2 sm:space-y-3">
          {question.type === 'MCQ' ? (
            question.options?.map((opt, i) => (
              <button 
                key={i}
                onClick={() => onAnswer(opt)}
                className="w-full text-left p-3 sm:p-4 md:p-5 bg-slate-50 border border-slate-100 text-slate-700 hover:bg-white hover:border-slate-300 transition-all group flex items-center rounded-sm"
              >
                <span className="w-6 sm:w-8 text-[9px] sm:text-[10px] font-mono text-slate-300 group-hover:text-slate-900 transition-colors">{i + 1}.</span>
                <span className="text-xs sm:text-sm tracking-wide">{opt}</span>
              </button>
            ))
          ) : (
            <div className="space-y-4 sm:space-y-6">
              <input 
                autoFocus
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onAnswer(inputValue)}
                placeholder="INPUT DATA..."
                className="w-full p-3 sm:p-4 md:p-5 bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-slate-400 transition-colors text-xs sm:text-sm md:text-base font-mono tracking-widest placeholder:text-slate-300 rounded-sm"
              />
              <button onClick={() => onAnswer(inputValue)} className="w-full py-3 sm:py-4 md:py-5 bg-slate-900 text-white font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[9px] sm:text-[10px] hover:bg-slate-800 transition-colors rounded-sm">Submit Bit</button>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        .animate-shake {
          animation: shake 0.6s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
};

export default UIOverlay;
