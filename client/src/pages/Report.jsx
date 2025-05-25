import { useEffect, useState } from "react";
import axios from "axios";

const Report = () => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/ai/report").then((res) => {
      setReport(res.data);
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Your Career Analysis Report</h2>
      <pre>{JSON.stringify(report, null, 2)}</pre>
    </div>
  );
};

export default Report;
