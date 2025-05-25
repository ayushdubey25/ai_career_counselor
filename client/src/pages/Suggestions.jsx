import { useEffect, useState } from "react";
import axios from "axios";

const Suggestions = () => {
  const [data, setData] = useState({
    colleges: [],
    alternatives: [],
    skills: [],
  });

  useEffect(() => {
    axios.get("http://localhost:5000/ai/suggestcollege").then((res) => {
      setData((prev) => ({ ...prev, colleges: res.data }));
    });

    axios.get("http://localhost:5000/ai/suggestalternatives").then((res) => {
      setData((prev) => ({ ...prev, alternatives: res.data }));
    });

    axios.get("http://localhost:5000/ai/suggestskills").then((res) => {
      setData((prev) => ({ ...prev, skills: res.data }));
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Suggestions</h2>
      <div>
        <h3 className="text-lg mt-4 font-semibold">Top Colleges</h3>
        <ul>
          {data.colleges.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>

        <h3 className="text-lg mt-4 font-semibold">Alternative Careers</h3>
        <ul>
          {data.alternatives.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>

        <h3 className="text-lg mt-4 font-semibold">Skills to Learn</h3>
        <ul>
          {data.skills.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Suggestions;
