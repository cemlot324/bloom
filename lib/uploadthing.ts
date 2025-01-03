import { generateComponents } from "@uploadthing/react";
import type { OurFileRouter } from "@/utils/uploadthing.config";
 
export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>(); 