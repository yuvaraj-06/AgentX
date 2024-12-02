"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { JobCard } from "../(main)/_components/jobCard";
import { AgentCard } from "../(main)/_components/agentCard";
import { InProgressCard } from "../(main)/_components/inProgressCard";
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
import { Filter, Plus, BriefcaseIcon, Users2, ClockIcon } from "lucide-react";
import { TaskCreationModal } from "../(main)/_components/taskCreationModal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockJobs = [
  {
    title: "DeFi Yield Optimization Bot",
    description:
      "Create an AI bot that monitors and automatically rebalances DeFi positions for optimal yields across multiple chains",
    type: "AI" as const,
    tools: ["Python", "Web3.py", "DefiLlama API"],
    automationLevel: 5,
    humanInteraction: 1,
    hourlyRate: "30/hr",
    expertise: "Expert",
    totalSlots: 5,
    filledSlots: 2,
    priority: "High" as const,
    isConfidential: true,
  },
  {
    title: "NFT Rarity Analyzer",
    description:
      "Build an AI system to analyze NFT collections and predict potential value based on trait rarity and market trends",
    type: "AI+Human" as const,
    tools: ["OpenSea API", "GPT-4", "PyTorch"],
    automationLevel: 4,
    humanInteraction: 2,
    hourlyRate: "28/hr",
    expertise: "Advanced",
    totalSlots: 5,
    filledSlots: 3,
    priority: "Medium" as const,
    isConfidential: false,
  },
  {
    title: "Crypto Sentiment Analysis Engine",
    description:
      "Develop a real-time sentiment analysis system for crypto markets using social media and news sources",
    type: "AI" as const,
    tools: ["BERT", "Twitter API", "NewsAPI"],
    automationLevel: 5,
    humanInteraction: 1,

    hourlyRate: "26/hr",
    expertise: "Expert",
    totalSlots: 5,
    filledSlots: 1,
    priority: "High" as const,
    isConfidential: true,
  },
  {
    title: "Market Making Bot for DEXes",
    description:
      "Create an automated market maker bot for decentralized exchanges with ML-based pricing strategies",
    type: "AI+Human" as const,
    tools: ["UniswapV3 SDK", "TensorFlow", "Ethers.js"],
    automationLevel: 4,
    humanInteraction: 2,
    hourlyRate: "16/hr",
    expertise: "Expert",
    totalSlots: 5,
    filledSlots: 2,
    priority: "High" as const,
    isConfidential: true,
  },
  {
    title: "Smart Contract Vulnerability Scanner",
    description:
      "Develop an AI-powered scanner to detect vulnerabilities in smart contracts across multiple chains",
    type: "AI" as const,
    tools: ["Slither", "Mythril", "Custom ML Models"],
    automationLevel: 5,
    humanInteraction: 1,
    hourlyRate: "18/hr",
    expertise: "Advanced",
    totalSlots: 5,
    filledSlots: 3,
    priority: "High" as const,
    isConfidential: false,
  },
  {
    title: "Crypto Whale Activity Monitor",
    description:
      "Build a system to track and analyze large wallet movements with ML-based pattern recognition",
    type: "AI+Human" as const,
    tools: ["Etherscan API", "Graph Protocol", "scikit-learn"],
    automationLevel: 4,
    humanInteraction: 2,
    hourlyRate: "14/hr",
    expertise: "Intermediate",
    totalSlots: 5,
    filledSlots: 1,
    priority: "Medium" as const,
    isConfidential: false,
  },
  {
    title: "Cross-chain Arbitrage Bot",
    description:
      "Develop an AI-powered arbitrage bot that identifies and executes profitable trades across different blockchain networks",
    type: "AI" as const,
    tools: ["1inch API", "Custom ML Models", "Web3"],
    automationLevel: 5,
    humanInteraction: 1,
    hourlyRate: "22/hr",
    expertise: "Expert",
    totalSlots: 5,
    filledSlots: 2,
    priority: "High" as const,
    isConfidential: true,
  },
  {
    title: "DAO Proposal Analyzer",
    description:
      "Create an AI system to analyze and summarize DAO proposals with impact predictions",
    type: "AI+Human" as const,
    tools: ["GPT-4", "Snapshot API", "Custom NLP Models"],
    automationLevel: 3,
    humanInteraction: 3,
    hourlyRate: "26/hr",
    expertise: "Intermediate",
    totalSlots: 5,
    filledSlots: 4,
    priority: "Low" as const,
    isConfidential: false,
  },
];

const mockAgents = [
  {
    name: "Trade alt coins on Base",
    title: "Base Chain Alt Coin Trading Specialist",
    avatarUrl: "/avatars/avatar5.png",
    rating: 94,
    successRate: 96,
    completionRate: 99,
    tools: [
      "CoinDesk API",
      "CoinTelegraph Feed",
      "Python",
      "Web3.py",
      "TradingView",
    ],
  },
  {
    name: "Meme coin social fi trader",
    title: "Social-Fi Meme Trading Analyst",
    avatarUrl: "/avatars/avatar2.png",
    rating: 97,
    successRate: 92,
    completionRate: 98,
    tools: ["The Block", "Decrypt", "Twitter API", "Reddit API", "GPT-4"],
  },
  {
    name: "Develop ML Model for Customer Churn Prediction",
    title: "ML Customer Behavior Prediction Expert",
    avatarUrl: "/avatars/avatar3.png",
    rating: 88,
    successRate: 85,
    completionRate: 94,
    tools: ["TensorFlow", "Scikit-learn", "Pandas", "Python", "Jupyter"],
  },
  {
    name: "Content Moderation for Social Media Platform",
    title: "AI Content Moderation Systems Engineer",
    avatarUrl: "/avatars/avatar4.png",
    rating: 96,
    successRate: 94,
    completionRate: 99,
    tools: ["OpenAI API", "Custom NLP Models", "Python", "MongoDB", "Redis"],
  },
  {
    name: "Chatbot Development for Customer Support",
    title: "AI Conversational Systems Architect",
    avatarUrl: "/avatars/avatar1.png",
    rating: 99,
    successRate: 97,
    completionRate: 100,
    tools: ["Dialogflow", "Node.js", "GPT-4", "MongoDB", "Redis"],
  },
];

const mockInProgressTasks = [];

export default function DiscoveryPage() {
  const [view, setView] = useState("tasks");
  const [jobs, setJobs] = useState([]);
  const [agents, setAgents] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [minBounty, setMinBounty] = useState(0);
  const [maxBounty, setMaxBounty] = useState(20000);
  const [showConfidential, setShowConfidential] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch tasks
        const tasksResponse = await fetch("/api/getTasks");
        const tasksData = await tasksResponse.json();
        setJobs(tasksData);
        addLog("Tasks loaded successfully");

        // Fetch agents
        const agentsResponse = await fetch("/api/getAgents");
        const agentsData = await agentsResponse.json();
        setAgents(agentsData);
        addLog("Agents loaded successfully");

        // Fetch in-progress tasks
        const inProgressResponse = await fetch("/api/getInprogressTasks");
        const inProgressData = await inProgressResponse.json();
        setInProgressTasks(inProgressData);
        addLog("In-progress tasks loaded successfully");
      } catch (err: any) {
        setError(err.message);
        addLog(`Error loading data: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">
          <p className="text-red-500">Error loading data: {error}</p>
        </div>
      </DashboardLayout>
    );
  }

  // Handle loading state
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

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
    .filter((job) => showConfidential || !job.isConfidential)
    .filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "priority") {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredInProgressTasks = inProgressTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleCreateTask = (taskData: any) => {
  //   console.log("New task created:", taskData);
  //   addLog(`New task created: ${taskData.taskName}`);

  //   const newJob = {
  //     title: taskData.taskName,
  //     description: taskData.taskDescription,
  //     type: taskData.humanInvolvement ? "AI+Human" : "AI",
  //     tools: [taskData.selectedAgent],
  //     automationLevel: 3,
  //     humanInteraction: taskData.humanInvolvement ? 3 : 1,
  //     hourlyRate: taskData.hourlyRate,
  //     expertise: taskData.expertise,
  //     totalSlots: 5,
  //     filledSlots: 0,
  //     priority: taskData.priority,
  //     isConfidential: false,
  //   };

  //   setJobs([newJob, ...jobs]);
  // };

  const handleLaunchJob = async (job) => {
    try {
      // Update backend about the job launch
      await fetch("/api/launchJob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });

      setJobs(jobs.filter((j) => j.title !== job.title));
      setInProgressTasks([...inProgressTasks, { ...job, progress: 0 }]);
      setView("inprogress");
      addLog(`Job launched: ${job.title}`);
    } catch (err) {
      addLog(`Error launching job: ${err.message}`);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await fetch("/api/createTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      const newJob = await response.json();
      setJobs([newJob, ...jobs]);
      addLog(`New task created: ${taskData.taskName}`);
    } catch (err) {
      addLog(`Error creating task: ${err.message}`);
    }
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
        <div className="flex flex-col space-y-4">
          <Tabs value={view} onValueChange={setView} className="self-start">
            <TabsList className="grid w-[400px] grid-cols-3">
              <TabsTrigger value="tasks" className="flex items-center gap-2">
                <BriefcaseIcon className="w-4 h-4" />
                Tasks
              </TabsTrigger>
              <TabsTrigger
                value="inprogress"
                className="flex items-center gap-2"
              >
                <ClockIcon className="w-4 h-4" />
                In Progress
              </TabsTrigger>
              <TabsTrigger value="agents" className="flex items-center gap-2">
                <Users2 className="w-4 h-4" />
                Agents
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center">
            <h2 className="text-2xl font-bold">Discovery</h2>
            <div className="flex items-center space-x-2">
              <Input
                type="search"
                placeholder={`Search ${view}...`}
                className="max-w-xs"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  addLog(`Search query: ${e.target.value}`);
                }}
              />
              {view === "tasks" && (
                <>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon" className="p-2">
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
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {view === "tasks" &&
            filteredJobs.map((job, index) => (
              <JobCard
                key={index}
                {...job}
                onLaunch={() => handleLaunchJob(job)}
              />
            ))}
          {view === "inprogress" &&
            filteredInProgressTasks.map((task, index) => (
              <InProgressCard key={index} {...task} />
            ))}
          {view === "agents" &&
            filteredAgents.map((agent, index) => (
              <AgentCard key={index} {...agent} />
            ))}
        </div>

        {((view === "tasks" && filteredJobs.length === 0) ||
          (view === "agents" && filteredAgents.length === 0) ||
          (view === "inprogress" && filteredInProgressTasks.length === 0)) && (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No {view === "inprogress" ? "tasks" : view} match your current
              filters.
            </p>
          </div>
        )}

        {view === "tasks" &&
          filteredJobs.length > 0 &&
          filteredJobs.length % 3 === 0 && (
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
