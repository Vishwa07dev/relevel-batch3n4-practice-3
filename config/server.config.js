if (process.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  PORT: process.env.PORT,
  secretKey: process.env.secretKey,
  db_url: process.env.db_URL,
};
