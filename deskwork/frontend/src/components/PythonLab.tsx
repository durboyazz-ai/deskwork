import { useState } from 'react';
import axios from 'axios';
import MonacoEditor from '@monaco-editor/react';

export default function PythonLab({ missionId }: { missionId: number }) {
  const [code, setCode] = useState(`import pandas as pd\nprint("Hello Deskworks")`);
  const [stdout, setStdout] = useState("");
  const [stderr, setStderr] = useState("");

  const run = async () => {
    try {
      const res = await axios.post(`/api/missions/${missionId}/python`, { code });
      setStdout(res.data.stdout);
      setStderr(res.data.stderr);
    } catch (e: any) {
      setStderr(e.response?.data?.detail || e.message);
    }
  };

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column" }}>
      <MonacoEditor
        language="python"
        value={code}
        onChange={(v)=>setCode(v||'')}
        options={{ fontSize:14, minimap:{enabled:false} }}
        theme="vs-dark"
        style={{ height:"45%" }}
      />
      <button onClick={run}>Run</button>
      <div style={{ flex:1, display:"flex", gap:"10px" }}>
        <textarea readOnly value={stdout} style={{width:"50%", background:"#111", color:"lime"}}/>
        <textarea readOnly value={stderr} style={{width:"50%", background:"#222", color:"red"}}/>
      </div>
    </div>
  );
}
