"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { JobCard } from "@/app/(main)/_components/jobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, Plus } from "lucide-react";
import { TaskCreationModal } from "../(main)/_components/taskCreationModal";

const mockJobs = [
  {
    title: "Run A/B Tests on LinkedIn and Meta Ads",
    description: "Optimize ad creatives and targeting through A/B testing.",
    type: "AI+Human" as const,
    tools: ["Share AI BDR", "Perplexity"],
    automationLevel: 2,
    humanInteraction: 3,
    duration: "30 hours",
    bounty: 10000,
    expertise: "Intermediate",
    totalSlots: 5,
    filledSlots: 2,
    priority: "High" as const,
    isConfidential: true,
  },
  {
    title: "Generate Product Descriptions",
    description: "Create compelling product descriptions using AI tools.",
    type: "AI" as const,
    tools: ["GPT-4", "Copy.ai"],
    automationLevel: 4,
    humanInteraction: 1,
    duration: "12 hours",
    bounty: 5000,
    expertise: "Beginner",
    totalSlots: 5,
    filledSlots: 3,
    priority: "Medium" as const,
    isConfidential: false,
  },
  {
    title: "Develop ML Model for Customer Churn Prediction",
    description:
      "Create and train a machine learning model to predict customer churn.",
    type: "AI" as const,
    tools: ["TensorFlow", "Scikit-learn", "Pandas"],
    automationLevel: 5,
    humanInteraction: 2,
    duration: "40 hours",
    bounty: 15000,
    expertise: "Expert",
    totalSlots: 5,
    filledSlots: 1,
    priority: "High" as const,
    isConfidential: true,
  },
  {
    title: "Content Moderation for Social Media Platform",
    description:
      "Implement AI-assisted content moderation system for a social media platform.",
    type: "AI+Human" as const,
    tools: ["OpenAI API", "Custom NLP Models"],
    automationLevel: 3,
    humanInteraction: 4,
    duration: "50 hours",
    bounty: 12000,
    expertise: "Advanced",
    totalSlots: 5,
    filledSlots: 2,
    priority: "High" as const,
    isConfidential: false,
  },
  {
    title: "Chatbot Development for Customer Support",
    description:
      "Design and implement an AI-powered chatbot for customer support.",
    type: "AI" as const,
    tools: ["Dialogflow", "Node.js"],
    automationLevel: 4,
    humanInteraction: 2,
    duration: "25 hours",
    bounty: 8000,
    expertise: "Intermediate",
    totalSlots: 5,
    filledSlots: 4,
    priority: "Medium" as const,
    isConfidential: false,
  },
  {
    title: "Data Annotation for Autonomous Vehicles",
    description:
      "Annotate image and video data for training autonomous vehicle AI models.",
    type: "Human" as const,
    tools: ["LabelImg", "CVAT"],
    automationLevel: 1,
    humanInteraction: 5,
    duration: "60 hours",
    bounty: 7000,
    expertise: "Beginner",
    totalSlots: 5,
    filledSlots: 1,
    priority: "Low" as const,
    isConfidential: false,
  },
];

export default function DiscoveryPage() {
  const [jobs, setJobs] = useState(mockJobs);
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [minBounty, setMinBounty] = useState(0);
  const [maxBounty, setMaxBounty] = useState(20000);
  const [showConfidential, setShowConfidential] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const addLog = (message: string) => {
    setLogs((prevLogs) => [
      `${new Date().toLocaleTimeString()} - ${message}`,
      ...prevLogs.slice(0, 4),
    ]);
  };

  useEffect(() => {
    addLog("Page loaded");
  }, []);

  const filteredJobs = jobs
    .filter((job) => typeFilter === "all" || job.type === typeFilter)
    .filter((job) => job.bounty >= minBounty && job.bounty <= maxBounty)
    .filter((job) => showConfidential || !job.isConfidential)
    .filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "bounty") return b.bounty - a.bounty;
      if (sortBy === "priority") {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0; // For "newest", assume the original order is by date
    });

  const handleCreateTask = (taskData: any) => {
    // Here you would typically send the task data to your backend
    // For now, we'll just log it and add it to the jobs list
    console.log("New task created:", taskData);
    addLog(`New task created: ${taskData.taskName}`);

    const newJob = {
      title: taskData.taskName,
      description: taskData.taskDescription,
      type: taskData.humanInvolvement ? "AI+Human" : "AI",
      tools: [taskData.selectedAgent],
      automationLevel: 3, // This could be calculated based on the task data
      humanInteraction: taskData.humanInvolvement ? 3 : 1,
      duration: `${taskData.duration} hours`,
      bounty: taskData.totalCost,
      expertise: taskData.expertise,
      totalSlots: 5,
      filledSlots: 0,
      priority: taskData.priority,
      isConfidential: false, // You might want to add this as an option in the modal
    };

    setJobs([newJob, ...jobs]);
  };

  const filterPanel = (
    <div className="space-y-4">
      <div>
        <Label htmlFor="typeFilter">Task Type</Label>
        <Select
          value={typeFilter}
          onValueChange={(value) => {
            setTypeFilter(value);
            addLog(`Filter changed: Type - ${value}`);
          }}
        >
          <SelectTrigger id="typeFilter">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="AI">AI Only</SelectItem>
            <SelectItem value="Human">Human Only</SelectItem>
            <SelectItem value="AI+Human">AI + Human</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="sortBy">Sort By</Label>
        <Select
          value={sortBy}
          onValueChange={(value) => {
            setSortBy(value);
            addLog(`Sort changed: ${value}`);
          }}
        >
          <SelectTrigger id="sortBy">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="bounty">Highest Bounty</SelectItem>
            <SelectItem value="priority">Highest Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Bounty Range</Label>
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            value={minBounty}
            onChange={(e) => setMinBounty(Number(e.target.value))}
            className="w-20"
          />
          <span>to</span>
          <Input
            type="number"
            value={maxBounty}
            onChange={(e) => setMaxBounty(Number(e.target.value))}
            className="w-20"
          />
        </div>
        <Slider
          min={0}
          max={20000}
          step={1000}
          value={[minBounty, maxBounty]}
          onValueChange={(value) => {
            setMinBounty(value[0]);
            setMaxBounty(value[1]);
            addLog(`Bounty range changed: ${value[0]} - ${value[1]}`);
          }}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="showConfidential"
          checked={showConfidential}
          onCheckedChange={(checked) => {
            setShowConfidential(checked);
            addLog(`Confidential tasks ${checked ? "shown" : "hidden"}`);
          }}
        />
        <Label htmlFor="showConfidential">Show Confidential Tasks</Label>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Available Tasks</h2>
          <div className="flex items-center space-x-2">
            <Input
              type="search"
              placeholder="Search tasks..."
              className="max-w-xs"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                addLog(`Search query: ${e.target.value}`);
              }}
            />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Options</SheetTitle>
                </SheetHeader>
                {filterPanel}
              </SheetContent>
            </Sheet>
            <Button
              className="w-auto"
              size="sm"
              onClick={() => setIsTaskModalOpen(true)}
            >
              <span>Create Task</span>
              <Plus className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
        {filteredJobs.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No tasks match your current filters.
            </p>
          </div>
        )}
        {filteredJobs.length > 0 && filteredJobs.length % 3 === 0 && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              onClick={() => addLog("Load More Tasks clicked")}
            >
              Load More Tasks
            </Button>
          </div>
        )}
        <Card>
          <CardHeader>
            <CardTitle>Activity Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {logs.map((log, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {log}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      <TaskCreationModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onCreateTask={handleCreateTask}
      />
    </DashboardLayout>
  );
}
