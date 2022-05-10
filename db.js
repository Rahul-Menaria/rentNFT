const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "root@123",
  host: "localhost",
  port: 5432,
  database: "nftRent"
});

module.exports = pool;