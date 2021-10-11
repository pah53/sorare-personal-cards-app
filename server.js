const express = require("express");
const http = require("http");
const axios = require("axios");
var cors = require("cors");
const expressPlayground =
  require("graphql-playground-middleware-express").default;

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  app.use(express.json());
  app.use(cors());

  const httpServer = http.createServer(app);
  app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

  app.use("/graphql", async (req, res) => {
    axios({
      method: req.method,
      url: "https://api.sorare.com/graphql",
      data: req.body,
    })
      .then((r) => {
        console.log(`statusCode: ${r.status}`);
        console.log(r.data);
        res.json(r.data);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000$/graphql`);
}

startApolloServer();
