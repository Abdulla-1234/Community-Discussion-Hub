"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

export function FeaturedPoll() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  
  // Mock poll data
  const poll = {
    id: "1",
    question: "What feature would you like to see next?",
    options: [
      { id: "1", text: "Dark mode support", votes: 145 },
      { id: "2", text: "Mobile app", votes: 86 },
      { id: "3", text: "Integration with other platforms", votes: 102 },
      { id: "4", text: "Advanced analytics", votes: 57 }
    ],
    totalVotes: 390,
    createdBy: "Admin",
    createdAt: "2 days ago"
  };

  const handleVote = () => {
    if (selectedOption) {
      setHasVoted(true);
      // In a real app, you would send this vote to your backend
    }
  };

  const calculatePercentage = (votes: number) => {
    return Math.round((votes / poll.totalVotes) * 100);
  };

  return (
    <div className="bg-[#181818] min-h-screen pt-4 p-4 rounded-lg">
      <Card className="bg-transparent border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">{poll.question}</CardTitle>
          <CardDescription className="text-gray-400">Created by {poll.createdBy} • {poll.createdAt}</CardDescription>
        </CardHeader>
        <CardContent>
          {!hasVoted ? (
            <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption}>
              {poll.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                  <Label htmlFor={`option-${option.id}`} className="text-white">{option.text}</Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <div className="space-y-4">
              {poll.options.map((option) => (
                <div key={option.id} className="space-y-1">
                  <div className="flex justify-between text-white">
                    <span>{option.text}</span>
                    <span>{calculatePercentage(option.votes)}%</span>
                  </div>
                  <Progress value={calculatePercentage(option.votes)} className="h-2" />
                  <p className="text-xs text-gray-400">{option.votes} votes</p>
                </div>
              ))}
              <p className="text-sm text-gray-400 pt-2">Total: {poll.totalVotes} votes</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {!hasVoted ? (
            <Button onClick={handleVote} disabled={!selectedOption} className="w-full">
              Vote
            </Button>
          ) : (
            <Button variant="outline" className="w-full" onClick={() => setHasVoted(false)}>
              Change Vote
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}