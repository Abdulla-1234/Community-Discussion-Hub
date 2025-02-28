"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { PlusCircle } from "lucide-react";

export default function PollsPage() {
  // Mock polls data
  const polls = [
    {
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
    },
    {
      id: "2",
      question: "How often do you visit our platform?",
      options: [
        { id: "1", text: "Daily", votes: 234 },
        { id: "2", text: "Weekly", votes: 156 },
        { id: "3", text: "Monthly", votes: 78 },
        { id: "4", text: "Rarely", votes: 42 }
      ],
      totalVotes: 510,
      createdBy: "Moderator",
      createdAt: "1 week ago"
    },
    {
      id: "3",
      question: "Which content type do you prefer?",
      options: [
        { id: "1", text: "Articles", votes: 112 },
        { id: "2", text: "Videos", votes: 187 },
        { id: "3", text: "Podcasts", votes: 95 },
        { id: "4", text: "Interactive content", votes: 143 }
      ],
      totalVotes: 537,
      createdBy: "Content Team",
      createdAt: "3 days ago"
    }
  ];

  const [votedPolls, setVotedPolls] = useState<Record<string, string>>({});

  const handleVote = (pollId: string, optionId: string) => {
    setVotedPolls(prev => ({
      ...prev,
      [pollId]: optionId
    }));
  };

  const calculatePercentage = (votes: number, totalVotes: number) => {
    return Math.round((votes / totalVotes) * 100);
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Community Polls</h1>
        <Link href="/polls/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Poll
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {polls.map((poll) => {
          const hasVoted = poll.id in votedPolls;
          
          return (
            <Card key={poll.id} className="h-full">
              <CardHeader>
                <CardTitle>{poll.question}</CardTitle>
                <CardDescription>Created by {poll.createdBy} • {poll.createdAt}</CardDescription>
              </CardHeader>
              <CardContent>
                {!hasVoted ? (
                  <RadioGroup 
                    value={votedPolls[poll.id] || ""} 
                    onValueChange={(value) => handleVote(poll.id, value)}
                  >
                    {poll.options.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2 mb-3">
                        <RadioGroupItem value={option.id} id={`poll-${poll.id}-option-${option.id}`} />
                        <Label htmlFor={`poll-${poll.id}-option-${option.id}`}>{option.text}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <div className="space-y-4">
                    {poll.options.map((option) => (
                      <div key={option.id} className="space-y-1">
                        <div className="flex justify-between">
                          <span>{option.text}</span>
                          <span>{calculatePercentage(option.votes, poll.totalVotes)}%</span>
                        </div>
                        <Progress 
                          value={calculatePercentage(option.votes, poll.totalVotes)} 
                          className={`h-2 ${votedPolls[poll.id] === option.id ? "bg-primary" : ""}`}
                        />
                        <p className="text-xs text-muted-foreground">{option.votes} votes</p>
                      </div>
                    ))}
                    <p className="text-sm text-muted-foreground pt-2">Total: {poll.totalVotes} votes</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {!hasVoted ? (
                  <Button 
                    onClick={() => handleVote(poll.id, poll.options[0].id)} 
                    disabled={!votedPolls[poll.id]} 
                    className="w-full"
                  >
                    Vote
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => {
                      const newVotedPolls = {...votedPolls};
                      delete newVotedPolls[poll.id];
                      setVotedPolls(newVotedPolls);
                    }}
                  >
                    Change Vote
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}