
// @ts-nocheck
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import GameScene from './components/GameScene';
import UIOverlay from './components/UIOverlay';
import StartScreen from './components/StartScreen';
import { LEVELS } from './constants';
import { GameStatus } from './types';

export default function App() {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [status, setStatus] = useState<GameStatus>('START_SCREEN');
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const [systemMessage, setSystemMessage] = useState<string | null>(null);
  const [lampOn, setLampOn] = useState(false);
  const [tvTaps, setTvTaps] = useState(0);
  const [hasHammer, setHasHammer] = useState(false);
  const [ballBroken, setBallBroken] = useState(false);
  const [level3ResetTriggered, setLevel3ResetTriggered] = useState(false);
  const [discoveryState, setDiscoveryState] = useState({
    drawersOpen: [false, false, false],
    bookMoved: false
  });
  
  const introTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messageExpiryRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const controlsRef = useRef<any>(null);

  const currentLevel = LEVELS[currentLevelIdx];
  const currentQuestion = currentLevel.questions[currentQuestionIdx];

  const handleStart = () => {
    setStatus('LEVEL_INTRO');
    setLampOn(false);
    setTvTaps(0);
    setHasHammer(false);
    setBallBroken(false);
    setLevel3ResetTriggered(false);
    setCurrentQuestionIdx(0);
    setDiscoveryState({
      drawersOpen: [false, false, false],
      bookMoved: false
    });
  };

  const handleRestart = () => {
    setCurrentLevelIdx(0);
    setCurrentQuestionIdx(0);
    setStatus('START_SCREEN');
    setSystemMessage(null);
    setLampOn(false);
  };

  const handleContinueAfterPromo = () => {
    if (currentLevelIdx < LEVELS.length - 1) {
      setCurrentLevelIdx(prev => prev + 1);
      setStatus('LEVEL_INTRO');
    } else {
      setStatus('GAME_COMPLETE');
    }
  };

  const showSystemMessage = (text: string, duration: number = 3000) => {
    setSystemMessage(text);
    if (messageExpiryRef.current) clearTimeout(messageExpiryRef.current);
    messageExpiryRef.current = setTimeout(() => {
      setSystemMessage(null);
    }, duration);
  };

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      showSystemMessage("CAMERA RE-CALIBRATED");
      if (currentLevel.id === 3 && status === 'QUESTION_SOLVED') {
        setLevel3ResetTriggered(true);
        setStatus('CABINET_UNLOCKED');
        showSystemMessage("VIEW SYNC REVEALED ANOMALY: CABINET SEAL BROKEN.");
      }
    }
  };

  useEffect(() => {
    if (status === 'LEVEL_INTRO') {
      setLampOn(false);
      setTvTaps(0);
      setHasHammer(false);
      setBallBroken(false);
      setLevel3ResetTriggered(false);
      setCurrentQuestionIdx(0);
      setDiscoveryState({
        drawersOpen: [false, false, false],
        bookMoved: false
      });
      introTimeoutRef.current = setTimeout(() => {
        setStatus('EXPLORING');
      }, 3000);
    }
    return () => {
      if (introTimeoutRef.current) clearTimeout(introTimeoutRef.current);
    };
  }, [status]);

  useEffect(() => {
    if (status === 'LEVEL_TRANSITIONING') {
      const timer = setTimeout(() => {
        if (currentLevelIdx === 0) {
          setStatus('PROMO_SCREEN');
        } else if (currentLevelIdx < LEVELS.length - 1) {
          setCurrentLevelIdx(prev => prev + 1);
          setStatus('LEVEL_INTRO');
        } else {
          setStatus('GAME_COMPLETE');
        }
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [status, currentLevelIdx]);

  const handleObjectClick = (objectName: string, index?: number) => {
    if (status === 'START_SCREEN' || status === 'GAME_COMPLETE' || status === 'LEVEL_INTRO' || status === 'LEVEL_TRANSITIONING' || status === 'PROMO_SCREEN') return;

    if (objectName === 'MUG') {
      showSystemMessage("CONTAINS TRACES OF CAFFEINE AND DESPAIR.");
      return;
    }
    if (objectName === 'TABLET') {
      showSystemMessage("I USE THIS FOR CAT VIDEOS... AND KERNEL DEBUGGING.");
      return;
    }
    if (objectName === 'BED') {
      showSystemMessage("SLEEP IS A LUXURY RESERVED FOR COMPILED CODE.");
      return;
    }
    if (objectName === 'WALL_GAUGE') {
      showSystemMessage("PRESSURE IS RISING. LOGIC GATES STRESSED.");
      return;
    }
    if (objectName === 'KEYBOARD') {
      showSystemMessage("device not connected");
      return;
    }
    if (objectName === 'HOLOGRAM') {
      showSystemMessage("VISUALIZING MEMORY MAP... SEGMENTS LOOK CLEAN.");
      return;
    }
    if (objectName === 'SERVER_MODULE') {
      showSystemMessage("SERVER LOAD: OPTIMAL. ARCHITECTURE: STABLE.");
      return;
    }
    if (objectName === 'VASE') {
      showSystemMessage("TECHNICALLY A SIMULATED ORGANISM. DON'T WATER IT.");
      return;
    }

    if (objectName === 'DESK_LAMP') {
      setLampOn(!lampOn);
      showSystemMessage(lampOn ? "OPTICAL SENSORS DIMMED" : "ILLUMINATION ACTIVE");
      return;
    }

    if (objectName === 'PHONE') {
      showSystemMessage("100% daily data quota is used!");
      return;
    }

    if (objectName === 'HAMMER') {
      setHasHammer(true);
      showSystemMessage("ACQUIRED: THE DE-BUGGING TOOL. SMASH SOMETHING.");
      return;
    }

    if (objectName === 'BALL') {
      if (currentLevel.id === 5) {
        if (hasHammer) {
          setBallBroken(true);
          showSystemMessage("BRUTE FORCE DE-BUGGING SUCCESSFUL. BALL DECRYPTED.");
        } else {
          showSystemMessage("THIS BALL IS TOUGH. I NEED SOMETHING HEAVY.");
        }
      } else {
        showSystemMessage("A SHINY BALL. IT LIKES TO BE DRAGGED.");
      }
      return;
    }

    if (objectName === 'HIDDEN_BOOK') {
      setDiscoveryState(prev => ({ ...prev, bookMoved: !prev.bookMoved }));
      showSystemMessage(discoveryState.bookMoved ? "BOOK RESTORED." : "1 day batting eh nighout chedham lee");
      return;
    }

    if (objectName.startsWith('DRAWER') && typeof index === 'number') {
      if (status === 'CABINET_UNLOCKED' || status === 'KEY_REVEALED' || status === 'PIN_ENTRY') {
        const newDrawers = [...discoveryState.drawersOpen];
        newDrawers[index] = !newDrawers[index];
        setDiscoveryState(prev => ({ ...prev, drawersOpen: newDrawers }));
        
        if (currentLevel.id !== 4 && status !== 'KEY_REVEALED') {
           setStatus('KEY_REVEALED');
        }
      } else {
        showSystemMessage("MAGNETICALLY SEALED. TRY SMARTER, NOT HARDER.");
      }
      return;
    }

    if (objectName === 'SPEAKER') {
      showSystemMessage("paadu gajala paadu");
      return;
    }

    if (objectName === 'BOARD') {
      showSystemMessage("questions kaavalaaa");
      return;
    }

    if (objectName === 'PAPER') {
      showSystemMessage("veedu inthaki manodena");
      return;
    }

    if (objectName === 'KEY') {
      if (status === 'KEY_REVEALED') {
        setStatus('LEVEL_TRANSITIONING');
        showSystemMessage("GATEWAY OPENING. DON'T TRIP ON THE WAY OUT.");
      }
      return;
    }

    if (objectName === 'TV') {
      if (status === 'EXPLORING') {
        const nextTaps = tvTaps + 1;
        setTvTaps(nextTaps);
        if (nextTaps >= currentLevel.id) {
          setStatus('QUESTIONING');
          showSystemMessage("TV TERMINAL OVERRIDE SUCCESSFUL.");
        }
      } else if (status === 'CABINET_UNLOCKED' && currentLevel.id === 4) {
        setStatus('PIN_ENTRY');
        showSystemMessage("TERMINAL CHALLENGE: ENTER PIN TO REVEAL KEYWAY.");
      } else if (status === 'CABINET_UNLOCKED') {
        showSystemMessage("TV ACTIVE. CABINET SHOULD BE UNLOCKED.");
      }
    }
  };

  const handleAnswer = (answer: string) => {
    if (answer.toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim()) {
      if (currentQuestionIdx < 2) {
        setCurrentQuestionIdx(prev => prev + 1);
        showSystemMessage(`LAYER ${currentQuestionIdx + 1}/3 DECRYPTED.`);
      } else {
        setIsWrongAnswer(false);
        if (currentLevel.id === 3) {
          setStatus('QUESTION_SOLVED');
          showSystemMessage("DECRYPTION COMPLETE. VIEW RE-CALIBRATION REQUIRED.");
        } else if (currentLevel.id === 4) {
          setStatus('CABINET_UNLOCKED');
          showSystemMessage("TERMINAL ACCESS GRANTED. TAP TV TO CONTINUE.");
        } else {
          setStatus('CABINET_UNLOCKED');
          showSystemMessage("DECRYPTION COMPLETE. CABINET ACCESS GRANTED.");
        }
      }
    } else {
      setIsWrongAnswer(true);
      showSystemMessage("DECRYPTION ERROR: TRY AGAIN.");
      setTimeout(() => setIsWrongAnswer(false), 2000);
    }
  };

  const handlePinSubmit = (pin: string) => {
    if (pin === currentLevel.pinCode) {
      setStatus('KEY_REVEALED');
      showSystemMessage("PIN ACCEPTED. REVEALING HIDDEN ASSET.");
    } else {
      showSystemMessage("INVALID ACCESS CODE.");
    }
  };

  const getObjective = () => {
    if (currentLevel.id === 4 && status === 'CABINET_UNLOCKED') return "Interact with TV";
    if (currentLevel.id === 4 && status === 'KEY_REVEALED') return "RETRIEVE HIDDEN KEY";
    
    switch(status) {
      case 'EXPLORING': return `Sync TV Terminal Interface`;
      case 'QUESTIONING': return `Decrypt Layer ${currentQuestionIdx + 1}/3`;
      case 'QUESTION_SOLVED': 
        if (currentLevel.id === 3 && !level3ResetTriggered) return "Recalibrate System View (Reset View)";
        return "Search for Key";
      case 'PIN_ENTRY': return "Enter Security PIN";
      case 'CABINET_UNLOCKED': return "Examine Cabinet Drawers";
      case 'KEY_REVEALED': return "RETRIEVE HIDDEN KEY";
      default: return "System Online";
    }
  };

  const handleObjectiveClick = () => {
    if (currentLevel.id === 2 && status === 'KEY_REVEALED') {
      setStatus('LEVEL_TRANSITIONING');
      showSystemMessage("METAPHYSICAL KEY VALIDATED. ACCESS GRANTED.");
    }
  };

  return (
    <div className="w-screen h-screen relative bg-slate-50 font-mono overflow-hidden">
      {status === 'START_SCREEN' ? (
        <StartScreen onStart={handleStart} />
      ) : (
        <>
          <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }} className="touch-none">
            <color attach="background" args={['#ffffff']} />
            <ambientLight intensity={currentLevel.ambientIntensity + 0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
            <spotLight position={[-5, 5, 0]} angle={0.3} penumbra={1} intensity={2} color={currentLevel.themeColor} castShadow />
            <GameScene 
              level={currentLevel} 
              status={status} 
              discoveryState={discoveryState} 
              lampOn={lampOn}
              hasHammer={hasHammer}
              ballBroken={ballBroken}
              level3ResetTriggered={level3ResetTriggered}
              onObjectClick={handleObjectClick} 
            />
            <OrbitControls 
              ref={controlsRef}
              makeDefault 
              enablePan={false} 
              maxDistance={12} 
              minDistance={2.5} 
              enableDamping={true}
              dampingFactor={0.06}
              rotateSpeed={0.7}
              enabled={status !== 'LEVEL_INTRO' && status !== 'LEVEL_TRANSITIONING' && status !== 'PROMO_SCREEN'}
              touchAction="pan-y"
              enableZoom={true}
              zoomSpeed={0.8}
              enableRotate={true}
            />
          </Canvas>

          <div 
            onClick={handleObjectiveClick}
            className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 w-full max-w-xs sm:max-w-sm cursor-pointer z-[45] px-3 sm:px-4 text-center pointer-events-auto"
          >
             <div className="bg-white/90 border border-slate-200 py-2 sm:py-3 backdrop-blur-md shadow-xl rounded-sm">
                <span className="text-[7px] sm:text-[8px] text-slate-400 uppercase tracking-[0.4em] sm:tracking-[0.5em] mb-1 block">Active Protocol</span>
                <p className="text-slate-900 text-[9px] sm:text-[11px] font-black uppercase tracking-widest" style={{ color: currentLevel.themeColor }}>{getObjective()}</p>
             </div>
          </div>

          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-[45]">
            <button 
              onClick={resetCamera}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-slate-200 text-slate-500 hover:text-slate-900 flex items-center gap-1.5 sm:gap-2 shadow-lg active:scale-95 transition-all text-[8px] sm:text-[10px] font-bold uppercase tracking-widest rounded-sm"
            >
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline">Reset View</span>
              <span className="sm:hidden">Reset</span>
            </button>
          </div>

          <UIOverlay 
            level={currentLevel} 
            status={status} 
            isWrongAnswer={isWrongAnswer} 
            currentQuestionIdx={currentQuestionIdx} 
            onAnswer={handleAnswer} 
            onPinSubmit={handlePinSubmit}
            onClose={() => setStatus(status === 'PIN_ENTRY' ? 'CABINET_UNLOCKED' : 'EXPLORING')} 
            onRestart={handleRestart} 
            onContinue={handleContinueAfterPromo}
          />

          {systemMessage && (
            <div className="absolute top-20 sm:top-28 left-1/2 -translate-x-1/2 w-[85%] sm:w-[90%] md:w-full md:max-w-sm px-3 sm:px-4 z-[40] pointer-events-none">
              <div className="bg-white border border-slate-200 p-2 sm:p-3 text-center shadow-xl rounded-sm">
                <p className="text-slate-900 text-[8px] sm:text-[9px] font-bold tracking-widest uppercase animate-pulse">{systemMessage}</p>
              </div>
            </div>
          )}

          <div className="absolute top-3 sm:top-4 md:top-8 left-3 sm:left-4 md:left-8 pointer-events-none">
            <h1 className="text-slate-900 text-lg sm:text-xl md:text-2xl font-black italic tracking-tighter" style={{ color: currentLevel.themeColor }}>LVL 0{currentLevel.id}</h1>
          </div>
        </>
      )}
    </div>
  );
}
