import { useState } from "react";
import axios from "axios";

const QuestionForm = () => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/ai/question", {
      answer,
    });
    alert("Response submitted: " + res.data.message);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="What subjects or activities do you enjoy?"
        className="w-full p-2 border"
      />
      <button type="submit" className="mt-2 bg-purple-500 text-white p-2">
        Submit
      </button>
    </form>
  );
};

export default QuestionForm;
