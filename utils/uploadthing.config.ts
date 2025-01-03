import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 4
    }
  })
    .middleware(() => {
      return {};
    })
    .onUploadComplete(() => {})
};

export type OurFileRouter = typeof ourFileRouter; 