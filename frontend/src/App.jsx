import { useState, useRef, useEffect } from 'react'
import FairyAvatar from './components/FairyAvatar'
import ChatInterface from './components/ChatInterface'
import backgroundGif from "./assets/images/bg.gif";

const API_URL = import.meta.env.VITE_API_URL || '';

function App() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', content: '✨ Hello! I\'m your magical fairy friend! Tap the mic to talk to me, or click the chat button to type. Let\'s chat!' }
  ])
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [showChat, setShowChat] = useState(false)
  const recognitionRef = useRef(null)
  const transcriptRef = useRef('')

  

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported')
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices()
      window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices()
        console.log('Voices loaded:', voices.map(v => `${v.name} (${v.gender})`))
      }
    }
  }, [])

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in your browser. Please try Chrome.')
      return
    }

    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.continuous = true
    recognitionRef.current.interimResults = true

    recognitionRef.current.onstart = () => {
      setIsListening(true)
      setTranscript('')
    }

    recognitionRef.current.onresult = (event) => {
      let finalTranscript = ''
      let interimTranscript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript
        } else {
          interimTranscript += transcript
        }
      }
      const final = finalTranscript || interimTranscript
      transcriptRef.current = final
      setTranscript(final)
      if (final && event.results[event.resultIndex].isFinal) {
        setTimeout(() => {
          recognitionRef.current.stop()
        }, 100)
      }
    }

    recognitionRef.current.onend = () => {
      setIsListening(false)
      if (transcriptRef.current?.trim()) {
        handleSendMessage(transcriptRef.current.trim())
        transcriptRef.current = ''
      }
    }

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
    }

    recognitionRef.current.start()
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const handleSendMessage = async (text) => {
    const userMessage = { id: Date.now(), role: 'user', content: text }
    setMessages(prev => [...prev, userMessage])
    setTranscript('')
    setIsLoading(true)

    const currentMessages = [
      { id: 1, role: 'ai', content: '✨ Hello! I\'m your magical fairy friend! Tap the mic to talk to me, or click the chat button to type. Let\'s chat!' },
      userMessage
    ]

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: currentMessages })
      })

      const data = await response.json()
      console.log('API Response:', data)
      const aiResponse = data.response || data.content || '✨ Something magical happened! ✨'
      const aiMessage = { id: Date.now() + 1, role: 'ai', content: aiResponse }
      setMessages(prev => [...prev, aiMessage])

      speakText(aiResponse)
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = { id: Date.now() + 1, role: 'ai', content: '✨ Oops! Something magical went wrong. Please try again, dear! ✨' }
      setMessages(prev => [...prev, errorMessage])
    }

    setIsLoading(false)
  }

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported')
      return
    }

    window.speechSynthesis.cancel()

    const textWithoutEmojis = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')

    const utterance = new SpeechSynthesisUtterance(textWithoutEmojis)
    utterance.rate = 0.85
    utterance.pitch = 1.4
    utterance.volume = 1

    const chooseVoice = () => {
      const voices = window.speechSynthesis.getVoices()
      
      const femaleOnly = voices.filter(v => 
        v.gender === 'female' || 
        (v.name.toLowerCase().includes('samantha') && !v.name.toLowerCase().includes('male')) ||
        v.name.toLowerCase().includes('zira') ||
        v.name.toLowerCase().includes('victoria') ||
        v.name.toLowerCase().includes('karen') ||
        v.name.toLowerCase().includes('heidi') ||
        v.name.toLowerCase().includes('maria') ||
        v.name.toLowerCase().includes('monica') ||
        v.name.toLowerCase().includes('olivia') ||
        v.name.toLowerCase().includes('emma') ||
        v.name.toLowerCase().includes('allison') ||
        v.name.toLowerCase().includes('tessa')
      )

      const safeVoices = voices.filter(v => 
        !v.name.toLowerCase().includes('male') &&
        !v.name.toLowerCase().includes('david') &&
        !v.name.toLowerCase().includes('mark') &&
        !v.name.toLowerCase().includes('james') &&
        !v.name.toLowerCase().includes('alex') &&
        !v.name.toLowerCase().includes('daniel') &&
        !v.name.toLowerCase().includes('richard') &&
        !v.name.toLowerCase().includes('john') &&
        !v.name.toLowerCase().includes('thomas') &&
        !v.name.toLowerCase().includes('carlos') &&
        !v.name.toLowerCase().includes('diego') &&
        !v.name.toLowerCase().includes('michael') &&
        !v.name.toLowerCase().includes('paul') &&
        !v.name.toLowerCase().includes('peter') &&
        !v.name.toLowerCase().includes('ryan') &&
        !v.name.toLowerCase().includes('sam') &&
        !v.name.toLowerCase().includes('william') &&
        !v.name.toLowerCase().includes('benjamin') &&
        !v.name.toLowerCase().includes('owen') &&
        !v.name.toLowerCase().includes('gregory')
      )

      let voice = null
      if (femaleOnly.length > 0) {
        voice = femaleOnly[0]
      } else if (safeVoices.length > 0) {
        voice = safeVoices.find(v => v.lang && v.lang.startsWith('en')) || safeVoices[0]
      }

      if (voice) {
        console.log('Selected voice:', voice.name, '- gender:', voice.gender)
        return voice
      }
      
      console.log('No safe voice found, available:', voices.map(v => v.name))
      return null
    }

    const voice = chooseVoice()
    if (voice) {
      utterance.voice = voice
    }
    utterance.pitch = 1.4

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden" 
    style={{
    backgroundImage: `url(${backgroundGif})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}>
      <div>
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
        {/* <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-pink-500/20 to-transparent"></div> */}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center overflow-visible">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
            TECHYA
          </h1>
          <p className="text-white/60 text-sm mt-1">Your Magical Fairy Companion</p>
        </div>
        <div className="flex-1 flex items-center justify-center overflow-visible">
          <div className="overflow-visible" style={{ transform: 'scale(1.0)', marginBottom: '-40px' }}>
            <FairyAvatar
              isListening={isListening}
              isSpeaking={isSpeaking}
              isLoading={isLoading}
            />
          </div>
        </div>

        <div className="w-full max-w-sm px-4" style={{zIndex: 1000}}>
          <div className={`transition-all duration-300 ${showChat ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none absolute -bottom-4'}`}>
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              transcript={transcript}
              isListening={isListening}
              onVoiceToggle={handleVoiceToggle}
              isLoading={isLoading}
            />
          </div>
        </div>

        <button
          onClick={handleVoiceToggle}
          disabled={isLoading}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-20 h-20 rounded-full shadow-2xl flex items-center justify-center transition-all ${
            isListening
              ? 'bg-red-500 animate-pulse shadow-red-500/50'
              : 'bg-gradient-to-r from-yellow-400 to-pink-500 hover:scale-110 shadow-yellow-500/50'
          }`}
        >
          {isListening ? (
            <div className="w-8 h-8 bg-white rounded-sm"></div>
          ) : (
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1 1.93c-3.94-.49-7-3.85-7-7.93h2c0 3.31 2.69 6 6 6s6-2.69 6-6h2c0 4.08-3.06 7.44-7 7.93V20h4v2H8v-2h4v-4.07z"/>
            </svg>
          )}
        </button>
      </div>

      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-lg shadow-pink-500/50 flex items-center justify-center hover:scale-110 transition-transform"
      >
        {showChat ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      <div className="fixed bottom-2 left-0 right-0 text-center text-white/40 text-xs " style={{zIndex: 1000}}>
        <span className="mx-2 cursor-pointer" >
          <a href="/privacy" className="hover:text-pink-400 transition-colors">Privacy Policy</a>
        </span>
        <span className="mx-2">|</span>
        <span className="mx-2 cursor-pointer">
          <a href="/terms" className="hover:text-pink-400 transition-colors">Terms & Conditions</a>
        </span>
        <span className="mx-2">|</span>
        <span className="mx-2 cursor-pointer">
         <a href="https://www.linkedin.com/in/saumya-bisht" target="_blank" className="hover:text-pink-400 transition-colors">
         © 2026 TECHYA by Saumya Bisht</a>
        </span>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default App