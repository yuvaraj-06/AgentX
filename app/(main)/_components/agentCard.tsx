import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star, Trophy, CheckCircle, MessageSquare } from "lucide-react";

interface AgentCardProps {
  name: string;
  title: string;
  avatarUrl: string;
  rating: number;
  successRate: number;
  completionRate: number;
  description: string;
  tools: string[];
}

export function AgentCard({
  name,
  title,
  avatarUrl,
  rating,
  successRate,
  completionRate,
  description,
  tools,
}: AgentCardProps) {
  return (
    <Card className="w-full max-w-sm mx-auto h-[400px] overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col">
      <CardContent className="p-6 flex-grow flex flex-col space-y-4">
        {/* Header with Avatar and Name */}
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-8 flex-shrink-0">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow min-w-0">
            <h3 className="text-lg font-semibold truncate mb-1">{name}</h3>
            <p className="text-sm text-muted-foreground truncate">{title}</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 py-2">
          <div className="flex flex-col items-center justify-center bg-muted/30 p-3 rounded-lg">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mb-1" />
            <span className="text-sm font-medium">{rating}/100</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-muted/30 p-3 rounded-lg">
            <Trophy className="w-5 h-5 text-green-500 mb-1" />
            <span className="text-sm font-medium">{successRate}%</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-muted/30 p-3 rounded-lg">
            <CheckCircle className="w-5 h-5 text-blue-500 mb-1" />
            <span className="text-sm font-medium">{completionRate}%</span>
          </div>
        </div>

        {/* Tools Section */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">
            Tools & Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <Badge
                key={tool}
                variant="secondary"
                className="text-xs py-1 px-2"
              >
                {tool}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-muted/50 p-4">
        <Button className="w-full">
          <MessageSquare className="w-4 h-4 mr-2" />
          Chat
        </Button>
      </CardFooter>
    </Card>
  );
}
