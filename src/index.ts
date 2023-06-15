import fastify, { FastifyInstance } from "fastify";
import { Db } from "./utils/db";
import database from "./utils/db";
import { BookRoutes } from "./routes";
import environment from "./utils/environment.js";

declare module "fastify" {
  interface FastifyRequest {
    db: Db;
  }
}

const server: FastifyInstance = fastify({ logger: true });

const start = async () => {
  await server.register(database);

  await server.register(BookRoutes);

  server.listen(
    { port: environment.PORT, host: "0.0.0.0" },
    (error, address) => {
      if (error) {
        server.log.info("An error has occured: ", error);
        throw error;
      }
      console.log("BASE_URL: ", address);
      console.log(
        `Running in ${environment.NODE_ENV} and listening on port ${environment.PORT}`
      );
    }
  );
};

start();
