import { useState } from 'react';
import Spreadsheet from './Spreadsheet';
import SqlLab from './SqlLab';
import PythonLab from './PythonLab';
import VizStudio from './VizStudio';
import Notebook from './Notebook';

export default function Workstation({
  missionId,
  onClose,
}: {
  missionId: number;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<'spreadsheet' | 'sql' | 'python' | 'viz' | 'note'>('spreadsheet');

  return (
    <div style={{
      position:'fixed',
      top:0,left:0,width:"100vw",height:"100vh",
      backgroundColor:"rgba(0,0,0,.8)",
      display:"flex",
      flexDirection:"column"
    }}>
      {/* header */}
      <div style={{background:"#222",color:"white",padding:"10px"}}>
        Deskworks – Mission {missionId}
        <button onClick={onClose} style={{float:"right"}}>✕</button>
      </div>

      {/* tabs */}
      <div style={{display:"flex",background:"#333",color:"white"}}>
        {['spreadsheet','sql','python','viz','note'].map(t=>(
          <button
            key={t}
            onClick={()=>setTab(t as any)}
            style={{
              flex:1,
              padding:"10px",
              background:t===tab?"#555":"transparent",
              border:"none"
            }}
          >{t}</button>
        ))}
      </div>

      {/* content */}
      <div style={{flex:1,overflow:"auto"}}>
        {tab==='spreadsheet' && <Spreadsheet missionId={missionId} />}
        {tab==='sql' && <SqlLab missionId={missionId} />}
        {tab==='python' && <PythonLab missionId={missionId} />}
        {tab==='viz' && <VizStudio missionId={missionId} />}
        {tab==='note' && <Notebook missionId={missionId} />}
      </div>
    </div>
  );
}
