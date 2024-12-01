"use client";

import { BackgroundLines } from "@/components/ui/background-lines";
import { Paperclip, Pin } from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  const [input, setInput] = useState("What's about with block chain?");

  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <div className="z-[10000] flex flex-col items-center">
        <h1 className="text-[48px] font-bold">
          What can I help you with today?
        </h1>
        <div className="border-[1px] border-black w-[60vw] h-[200px] mt-4 p-6 bg-white/30 backdrop-blur-md border-white/20 rounded-xl shadow-lg">
          <textarea
            placeholder="Write something that you need help with?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="font-medium text-md z-50 focus w-full h-[80px] focus:outline-none p-2 bg-transparent"
          />
          <div className="flex w-full justify-between items-center mt-4">
            <Paperclip width={20} height={20} />
            <button>chat</button>
          </div>
        </div>
      </div>
    </BackgroundLines>
  );
}
