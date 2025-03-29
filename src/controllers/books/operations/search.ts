import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { searchBooksInDatabase } from "../../../db/schema/books.ts";

export const searchBooks = async (context: RouterContext) => {
  const { request, response } = context;
  const { query } = request.url;

  if (!query) {
    response.status = 400;
    response.body = { error: "Query parameter is required" };
    return;
  }

  try {
    const books = await searchBooksInDatabase(query);
    response.status = 200;
    response.body = { books };
  } catch (error) {
    response.status = 500;
    response.body = { error: "Internal server error" };
  }
};
