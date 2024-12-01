"use client";

import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Clock,
  MessageSquare,
  CheckCircle2,
  Loader2,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskName: string;
}

const mockProgressSteps = [
  {
    id: 1,
    message: "7am — Initiate hourly tasks",
    icon: Clock,
    status: "done",
    detail: "",
  },
  {
    id: 2,
    message: "I need to check emails to see which ones need responses",
    icon: MessageSquare,
    status: "pending",
    detail: "",
  },
  {
    id: 3,
    message: "Fetching emails",
    icon: Loader2,
    status: "done",
    detail: "Done",
  },
  {
    id: 4,
    message: "There are 5 that need responses",
    icon: MessageSquare,
    status: "pending",
    detail: "",
  },
  {
    id: 5,
    message: "I need to check the CRM for more details",
    icon: MessageSquare,
    status: "pending",
    detail: "",
  },
  {
    id: 6,
    message: "Fetching CRM details",
    icon: Loader2,
    status: "done",
    detail: "Done",
  },
  {
    id: 7,
    message: "Composing reply",
    icon: MessageSquare,
    status: "pending",
    detail: "Hi Gerald! +36 words",
  },
  {
    id: 8,
    message: "Sending reply",
    icon: Send,
    status: "inProgress",
    detail: "",
  },
];

export function ProgressModal({
  isOpen,
  onClose,
  taskName,
}: ProgressModalProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && currentStepIndex < mockProgressSteps.length) {
      const timer = setTimeout(() => {
        setVisibleSteps((prev) => [...prev, currentStepIndex]);
        setCurrentStepIndex((prev) => prev + 1);
      }, 1600);

      return () => clearTimeout(timer);
    }
  }, [isOpen, currentStepIndex]);

  useEffect(() => {
    if (isOpen) {
      setCurrentStepIndex(0);
      setVisibleSteps([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleSteps]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[80vh] bg-white border-gray-200 text-black p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2 bg-white border-b border-gray-200">
          <DialogTitle className="text-xl font-semibold text-black">
            {taskName}
          </DialogTitle>
        </DialogHeader>
        <div
          ref={containerRef}
          className="h-full overflow-y-auto p-6 flex flex-col justify-center"
        >
          <AnimatePresence>
            {visibleSteps.map((stepIndex, index) => {
              const step = mockProgressSteps[stepIndex];
              const StepIcon = step.icon;
              const isLatest = index === visibleSteps.length - 1;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: isLatest ? 1 : 0.95,
                    transition: { duration: 0.5 },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.2 },
                  }}
                  className={cn(
                    "mb-4 bg-gray-100 rounded-lg p-4 border border-gray-200 shadow-sm",
                    isLatest ? "z-10" : "z-0"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                        step.status === "done"
                          ? "bg-green-100 text-green-600"
                          : step.status === "inProgress"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-200 text-gray-600"
                      )}
                    >
                      <StepIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-h-[40px]">
                      <p className="text-black text-sm font-medium">
                        {step.message}
                      </p>
                      {step.detail && (
                        <p className="text-gray-600 text-sm mt-1">
                          {step.detail}
                        </p>
                      )}
                    </div>
                    {step.status === "done" && (
                      <span className="text-green-600 text-sm font-medium">
                        Done
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
