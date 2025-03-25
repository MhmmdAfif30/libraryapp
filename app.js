require("dotenv").config();
const swaggerUI = require("swagger-ui-express");
const express = require("express");
const app = express();
const YAML = require("yaml");

const { PORT } = process.env;

const fs = require("fs");
const file = fs.readFileSync("./swagger.yaml", "utf-8");
const swaggerDocument = YAML.parse(file);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const router = require("./routes/index");

app.use(express.json());
app.use("/api/v1", router);

app.listen(PORT, () =>
  console.log(`server running at http://localhost:${PORT}`)
);
