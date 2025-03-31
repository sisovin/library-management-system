import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { uploadToS3 } from "../../../services/storage/s3.ts";

export const uploadBookCover = async (context: RouterContext) => {
  const { id } = context.params;
  const { request, response } = context;

  if (!id) {
    response.status = 400;
    response.body = { error: "Book ID is required" };
    return;
  }

  const body = await request.body({ type: "form-data" }).value;
  const file = body.files?.find((file) => file.name === "cover");

  if (!file) {
    response.status = 400;
    response.body = { error: "Cover file is required" };
    return;
  }

  try {
    const url = await uploadToS3(file);
    response.status = 200;
    response.body = { url };
  } catch (error) {
    response.status = 500;
    response.body = { error: "Failed to upload cover" };
  }
};
