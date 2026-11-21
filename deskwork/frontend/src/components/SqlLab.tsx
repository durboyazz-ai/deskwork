import { useState } from 'react';
import axios from 'axios';
import MonacoEditor from '@monaco-editor/react';

export default function SqlLab({ missionId }: { missionId: number }) {
  const [query, setQuery] = useState("SELECT * FROM sales LIMIT 10;");
  const [result, setResult] = useState<any[]>([]);
  const [error, setError] = useState("");

  const run = async () => {
    try {
      const res = await axios.post(`/api/missions/${missionId}/sql`, { query });
      setResult(res.data.rows);
      setError("");
    } catch (e: any) {
      setError(e.response?.data?.detail || e.message);
    }
  };

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column" }}>
      <MonacoEditor
        language="sql"
        value={query}
        onChange={(v)=>setQuery(v||'')}
        options={{ fontSize:14, minimap:{enabled:false} }}
        theme="vs-dark"
        style={{ height:"40%" }}
      />
      <button onClick={run}>Run</button>
      {error && <pre style={{color:'red'}}>{error}</pre>}
      <div style={{ flex:1, overflow:"auto" }}>
        {result.length>0 ? (
          <table border={1} cellPadding={4}>
            <thead>
              <tr>{Object.keys(result[0]).map(k=><th key={k}>{k}</th>)}</tr>
            </thead>
            <tbody>
              {result.map((row,i)=>(
                <tr key={i}>{Object.values(row).map(v=> <td key={v}>{v}</td>)}</tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No results</p>
        )}
      </div>
    </div>
  );
}
