import { useState } from 'react';

export default function Notebook({ missionId }: { missionId: number }) {
  const [notes, setNotes] = useState("");

  return (
    <div style={{padding:"10px"}}>
      <h3>Knowledge Notebook</h3>
      <textarea
        value={notes}
        onChange={(e)=>setNotes(e.target.value)}
        style={{width:"100%",height:"80%"}} />
    </div>
  );
}
