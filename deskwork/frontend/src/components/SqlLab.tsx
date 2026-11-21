import { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';

export const SqlLab = ({ missionId }: { missionId: number }) => {
  const [code, setCode] = useState("SELECT * FROM sales LIMIT 5;");
  const [result, setResult] = useState<any[]>([]);
  const [error, setError] = useState("");

  const runQuery = async () => {
    try {
      const res = await fetch(`/api/missions/${missionId}/sql`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: code }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setResult(data.rows);
      setError("");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="sql-lab">
      <MonacoEditor
        height="300px"
        defaultLanguage="sql"
        value={code}
        onChange={(v) => setCode(v ?? "")}
      />
      <button onClick={runQuery}>Run</button>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>{result[0] && Object.keys(result[0]).map(k => <th key={k}>{k}</th>)}</tr>
        </thead>
        <tbody>
          {result.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((v, j) => <td key={j}>{v}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
