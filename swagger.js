const swaggerJsdoc = require("swagger-jsdoc");
const { name, version } = require("./package.json");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: name,
      version: version,
    },
  },
  apis: ["./src/routes*.js"],
};

const openapiSpecification = swaggerJsdoc(options);

module.exports = openapiSpecification;