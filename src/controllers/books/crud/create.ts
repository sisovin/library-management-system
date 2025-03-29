import { Context } from "https://deno.land/x/oak/mod.ts";
import { Book } from "../../../models/book/model.ts";
import { createBook as createBookInDB } from "../../../models/book/repository.ts";

export const createBook = async (context: Context) => {
  try {
    const { value } = await context.request.body();
    const bookData: Book = value;

    const createdBook = await createBookInDB(bookData);

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
