
import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white text-slate-900 p-2 sm:p-3 md:p-4 lg:p-6 overflow-y-auto overflow-x-hidden">
      <div className="max-w-lg sm:max-w-xl md:max-w-2xl w-full text-center space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-12 my-auto relative px-2 sm:px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-5 select-none pointer-events-none">
          <span className="text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] font-black italic tracking-tighter">01</span>
        </div>

        <div className="animate-in fade-in slide-in-from-top-12 duration-1000">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-normal mb-2 sm:mb-3 md:mb-4 lg:mb-6 italic uppercase leading-relaxed">C-ESCAPE</h1>
          <div className="h-1.5 sm:h-2 md:h-2.5 lg:h-3 w-12 sm:w-16 md:w-20 lg:w-32 xl:w-48 bg-blue-600 mx-auto mb-2 sm:mb-3 md:mb-4 lg:mb-6"></div>
          <p className="text-slate-900 text-xs sm:text-sm md:text-base uppercase tracking-normal font-black px-2 sm:px-4 leading-relaxed">Explore and Enjoy</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4 text-left animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          <div className="p-3 sm:p-4 md:p-6 lg:p-8 border-2 sm:border-3 md:border-4 border-slate-950 bg-white shadow-[4px_4px_0px_0px_rgba(30,58,138,1)] sm:shadow-[6px_6px_0px_0px_rgba(30,58,138,1)] md:shadow-[8px_8px_0px_0px_rgba(30,58,138,1)] rounded-sm">
            <h3 className="text-xs sm:text-xs md:text-sm font-black uppercase tracking-normal mb-2 sm:mb-3 md:mb-4 text-blue-600 flex items-center gap-1.5 sm:gap-2">
              <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
              Challenge
            </h3>
            <ul className="text-xs sm:text-sm md:text-base space-y-1.5 sm:space-y-2 md:space-y-3 text-slate-900 font-bold uppercase tracking-normal px-1 sm:px-2">
              <li className="flex gap-1.5 sm:gap-2 items-start"><span className="text-blue-600 flex-shrink-0 text-xs sm:text-sm">01.</span> <span className="text-xs sm:text-sm md:text-base leading-relaxed break-words">Explore 3D</span></li>
              <li className="flex gap-1.5 sm:gap-2 items-start"><span className="text-blue-600 flex-shrink-0 text-xs sm:text-sm">02.</span> <span className="text-xs sm:text-sm md:text-base leading-relaxed break-words">Solve puzzles</span></li>
              <li className="flex gap-1.5 sm:gap-2 items-start"><span className="text-blue-600 flex-shrink-0 text-xs sm:text-sm">03.</span> <span className="text-xs sm:text-sm md:text-base leading-relaxed break-words">Show skills</span></li>
            </ul>
          </div>
          <div className="p-3 sm:p-4 md:p-6 lg:p-8 border border-slate-100 bg-slate-50 shadow-sm rounded-sm flex flex-col justify-center">
            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-medium italic px-2 sm:px-4 break-words">
              "Mastering the machine starts here. This is not a game; it is an assessment of your potential."
            </p>
            <div className="mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-5 md:pt-6 border-t border-slate-200">
            </div>
          </div>
        </div>

        <div className="pt-4 sm:pt-6 animate-in fade-in zoom-in duration-1000 delay-500">
          <button 
            onClick={onStart}
            className="group relative w-full sm:w-auto px-3 sm:px-6 md:px-8 lg:px-12 py-2 sm:py-2.5 md:py-3 lg:py-4 bg-slate-950 text-white font-black uppercase tracking-normal overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl sm:shadow-2xl rounded-sm text-xs sm:text-sm md:text-base"
          >
            <span className="relative z-10 whitespace-nowrap">Ika Modhaledadhama...</span>
            <div className="absolute inset-0 bg-blue-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-expo"></div>
          </button>
        </div>

        <p className="text-[8px] sm:text-[9px] md:text-[10px] text-slate-400 uppercase tracking-normal font-black flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 px-2 sm:px-4">
          <span className="text-center">Good Luck!</span>
        </p>
      </div>
    </div>
  );
};

export default StartScreen;
