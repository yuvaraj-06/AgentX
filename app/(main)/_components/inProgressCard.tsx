"use client";

import { useState } from "react";
import { GemIcon, Lock, Clock, BarChart, Users, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { ProgressModal } from "./progessModal";

interface InProgressCardProps {
  title: string;
  description: string;
  type: "AI" | "Human" | "AI+Human";
  tools: string[];
  automationLevel: number;
  humanInteraction: number;
  duration: string;
  bounty: number;
  expertise: string;
  totalSlots: number;
  filledSlots: number;
  priority: "Low" | "Medium" | "High";
  isConfidential: boolean;
  progress: number;
}

export function InProgressCard({
  title,
  description,
  type,
  tools,
  automationLevel,
  humanInteraction,
  duration,
  bounty,
  expertise,
  totalSlots,
  filledSlots,
  priority,
  isConfidential,
  progress,
}: InProgressCardProps) {
  const [showProgress, setShowProgress] = useState(false);

  const renderProgressBar = (value: number, max: number = 5) => {
    return <Progress value={(value / max) * 100} className="h-1.5" />;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      Low: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      High: "bg-red-100 text-red-800",
    };
    return colors[priority as keyof typeof colors];
  };

  return (
    <>
      <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {description}
              </p>
            </div>
            <Badge variant="secondary" className="ml-2 shrink-0">
              {type}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-1">
            {tools.map((tool) => (
              <Badge key={tool} variant="outline" className="text-xs py-0 px-2">
                {tool}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <div className="flex items-center text-muted-foreground">
                <BarChart className="h-4 w-4 mr-2" />
                <span>Automation</span>
              </div>
              {renderProgressBar(automationLevel)}
            </div>

            <div className="space-y-1">
              <div className="flex items-center text-muted-foreground">
                <Users className="h-4 w-4 mr-2" />
                <span>Human Input</span>
              </div>
              {renderProgressBar(humanInteraction)}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              <span>{duration}</span>
            </div>

            <div className="flex items-center font-medium">
              <GemIcon className="h-4 w-4 mr-2 text-blue-500" />
              <span>{bounty ? `${bounty.toLocaleString()} coins` : "N/A"}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs py-0 px-2">
                {expertise}
              </Badge>
              <Badge className={`${getPriorityColor(priority)} text-xs`}>
                {priority} Priority
              </Badge>
            </div>
            {isConfidential && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Lock className="h-4 w-4 text-yellow-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Confidential task</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>

        <CardFooter className="bg-muted/50 p-6">
          <Button className="w-full" onClick={() => setShowProgress(true)}>
            <Eye className="w-4 h-4 mr-2" />
            View Progress
          </Button>
        </CardFooter>
      </Card>

      <ProgressModal
        isOpen={showProgress}
        onClose={() => setShowProgress(false)}
        taskName={title}
      />
    </>
  );
}
