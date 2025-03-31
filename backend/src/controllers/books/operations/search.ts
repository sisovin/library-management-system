import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { BookRepository } from "../../../models/book/repository.ts";

export const searchBooks = async (context: RouterContext) => {
  const { request, response } = context;
  const queryParams = new URL(request.url).searchParams;
  const query = queryParams.get("q");

  if (!query) {
    response.status = 400;
    response.body = { 
      success: false,
      message: "Search query parameter 'q' is required" 
    };
    return;
  }

  try {
    const bookRepository = new BookRepository();
    const books = await bookRepository.search(query);
    
    response.status = 200;
    response.body = { 
      success: true,
      data: books 
    };
  } catch (error) {
    console.error("Error searching books:", error);
    response.status = 500;
    response.body = { 
      success: false,
      message: "Internal server error",
      error: error.message 
    };
  }
};