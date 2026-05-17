function ChatBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`message-bubble ${isUser ? 'user-message' : 'ai-message'}`}>
        <p className="text-sm md:text-base">{message.content}</p>
        {!isUser && (
          <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-fairy-pink rotate-45"></div>
        )}
        {isUser && (
          <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-fairy-blue rotate-45"></div>
        )}
      </div>
    </div>
  )
}

export default ChatBubble