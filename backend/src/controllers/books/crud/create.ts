import { Context } from "https://deno.land/x/oak/mod.ts";
import { Book, NewBook } from "../../../models/book/model.ts";
import { BookRepository } from "../../../models/book/repository.ts";

export const createBook = async (context: Context) => {
  try {
    const { value } = await context.request.body().value;
    const bookData: NewBook = value;

    const bookRepository = new BookRepository();
    const createdBook = await bookRepository.create(bookData);

    context.response.status = 201;
    context.response.body = {
      success: true,
      data: createdBook,
    };
  } catch (error) {
    context.response.status = 500;
    context.response.body = {
      success: false,
      message: error.message,
    };
  }
};