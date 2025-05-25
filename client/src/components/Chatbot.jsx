import { useState } from "react";
import "../styles/Chatbot.css";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { type: "user", text: userInput }];
    setMessages(newMessages);

    try {
      const res = await axios.post("http://localhost:5000/ai/question", {
        question: userInput,
      });

      setMessages((prev) => [...prev, { type: "bot", text: res.data.answer }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Sorry, an error occurred." },
      ]);
    }

    setUserInput("");
  };

  return (
    <div className="chatbot">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
