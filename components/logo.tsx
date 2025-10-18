// app/components/logo.tsx
import React from "react";
import TKGO from "@/public/tsukukomago.svg";

export default function Logo() {
  return (
    <div className="flex items-center justify-center pt-6">
      <div className="w-full h-auto flex justify-center">
        <div className="w-56">
          <TKGO width="100%" height="auto" />
        </div>
      </div>
    </div>
  );
}
