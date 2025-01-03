"use client";
 
import { UploadDropzone } from "@/lib/uploadthing";
import type { OurFileRouter } from "@/utils/uploadthing.config";
 
interface UploadProviderProps {
  onChange: (url?: string) => void;
  endpoint: keyof OurFileRouter;
}
 
export const UploadProvider = ({
  onChange,
  endpoint
}: UploadProviderProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
}; 