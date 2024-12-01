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
      <CardContent className="p-6 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 flex-shrink-0">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold truncate">{name}</h3>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-lg font-medium">{rating}/100</span>
          </div>
        </div>

        <div className="bg-muted/30 p-3 rounded-lg mb-4">
          <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span className="truncate">Success: {successRate}%</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span className="truncate">Completion: {completionRate}%</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <Badge key={tool} variant="secondary" className="text-xs py-1 px-2">
              {tool}
            </Badge>
          ))}
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
