from fastapi import APIRouter, Depends, HTTPException, Body
import duckdb
import json
from ..schemas import SqlRequest, SqlResponse
from ..deps import get_user_id

router = APIRouter(prefix="/missions/{mission_id}")

@router.post("/sql", response_model=SqlResponse)
def run_sql(
    mission_id: int,
    payload: SqlRequest,
    user_id: int = Depends(get_user_id),
):
    """
    Execute a SQL query against the mission's DuckDB instance.
    The request body contains:
        { "query": "SELECT * FROM sales LIMIT 10;" }
    """
    try:
        con = duckdb.connect(database=f"data/mission_{mission_id}_{user_id}.duckdb")
        res = con.execute(payload.query).fetchdf()
        return SqlResponse(rows=res.to_dict(orient="records"))
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc))
