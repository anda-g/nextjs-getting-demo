"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    window.addEventListener("keypress", (e) => {
      if (e.code === "Enter") {
        let x = count;
        setCount((x += 1));
      }
    });
  });
  return (
    <>
      <div className="h-screen w-full flex flex-col items-center justify-center gap-3">
        <h1 className="text-3xl">{count}</h1>
        <button
          onClick={() => {
            let x = count;
            setCount((x += 1));
          }}
          className="bg-black text-white py-2 px-4 rounded-md border-3 border-transparent hover:border-black hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
        >
          Click me
        </button>
      </div>
    </>
  );
}
