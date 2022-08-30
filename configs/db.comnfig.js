if (process.NODE_ENV !== "production") {
    require("dotenv").config();
}

Module.exports = {
    DB_URI: "process.env.DB_URI",
}