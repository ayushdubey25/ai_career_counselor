import "../styles/ChatPage.css";
import { useState, useRef, useEffect } from "react";
import { FiSend, FiUser } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI Career Counselor. How can I help you with your career questions today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("https://api.cohere.ai/v1/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_COHERE_API_KEY}`,
        },
        body: JSON.stringify({
          model: "command-r", // or "command-r-plus" if your key supports it
          message: input,
          chat_history: newMessages
            .filter((msg) => msg.role !== "system")
            .map((msg) => ({
              role: msg.role === "user" ? "USER" : "CHATBOT",
              message: msg.content,
            })),
        }),
      });

      const data = await res.json();

      const botReply = {
        role: "assistant",
        content: data.text || "Sorry, I didn't get that.",
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-title">
          <RiRobot2Line className="chat-icon" />
          <h2>AI Career Counselor</h2>
        </div>
        <p className="chat-subtitle">
          Ask me anything about careers, skills, or job opportunities
        </p>
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${
              msg.role === "user" ? "user-message" : "bot-message"
            }`}
          >
            <div className="message-avatar">
              {msg.role === "user" ? (
                <FiUser className="user-avatar" />
              ) : (
                <RiRobot2Line className="bot-avatar" />
              )}
            </div>
            <div className="message-content">
              <div className="message-role">
                {msg.role === "user" ? "You" : "Career AI"}
              </div>
              <div className="message-text">
                {msg.content.split("\n").map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message bot-message">
            <div className="message-avatar">
              <RiRobot2Line className="bot-avatar" />
            </div>
            <div className="message-content">
              <div className="message-role">Career AI</div>
              <div className="message-text">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me about your career..."
            rows="1"
            className="chat-input"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="send-button"
          >
            <FiSend className="send-icon" />
          </button>
        </div>
        <p className="input-hint">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};

export default ChatPage;
