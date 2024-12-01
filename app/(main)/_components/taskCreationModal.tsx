import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, DollarSign, Users, Zap } from "lucide-react";

interface TaskCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (taskData: any) => void;
}

export function TaskCreationModal({
  isOpen,
  onClose,
  onCreateTask,
}: TaskCreationModalProps) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [humanInvolvement, setHumanInvolvement] = useState(false);
  const [duration, setDuration] = useState(1);
  const [priority, setPriority] = useState("");
  const [expertise, setExpertise] = useState("");

  const hourlyRate = 6;
  const humanRate = 5;
  const platformFee = 2;
  const transactionFee = 1;
  const rewardBonus = 3;
  const miscCost = 1;

  const calculateTotalCost = () => {
    const aiCost = duration * hourlyRate;
    const humanCost = humanInvolvement ? humanRate : 0;
    const totalCost =
      aiCost +
      humanCost +
      platformFee +
      transactionFee +
      rewardBonus +
      miscCost;
    return totalCost;
  };

  const handleCreateTask = () => {
    const taskData = {
      taskName,
      taskDescription,
      selectedAgent,
      humanInvolvement,
      duration,
      priority,
      expertise,
      totalCost: calculateTotalCost(),
    };
    onCreateTask(taskData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create New Task
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="taskName">Task Name</Label>
            <Input
              id="taskName"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="taskDescription">Description</Label>
            <Textarea
              id="taskDescription"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Describe the task"
              className="h-24"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="agent">Agent</Label>
              <Select onValueChange={setSelectedAgent} value={selectedAgent}>
                <SelectTrigger id="agent">
                  <SelectValue placeholder="Select an agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agent1">Agent 1</SelectItem>
                  <SelectItem value="agent2">Agent 2</SelectItem>
                  <SelectItem value="agent3">Agent 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="humanInvolvement">Human Involvement</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="humanInvolvement"
                  checked={humanInvolvement}
                  onCheckedChange={setHumanInvolvement}
                />
                <Label htmlFor="humanInvolvement">
                  {humanInvolvement ? "Yes" : "No"}
                </Label>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="duration">Duration (hours)</Label>
            <Slider
              id="duration"
              min={1}
              max={100}
              step={1}
              value={[duration]}
              onValueChange={(value) => setDuration(value[0])}
            />
            <span className="text-sm text-muted-foreground">
              {duration} hours
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select onValueChange={setPriority} value={priority}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">
                    <div className="flex items-center">
                      <span className="mr-2" role="img" aria-label="Critical">
                        🚨
                      </span>
                      Critical
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center">
                      <span className="mr-2" role="img" aria-label="High">
                        🔥
                      </span>
                      High
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center">
                      <span className="mr-2" role="img" aria-label="Medium">
                        ⚠️
                      </span>
                      Medium
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="expertise">Expertise</Label>
              <Select onValueChange={setExpertise} value={expertise}>
                <SelectTrigger id="expertise">
                  <SelectValue placeholder="Select expertise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expert">
                    <div className="flex items-center">
                      <span className="mr-2" role="img" aria-label="Expert">
                        🧠
                      </span>
                      Expert
                    </div>
                  </SelectItem>
                  <SelectItem value="master">
                    <div className="flex items-center">
                      <span className="mr-2" role="img" aria-label="Master">
                        🏆
                      </span>
                      Master
                    </div>
                  </SelectItem>
                  <SelectItem value="ace">
                    <div className="flex items-center">
                      <span className="mr-2" role="img" aria-label="Ace">
                        🌟
                      </span>
                      Ace
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">Cost Breakdown</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                  <span>AI Cost:</span>
                </div>
                <span>${(duration * hourlyRate).toFixed(2)}</span>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-blue-500" />
                  <span>Human Cost:</span>
                </div>
                <span>${humanInvolvement ? humanRate.toFixed(2) : "0.00"}</span>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                  <span>Platform Fee:</span>
                </div>
                <span>${platformFee.toFixed(2)}</span>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-purple-500" />
                  <span>Miscellaneous Fees:</span>
                </div>
                <span>
                  ${(transactionFee + rewardBonus + miscCost).toFixed(2)}
                </span>
              </div>
              <div className="mt-4 pt-2 border-t border-gray-200 flex justify-between items-center">
                <span className="font-semibold">Total Estimated Cost:</span>
                <span className="text-lg font-bold">
                  ${calculateTotalCost().toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleCreateTask} className="w-full">
            Create Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
