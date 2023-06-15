import { FastifyReply, FastifyRequest } from "fastify";
import { IBook } from "./interfaces";
import mongoose from "mongoose";

export async function AddBookController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    //const Book = request.db.models.Book;
    const { Book } = request.db.models;

    const newBook = await Book.create(request.body);

    reply.status(201);

    return { success: true, message: `Uploaded with id: ${newBook.id}` };
  } catch (error) {
    request.log.error(error);
    await reply.status(500).send("An error occured!");
  }
}

export async function GetBooksController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { Book } = request.db.models;

    const books = await Book.find({});

    return books;
  } catch (error) {
    request.log.error(error);
    await reply.status(500).send("An error occured!");
  }
}

export async function DeleteBookController(
  request: FastifyRequest<{ Body: IBook }>,
  reply: FastifyReply
) {
  try {
    const { Book } = request.db.models;
    const { deletedCount } = await Book.deleteOne({
      isbn: request.body.isbn,
    });
    if (deletedCount === 0) {
      reply.code(404);
      return { success: true, message: "Book not found" };
    }

    return { success: true, message: "Book deleted successfully" };
  } catch (error) {
    request.log.error(error);
    await reply.status(500).send("An error occured!");
  }
}

export async function UpdateBookController(
  request: FastifyRequest<{
    Body: IBook;
    Params: {
      id: string;
    };
  }>,
  reply: FastifyReply
) {
  try {
    console.log(request.params.id);
    const bookId = new mongoose.Types.ObjectId(request.params.id);
    console.log(bookId);
    const { Book } = request.db.models;
    const foundBook = await Book.findOne({ _id: bookId });
    if (!foundBook) {
      reply.code(404);
      return { success: true, message: `Book with id: ${bookId} not found` };
    }
    await Book.updateOne(
      { _id: bookId },
      {
        author: request.body.author,
        title: request.body.title,
        year: request.body.year,
        isbn: request.body.isbn,
      }
    );

    return {
      success: true,
      message: `Book with id: ${bookId} updated successfully`,
    };
  } catch (error) {
    request.log.error(error);
    await reply.status(500).send("An error occured!");
  }
}
