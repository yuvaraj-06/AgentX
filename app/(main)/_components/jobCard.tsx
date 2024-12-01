import Image from "next/image";
import {
  GemIcon,
  Lock,
  Clock,
  BarChart,
  Users,
  ChevronRight,
  BoltIcon,
  ZapIcon,
} from "lucide-react";
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

// Import the 5 avatar images
import avatar1 from "@/public/avatars/avatar1.png";
import avatar2 from "@/public/avatars/avatar2.png";
import avatar3 from "@/public/avatars/avatar3.png";
import avatar4 from "@/public/avatars/avatar4.png";
import avatar5 from "@/public/avatars/avatar5.png";

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];

interface JobCardProps {
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
}

export function JobCard({
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
}: JobCardProps) {
  const renderProgressBar = (value: number, max: number = 5) => {
    return <Progress value={(value / max) * 100} className="h-1.5" />;
  };

  const renderSlots = (filled: number, total: number) => {
    // Shuffle the avatars array
    const shuffledAvatars = [...avatars].sort(() => Math.random() - 0.5);

    return (
      <div className="flex -space-x-2 overflow-hidden">
        {[...Array(total)].map((_, i) => (
          <div
            key={i}
            className={`inline-block h-8 w-8 rounded-full ring-2 ring-white ${
              i < filled ? "opacity-100" : "opacity-50"
            }`}
          >
            <Image
              src={shuffledAvatars[i]}
              alt={`Avatar ${i + 1}`}
              width={32}
              height={32}
              className="h-full w-full object-cover rounded-full"
            />
          </div>
        ))}
      </div>
    );
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
            <ZapIcon className="h-4 w-4 mr-2 text-yellow-600" />
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

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Task Slots</span>
            {renderSlots(filledSlots, totalSlots)}
          </div>
          <p className="text-xs text-muted-foreground">
            {filledSlots} filled, {totalSlots - filledSlots} available
          </p>
        </div>
      </CardContent>

      <CardFooter className="bg-muted/50 p-6">
        <Button className="w-full" size="sm">
          <span>Bid Now</span>
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
