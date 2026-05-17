import { useRef, useEffect, useState } from 'react'
import ChatBubble from './ChatBubble'

function ChatInterface({ messages, onSendMessage, transcript, isListening, onVoiceToggle, isLoading }) {
  const [inputText, setInputText] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText.trim())
      setInputText('')
    }
  }

  return (
    <div className="w-full">
      <div className="glass-card p-4 mb-4">
        <div className="h-48 overflow-y-auto mb-3 space-y-2">
          {messages.slice(-5).map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}

          {transcript && (
            <div className="flex justify-end">
              <div className="message-bubble user-message">
                <span className="opacity-70 text-sm">🎤 {transcript}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Bolo na..."
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/30 transition-all text-sm"
          />

          <button
            type="button"
            onClick={onVoiceToggle}
            disabled={isLoading}
            className={`p-2.5 rounded-full transition-all ${
              isListening
                ? 'bg-pink-500 text-white voice-pulse'
                : 'bg-purple-500/70 text-white hover:bg-purple-500'
            } disabled:opacity-50`}
          >
            {isListening ? (
              <span className="w-4 h-4 bg-white rounded-sm block"></span>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1 1.93c-3.94-.49-7-3.85-7-7.93h2c0 3.31 2.69 6 6 6s6-2.69 6-6h2c0 4.08-3.06 7.44-7 7.93V20h4v2H8v-2h4v-4.07z"/>
              </svg>
            )}
          </button>

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatInterface