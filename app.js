require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");

const app = express();
const port = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conexión exitosa a MongoDB");
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err);
  });

const startServer = async () => {
  const typeDefs = require("./schemas/typeDefs");
  const resolvers = require("./schemas/resolvers");

  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(
      `Servidor ejecutándose en http://192.168.227.192:${port}${server.graphqlPath}`
    );
  });
};

startServer();