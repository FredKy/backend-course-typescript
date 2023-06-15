import { FastifyInstance } from "fastify";
import {
  AddBookSchema,
  DeleteBookSchema,
  GetBooksSchema,
  UpdateBookSchema,
} from "./schemas";
import {
  AddBookController,
  DeleteBookController,
  GetBooksController,
  UpdateBookController,
} from "./controllers";

export async function BookRoutes(
  server: FastifyInstance,
) {
  server.route({
    method: "POST",
    url: "/books",
    schema: AddBookSchema,
    handler: AddBookController,
  });

  server.route({
    method: "GET",
    url: "/books",
    schema: GetBooksSchema,
    handler: GetBooksController,
  });

  server.route({
    method: "DELETE",
    url: "/books",
    schema: DeleteBookSchema,
    handler: DeleteBookController,
  });

  server.route({
    method: "PUT",
    url: "/books/:id",
    schema: UpdateBookSchema,
    handler: UpdateBookController,
  });
}
