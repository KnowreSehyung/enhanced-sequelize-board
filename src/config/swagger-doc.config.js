const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  info: {
    titie: "enhanced-squelize-board-server",
    version: "1.0.0",
    description: "board server API Document",
  },
  host: "localhost:3000",
  basePath: "/api",
};

const options = {
  swaggerDefinition,
  apis: [__dirname + "/../api/*.controller.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
