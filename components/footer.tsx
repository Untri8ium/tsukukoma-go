// app/components/footer.tsx
import React from "react";
import Kagayaki from "@/public/kagayaki.svg";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center pt-8 pb-12">
      {/* 
        The div wrapper helps prevent layout clipping
        and makes sure the SVG scales responsively.
      */}
      <div className="w-full h-auto">
        <div className="flex justify-center">
          <Kagayaki width="3rem" height="auto" />
        </div>
        <span className="block text-center text-white text-xs mt-2">
          © 2025 筑駒文化祭・Element138
        </span>
      </div>
    </footer>
  );
}
