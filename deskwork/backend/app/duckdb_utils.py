from fastapi import APIRouter, Depends, HTTPException
import duckdb

from ..schemas.mission import (
    SqlRequest,
    SqlResponse,
    PythonRequest,
    PythonResponse,
)
from ..deps import get_user_id, get_db
from ..duckdb_utils import load_mission_sandbox, run_python_in_sandbox

router = APIRouter()

@router.get("/{mission_id}")
def mission_info(mission_id: int):
    # in a real app you would query the DB; for demo we hard‑code
    if mission_id != 1:
        raise HTTPException(status_code=404, detail="Mission not found")
    return {
        "id": 1,
        "name": "Café Operations",
        "description": "Investigate why profits are falling.",
        "data_path": "./frontend/src/assets/missions/cafe/",
    }

@router.post("/{mission_id}/sql", response_model=SqlResponse)
def run_sql(
    mission_id: int,
    payload: SqlRequest,
    user_id: int = Depends(get_user_id),
):
    # Load data into a per‑user DuckDB instance (in memory)
    con = load_mission_sandbox(mission_id, user_id)
    try:
        res_df = con.execute(payload.query).fetchdf()
        return {"rows": res_df.to_dict(orient="records")}
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc))

@router.post("/{mission_id}/python", response_model=PythonResponse)
def run_python(
    mission_id: int,
    payload: PythonRequest,
    user_id: int = Depends(get_user_id),
):
    output, errors = run_python_in_sandbox(payload.code, mission_id, user_id)
    return {"stdout": output, "stderr": errors}
