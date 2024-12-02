"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Rocket, CheckCircle } from "lucide-react";

interface LaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LaunchModal({ isOpen, onClose }: LaunchModalProps) {
  const [launchState, setLaunchState] = useState<"launching" | "launched">(
    "launching"
  );

  useEffect(() => {
    if (isOpen) {
      setLaunchState("launching");
      const timer = setTimeout(() => {
        setLaunchState("launched");
      }, 3000); // Change to 'launched' after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white text-black p-0 overflow-hidden">
        <div className="h-[300px] flex flex-col items-center justify-center p-6">
          {launchState === "launching" ? (
            <>
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: -20 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                <Rocket className="w-16 h-16 text-blue-500" />
              </motion.div>
              <p className="mt-8 text-xl font-semibold">Launching job...</p>
            </>
          ) : (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <CheckCircle className="w-16 h-16 text-green-500" />
              </motion.div>
              <p className="mt-4 text-xl font-semibold">Job launched!</p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
