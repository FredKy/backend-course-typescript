import { Schema, model } from "mongoose";
import { IBook } from "../interfaces";

const BookSchema = new Schema<IBook>({
  author: { type: String, required: true },
  year: { type: Number, required: true },
  title: { type: String, required: true },
  isbn: { type: String, required: true },
});

export const Book = model<IBook>("Book", BookSchema);
