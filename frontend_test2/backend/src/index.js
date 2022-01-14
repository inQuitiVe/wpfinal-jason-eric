import express from "express";
//import { ApolloServer, PubSub } from "apollo-server-express";
import { GraphQLServer, PubSub } from 'graphql-yoga';
//import { importSchema } from "graphql-import";
//import bodyParser from "body-parser";
//import cors from "cors";
//import http from "http";
import "dotenv-defaults/config.js";
//import path from "path";
//import { dirname } from "path";
//import { fileURLToPath } from "url";
import db from "./db.js";
import Query from "../resolvers/Query.js";
import Mutation from "../resolvers/Mutation.js";
//import Subscription from "./resolvers/Subscription.js";
import mongo from "./mongo.js";
//import apiRoute from "./route/api.js";
import {
  GraphQLUpload,
  graphqlUploadExpress, // A Koa implementation is also exported.
} from 'graphql-upload';

//const __dirname = dirname(fileURLToPath(import.meta.url));
//const port = process.env.PORT || 80;
console.log(process.env.MONGO_URL);
//const typeDefs = importSchema("./schema.graphql");
const pubsub = new PubSub();


// app.use(cors());
// //app.use("/api", apiRoute);
// app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname, "build")));
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });


const server = new GraphQLServer({
  typeDefs: './backend/schema.graphql',
  
  resolvers: {
      Upload: GraphQLUpload,
      Query,
      Mutation,
      //Subscription,
  },
  context: {
      db,
      pubsub,
  },
});

//server.applyMiddleware({ app });
//const httpServer = http.createServer(app);
//server.installSubscriptionHandlers(httpServer);

mongo.connect();

// httpServer.listen(port, () => {
//   console.log(`🚀 Server Ready at ${port}! 🚀`);
//   console.log(`Graphql Port at ${port}${server.subscriptionsPath}`);
// });


//const dbConfig = require("./src/config/db.config");


// routes
// require("./src/routes/auth.routes")(app);
// require("./src/routes/user.routes")(app);

// set port, listen for requests
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});


// const app = express();
// app.use(graphqlUploadExpress());

//   server.applyMiddleware({ app });

//   await new Promise(r => app.listen({ port: 4000 }, r));

//   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
