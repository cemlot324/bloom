"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/utils/uploadthing.config";

interface UploadProviderProps {
  onChange: (url?: string) => void;
  endpoint: keyof OurFileRouter;
}

export function UploadProvider({ onChange, endpoint }: UploadProviderProps) {
  return (
    <UploadButton
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res?.[0]?.url) {
          onChange(res[0].url);
        }
      }}
      onUploadError={(error: Error) => {
        console.error("Error uploading:", error);
      }}
    />
  );
} 