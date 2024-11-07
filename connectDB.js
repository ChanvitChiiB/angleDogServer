const { Pool } = require("pg");

const user = "postgres.ptbpzobcayznfdfbiskw";
const host = "aws-0-ap-southeast-1.pooler.supabase.com";
const database = "postgres";
const password = "x4Yiq9TDPso6G4jc";
const port = 6543;

const pool = new Pool({
  user,
  host,
  database,
  password,
  port,
});

module.exports = pool;


