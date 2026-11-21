-- users
CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    username    TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    email       TEXT UNIQUE NOT NULL,
    created_at  TIMESTAMP DEFAULT NOW()
);

-- missions
CREATE TABLE missions (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,          -- e.g. "Café Operations"
    description TEXT,
    data_path   TEXT NOT NULL           -- path to CSV folder in assets/
);

-- user_progress (one row per user/mission)
CREATE TABLE user_progress (
    id              SERIAL PRIMARY KEY,
    user_id         INT REFERENCES users(id) ON DELETE CASCADE,
    mission_id      INT REFERENCES missions(id),
    stage           INT DEFAULT 0,        -- 0=not started, 1..N stages
    xp              INT DEFAULT 0,
    reputation      INT DEFAULT 0,
    UNIQUE(user_id, mission_id)
);

-- sandbox_data (temporary table for the active mission)
CREATE TABLE sandbox_data (
    user_id   INT REFERENCES users(id) ON DELETE CASCADE,
    table_name TEXT NOT NULL,
    data     JSONB          -- raw CSV row as JSON
);
