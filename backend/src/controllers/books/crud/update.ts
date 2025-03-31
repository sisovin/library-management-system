import { Context } from "https://deno.land/x/oak/mod.ts";
import { Book, NewBook } from "../../../models/book/model.ts";
import { BookRepository } from "../../../models/book/repository.ts";

export const updateBook = async (context: Context) => {
  try {
    const { id } = context.params;
    const bookId = parseInt(id);
    
    if (isNaN(bookId)) {
      context.response.status = 400;
      context.response.body = {
        success: false,
        message: "Invalid book ID",
      };
      return;
    }

    const { value } = await context.request.body().value;
    const bookData: Partial<NewBook> = value;

    const bookRepository = new BookRepository();
    const updatedBook = await bookRepository.update(bookId, bookData);

    if (updatedBook) {
      context.response.status = 200;
      context.response.body = {
        success: true,
        data: updatedBook,
      };
    } else {
      context.response.status = 404;
      context.response.body = {
        success: false,
        message: "Book not found",
      };
    }
  } catch (error) {
    context.response.status = 500;
    context.response.body = {
      success: false,
      message: error.message,
    };
  }
};