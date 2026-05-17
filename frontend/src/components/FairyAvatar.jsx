import { useState, useEffect } from 'react'
import fairyGif from "../assets/images/fairy-gif-4.gif";
function FairyAvatar({ isListening, isSpeaking, isLoading }) {
  const [wingPhase, setWingPhase] = useState(0)
  const [talkPhase, setTalkPhase] = useState(0)
  const [phase, setPhase] = useState('entering')

  useEffect(() => {
    const directions = ['flyInFromTop', 'flyInFromBottom', 'flyInFromLeft', 'flyInFromRight']
    const randomDir = directions[Math.floor(Math.random() * 4)]



    const style = document.createElement('style')
    style.id = 'fairy-animations'
    style.textContent = `
      @keyframes flyInFromTop {
        0% { transform: translateY(-500px) scale(0.1); opacity: 0; }
        50% { transform: translateY(30px) scale(1.1); opacity: 1; }
        75% { transform: translateY(-15px) scale(0.95); }
        100% { transform: translateY(0) scale(1); opacity: 1; }
      }
      @keyframes flyInFromBottom {
        0% { transform: translateY(500px) scale(0.1); opacity: 0; }
        50% { transform: translateY(-30px) scale(1.1); opacity: 1; }
        75% { transform: translateY(15px) scale(0.95); }
        100% { transform: translateY(0) scale(1); opacity: 1; }
      }
      @keyframes flyInFromLeft {
        0% { transform: translateX(-500px) scale(0.1); opacity: 0; }
        50% { transform: translateX(30px) scale(1.1); opacity: 1; }
        75% { transform: translateX(-15px) scale(0.95); }
        100% { transform: translateX(0) scale(1); opacity: 1; }
      }
      @keyframes flyInFromRight {
        0% { transform: translateX(500px) scale(0.1); opacity: 0; }
        50% { transform: translateX(-30px) scale(1.1); opacity: 1; }
        75% { transform: translateX(15px) scale(0.95); }
        100% { transform: translateX(0) scale(1); opacity: 1; }
      }
      @keyframes floatAnim {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-25px); }
      }
    `
    document.head.appendChild(style)

    setTimeout(() => {
      setPhase('floating')
    }, 1500)

    return () => {
      const existingStyle = document.getElementById('fairy-animations')
      if (existingStyle) document.head.removeChild(existingStyle)
    }
  }, [])

 const getAnimation = () => {
  if (phase === "entering") {
    // Fairy lands while spinning
    return "fairyLanding 2.5s ease-out forwards"
  }

  // After landing, fairy gently floats
  return "floatAnim 3s ease-in-out infinite"
}

  const containerStyle = {
    animation: getAnimation(),
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setWingPhase(prev => (prev + 1) % 4)
    }, 150)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isSpeaking) {
      const interval = setInterval(() => {
        setTalkPhase(prev => (prev + 1) % 6)
      }, 100)
      return () => clearInterval(interval)
    } else {
      setTalkPhase(0)
    }
  }, [isSpeaking])

  const getStatusText = () => {
    if (isLoading) return '✨ Thinking...'
    if (isListening) return '👂 Listening...'
    if (isSpeaking) return '💬 Talking...'
    return '💫 Tap & talk!'
  }

  const getMouthShape = () => {
    switch (talkPhase) {
      case 0: return 'w-3 h-3'
      case 1: return 'w-4 h-3'
      case 2: return 'w-5 h-4'
      case 3: return 'w-4 h-4 rounded-full'
      case 4: return 'w-3 h-3'
      default: return 'w-3 h-3'
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div id="fairy-container" className="relative pointer-events-none" style={containerStyle}>
        <div className={`relative w-96 h-96 rounded-full ${isListening ? 'voice-pulse' : ''} ${isSpeaking ? 'animate-bounce' : ''}`}>
          <div className={`absolute inset-0 rounded-full fairy-glow ${isSpeaking ? 'animate-pulse' : ''}`}>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400  to-black-500 opacity-90"></div>
          </div>

          <div className="absolute inset-0 rounded-full  flex flex-col items-center justify-center overflow-visible">
            <div className="text-[20rem] leading-none overflow-visible">
              <img
  src={fairyGif}
  alt="Fairy"
  className="w-[30rem] h-[30rem] object-contain -mt-8"
  style={{ cursor: 'pointer', pointerEvents: 'auto' }}
  onClick={(e) => {
    e.stopPropagation()
    const audio = new Audio('/entry.mp3')
    audio.volume = 0.6
    audio.currentTime = 15
    audio.play().catch(e => {})
    setTimeout(() => { audio.pause(); audio.currentTime = 0 }, 5500)
  }}
/>
            </div>

            {isSpeaking && (
              <div className="absolute bottom-24 flex items-end justify-center gap-1">
                <div className={`bg-white/60 rounded-full transition-all duration-100 ${getMouthShape()}`}></div>
              </div>
            )}

            {isSpeaking && (
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
                <div className="w-3 h-3 bg-amber-300 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-amber-300 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-amber-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              </div>
            )}
          </div>


          <div className="absolute -top-6 -right-6 w-8 h-8 bg-yellow-300 rounded-full animate-ping"></div>
          <div className="absolute -bottom-6 -left-6 w-7 h-7 bg-green-300 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
          <div className="absolute top-4 -left-8 w-5 h-5 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
        </div>

        <div className="absolute -inset-8 rounded-full border-2 border-pink-400/40 animate-glow"></div>
      </div>

      <div className="mt-8 text-center">
        <span className={`text-3xl font-bold ${isListening ? 'text-pink-400' : isSpeaking ? 'text-green-400' : 'text-yellow-300'}`}>
          {getStatusText()}
        </span>
      </div>
    </div>
  )
}

export default FairyAvatar