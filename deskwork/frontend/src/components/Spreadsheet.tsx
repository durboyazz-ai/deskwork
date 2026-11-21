import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Spreadsheet({ missionId }: { missionId: number }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Load all CSVs into a single table called "sales" for demo
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        // fetch the CSV via backend (or serve it directly from public/)
        const res = await axios.get(`/api/missions/${missionId}/csv/sales`);
        setData(res.data); // array of rows
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    load();
  }, [missionId]);

  if (loading) return <p>Loading data…</p>;

  return (
    <div style={{ padding: "10px" }}>
      <h3>Sales Data</h3>
      <table border={1} cellPadding={4}>
        <thead>
          <tr>{data[0] && Object.keys(data[0]).map(k => <th key={k}>{k}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((v, j) => <td key={j}>{v}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
