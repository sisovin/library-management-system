import { Context } from "https://deno.land/x/oak/mod.ts";
import { Book } from "../../../models/book/model.ts";
import { updateBook as updateBookInDB } from "../../../models/book/repository.ts";

export const updateBook = async (context: Context) => {
  try {
    const { id } = context.params;
    const { value } = await context.request.body();
    const bookData: Partial<Book> = value;

    const updatedBook = await updateBookInDB(id, bookData);

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
