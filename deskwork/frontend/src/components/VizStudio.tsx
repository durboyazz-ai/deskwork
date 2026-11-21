import { useState, useEffect } from 'react';
import axios from 'axios';
import Plotly from 'plotly.js-basic-dist-min';

export default function VizStudio({ missionId }: { missionId: number }) {
  const [chartData, setChartData] = useState<any[]>([]);
  const [error, setError] = useState("");

  // Example: revenue by branch
  useEffect(() => {
    async function load() {
      try {
        const res = await axios.post(`/api/missions/${missionId}/sql`, { query: `
          SELECT branch, SUM(selling_price * quantity) AS rev
          FROM sales GROUP BY branch ORDER BY rev DESC;
        `});
        setChartData(res.data.rows);
      } catch (e:any) {
        setError(e.response?.data?.detail || e.message);
      }
    }
    load();
  }, [missionId]);

  useEffect(() => {
    if (!chartData.length) return;
    const data = [{
      x: chartData.map(r=>r.branch),
      y: chartData.map(r=>r.rev),
      type: 'bar'
    }];
    Plotly.newPlot('plot', data, { title:"Revenue by Branch" });
  }, [chartData]);

  return (
    <div style={{padding:"10px"}}>
      <h3>Dashboard Builder (demo)</h3>
      {error && <p style={{color:'red'}}>{error}</p>}
      <div id="plot" style={{width:"100%",height:"400px"}}></div>
    </div>
  );
}
