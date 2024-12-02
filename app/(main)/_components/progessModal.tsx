"use client";

import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Power,
  Radio,
  BarChart2,
  CheckCircle2,
  Shield,
  FileSearch,
  Wallet,
  ArrowRightLeft,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ProgressStep {
  id: number;
  message: string;
  icon: string; // Icon name as string
  status: "done" | "inProgress" | "pending";
  detail: string;
}

interface ProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskName: string;
  taskId: string; // Add taskId prop to fetch specific task progress
}

// Map of icon names to Lucide components
const iconMap = {
  Power,
  Radio,
  BarChart2,
  CheckCircle2,
  Shield,
  FileSearch,
  Wallet,
  ArrowRightLeft,
  CheckCircle,
  Loader2,
};

export function ProgressModal({
  isOpen,
  onClose,
  taskName,
  taskId,
}: ProgressModalProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [progressSteps, setProgressSteps] = useState<ProgressStep[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch progress steps when modal opens
  useEffect(() => {
    const fetchProgressSteps = async () => {
      if (!isOpen) return;

      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/getTaskProgress/${taskId}`);
        if (!response.ok) throw new Error("Failed to fetch progress steps");

        const data = await response.json();
        setProgressSteps(data);
        // Reset progress animation
        setCurrentStepIndex(0);
        setVisibleSteps([]);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching progress steps:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgressSteps();
  }, [isOpen, taskId]);

  // Handle progress animation
  useEffect(() => {
    if (
      isOpen &&
      !isLoading &&
      progressSteps.length > 0 &&
      currentStepIndex < progressSteps.length
    ) {
      const timer = setTimeout(() => {
        setVisibleSteps((prev) => [...prev, currentStepIndex]);
        setCurrentStepIndex((prev) => prev + 1);
      }, 1600);

      return () => clearTimeout(timer);
    }
  }, [isOpen, currentStepIndex, isLoading, progressSteps.length]);

  // Auto-scroll to latest step
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleSteps]);

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] h-[80vh] bg-white text-black p-0">
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] h-[80vh] bg-white text-black p-0">
          <div className="flex items-center justify-center h-full text-red-500">
            {error}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[80vh] bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2 bg-white">
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
              const step = progressSteps[stepIndex];
              const StepIcon =
                iconMap[step.icon as keyof typeof iconMap] || CheckCircle;
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
                    "mb-4 bg-white rounded-lg p-4 shadow-sm",
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
