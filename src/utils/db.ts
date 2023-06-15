import {
  FastifyInstance,
  FastifyRequest,
} from "fastify";
import mongoose, { Model } from "mongoose";
import { IBook } from "../interfaces";
import { Book } from "../model/Book";
import fp from "fastify-plugin";
import environment from "./environment";

export interface Models {
  Book: Model<IBook>;
}

export interface Db {
  models: Models;
}

async function database(
  server: FastifyInstance,
) {
  try {
    mongoose.connection.on("connected", () => {
      server.log.info("MongoDB connected");
    });

    mongoose.connection.on("disconnected", () => {
      server.log.info("MongoDB disconnected");
    });

    await mongoose.connect(environment.DB_URL, { dbName: "BooksDB" });

    const models: Models = { Book };

    server.addHook(
      "onRequest",
      async (request: FastifyRequest) => {
        request.db = { models };
      }
    );
  } catch (error) {
    console.log(error);
  }
}
export default fp(database);
