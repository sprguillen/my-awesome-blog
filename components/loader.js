import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center p-5">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};
