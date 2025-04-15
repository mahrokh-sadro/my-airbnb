"use client";

import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@mui/material";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div className="relative w-full h-64">
      {" "}
      <CldUploadWidget
        uploadPreset="airbnb_uploads"
        onSuccess={handleUpload}
        options={{ maxFiles: 1 }}
      >
        {({ open }) => (
          <div onClick={() => open?.()}>
            {value ? (
              <div className="absolute top-0 left-0 w-full h-full">
                <Image
                  src={value}
                  alt="Uploaded"
                  layout="fill"
                  objectFit="cover"
                  style={{ borderRadius: "8px" }}
                />
              </div>
            ) : (
              <Button variant="outlined">Click to Upload</Button>
            )}
          </div>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
