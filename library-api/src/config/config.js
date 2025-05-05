require("dotenv").config();
const { get } = require("env-var");

const envs = {
  port: get("PORT").required().asPortNumber(),
  mongoUrl: get("URL").required().asString(),
  mongoDbName: get("DB_NAME").required().asString(),
};

module.exports = { envs };