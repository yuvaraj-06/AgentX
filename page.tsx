import { JobCard } from "./app/(main)/_components/jobCard";

export default function DiscoveryPage() {
  const jobs = [
    {
      title: "Run A/B Tests on LinkedIn and Meta Ads",
      description: "Optimize ad creatives and targeting through A/B testing.",
      type: "AI+Human" as const,
      tools: ["Share AI BDR", "Perplexity"],
      automationLevel: 2,
      humanInteraction: 3,
      duration: "30 hours",
      cost: 2,
      expertise: "Intermediate",
      totalSlots: 5,
      filledSlots: 2,
      assignedTo: "Sean Gilmore",
      priority: "High" as const,
    },
    {
      title: "Generate Product Descriptions",
      description: "Create compelling product descriptions using AI tools.",
      type: "AI" as const,
      tools: ["GPT-4", "Copy.ai"],
      automationLevel: 4,
      humanInteraction: 1,
      duration: "12 hours",
      cost: 1,
      expertise: "Beginner",
      totalSlots: 5,
      filledSlots: 3,
      priority: "Medium" as const,
    },
    // Add more jobs as needed
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Available Tasks</h1>
      <div className="grid gap-6">
        {jobs.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
}
