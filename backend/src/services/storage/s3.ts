import { S3Client, PutObjectCommand } from "npm:@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: Deno.env.get("AWS_REGION"),
  credentials: {
    accessKeyId: Deno.env.get("AWS_ACCESS_KEY_ID")!,
    secretAccessKey: Deno.env.get("AWS_SECRET_ACCESS_KEY")!,
  },
});

export const uploadToS3 = async (file: File): Promise<string> => {
  const bucketName = Deno.env.get("S3_BUCKET_NAME")!;
  const key = `${Date.now()}-${file.name}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: file,
    ContentType: file.type,
  });

  await s3Client.send(command);

  return `https://${bucketName}.s3.amazonaws.com/${key}`;
};
