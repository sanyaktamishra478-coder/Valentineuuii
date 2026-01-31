
import React, { useState } from 'react';
import { Step, ValentineState } from './types';
import HeartsBackground from './components/HeartsBackground';
import { generateValentineMessage } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<ValentineState>({
    step: Step.INITIAL,
    yesScale: 1,
    noScale: 1,
    noCount: 0,
    aiMessage: '',
    isLoading: false,
  });
  
  const [showCopied, setShowCopied] = useState(false);

  const noPhrases = [
    "No",
    "Are you sure?",
    "Really sure??",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely sure?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
  ];

  const handleNoClick = () => {
    setState(prev => ({
      ...prev,
      noCount: prev.noCount + 1,
      yesScale: prev.yesScale + 0.35,
      noScale: Math.max(0.3, prev.noScale - 0.1),
    }));
  };

  const handleYesClick = async () => {
    if (state.step === Step.INITIAL) {
      setState(prev => ({ ...prev, step: Step.PROPOSAL, yesScale: 1, noScale: 1, noCount: 0 }));
    } else if (state.step === Step.PROPOSAL) {
      setState(prev => ({ ...prev, isLoading: true }));
      const msg = await generateValentineMessage();
      setState(prev => ({
        ...prev,
        step: Step.SUCCESS,
        aiMessage: msg,
        isLoading: false
      }));
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
  };

  const renderContent = () => {
    switch (state.step) {
      case Step.INITIAL:
        return (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <h1 className="text-2xl md:text-4xl font-bold text-red-600 text-center mb-8 drop-shadow-sm">
              Hey! I made something for you<br />do you wanna see???
            </h1>
            <div className="relative mb-12">
              <img 
                src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp1NHN4ZHFpMXR1Y2N4dnB5ZHB2Mjh3bnY4emZleWVqYXFicGljbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MDJ9IbxxvDUQM/giphy.gif" 
                alt="Cute Cat" 
                className="w-64 h-64 object-contain drop-shadow-xl rounded-full"
              />
              <div className="absolute -bottom-4 -left-4 animate-bounce">
                 <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHU3MHN0NHBnd3R3ZHFpMXR1Y2N4dnB5ZHB2Mjh3bnY4emZleWVqYXFicGljbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/fTszY22G9qH34l6Bq4/giphy.gif" alt="flowers" className="w-20" />
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <button
                onClick={handleYesClick}
                className="bg-pink-300 hover:bg-pink-400 text-red-700 font-bold py-3 px-10 rounded-full border-2 border-pink-200 shadow-lg transition-all active:scale-95"
              >
                Yes
              </button>
              <button
                onClick={() => alert("Oh come on! It's cute! Click Yes! ❤️")}
                className="bg-red-50 hover:bg-red-100 text-red-400 font-bold py-2 px-6 rounded-full border border-red-100 transition-all opacity-70"
              >
                No
              </button>
            </div>
            <div className="mt-8 flex flex-col items-center">
              <span className="text-pink-400 font-medium text-xs mb-1">PLEASE ✨</span>
              <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2Q3eG50NHBnd3R3ZHFpMXR1Y2N4dnB5ZHB2Mjh3bnY4emZleWVqYXFicGljbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/8m4R4gvGURBv28yX8l/giphy.gif" alt="Please bear" className="w-16" />
            </div>
          </div>
        );

      case Step.PROPOSAL:
        return (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <h1 className="text-3xl md:text-5xl font-bold text-red-600 text-center mb-8">
              Will you be my Valentine? 💖
            </h1>
            <div className="mb-12 h-64 flex items-center justify-center">
              <img 
                src={state.noCount > 0 
                  ? "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHN0NHBnd3R3ZHFpMXR1Y2N4dnB5ZHB2Mjh3bnY4emZleWVqYXFicGljbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/KztT2c4u8mYYUiCi7W/giphy.gif" 
                  : "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHN0NHBnd3R3ZHFpMXR1Y2N4dnB5ZHB2Mjh3bnY4emZleWVqYXFicGljbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/v8Y8V03Jq2xS/giphy.gif"
                } 
                alt="Asking cat" 
                className="w-64 object-contain rounded-2xl"
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 px-4">
              <button
                onClick={handleYesClick}
                style={{ transform: `scale(${state.yesScale})` }}
                className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-4 px-12 rounded-full shadow-xl transition-all z-10 whitespace-nowrap"
              >
                {state.isLoading ? "Loading..." : "Yes! ❤️"}
              </button>
              <button
                onClick={handleNoClick}
                style={{ 
                  transform: `scale(${state.noScale})`,
                  opacity: Math.max(0.1, state.noScale)
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold py-2 px-8 rounded-full border border-gray-200 transition-all whitespace-nowrap"
              >
                {noPhrases[Math.min(state.noCount, noPhrases.length - 1)]}
              </button>
            </div>
          </div>
        );

      case Step.SUCCESS:
        return (
          <div className="flex flex-col items-center text-center max-w-lg mx-auto animate-in fade-in zoom-in duration-700">
            <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-6">YAYYY! 🎉</h1>
            <div className="mb-8 p-6 bg-white rounded-3xl shadow-inner border-2 border-pink-100 relative w-full">
               <div className="absolute -top-6 -right-6">
                 <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHN0NHBnd3R3ZHFpMXR1Y2N4dnB5ZHB2Mjh3bnY4emZleWVqYXFicGljbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/l41lTfuxV5wun9eG4/giphy.gif" alt="heart" className="w-12" />
               </div>
              <p className="text-xl md:text-2xl text-pink-800 leading-relaxed font-semibold italic">
                "{state.aiMessage}"
              </p>
            </div>
            <img 
              src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHN0NHBnd3R3ZHFpMXR1Y2N4dnB5ZHB2Mjh3bnY4emZleWVqYXFicGljbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/UVk5yzljef0K4/giphy.gif" 
              alt="Happy cat" 
              className="w-72 rounded-2xl shadow-xl mb-8"
            />
            
            <div className="flex flex-col gap-4 items-center">
              <button
                onClick={handleShare}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all flex items-center gap-2"
              >
                <span>{showCopied ? "Link Copied! 💝" : "Share the Love 💌"}</span>
              </button>
              
              <button 
                onClick={() => setState(prev => ({ ...prev, step: Step.INITIAL, noCount: 0, yesScale: 1, noScale: 1 }))}
                className="text-pink-400 hover:text-pink-600 underline font-medium text-sm"
              >
                Create your own
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
      <HeartsBackground />
      <main className="relative z-10 w-full max-w-4xl flex justify-center items-center py-10">
        <div className="bg-white/40 backdrop-blur-md border border-white/60 p-8 md:p-16 rounded-[40px] shadow-2xl w-full">
          {renderContent()}
        </div>
      </main>
      
      {/* Decorative corners */}
      <div className="fixed top-4 left-4 text-4xl opacity-50">✨</div>
      <div className="fixed top-4 right-4 text-4xl opacity-50">💖</div>
      <div className="fixed bottom-4 left-4 text-4xl opacity-50">💌</div>
      <div className="fixed bottom-4 right-4 text-4xl opacity-50">🧸</div>
    </div>
  );
};

export default App;
