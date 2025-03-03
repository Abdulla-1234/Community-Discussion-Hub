"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, ArrowLeft } from "lucide-react";

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
      question: "How often do you use our platform?",
      options: [
        { id: "1", text: "Daily", votes: 210 },
        { id: "2", text: "Weekly", votes: 150 },
        { id: "3", text: "Monthly", votes: 45 },
        { id: "4", text: "Rarely", votes: 20 }
      ],
      totalVotes: 425,
      createdBy: "Moderator",
      createdAt: "5 days ago"
    },
    {
      id: "3",
      question: "Which topic interests you the most?",
      options: [
        { id: "1", text: "Technology", votes: 180 },
        { id: "2", text: "Business", votes: 120 },
        { id: "3", text: "Health", votes: 95 },
        { id: "4", text: "Education", votes: 110 }
      ],
      totalVotes: 505,
      createdBy: "User",
      createdAt: "1 week ago"
    }
  ];

  const [votedPolls, setVotedPolls] = useState<Record<string, string>>({});
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const handleOptionSelect = (pollId: string, optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [pollId]: optionId
    }));
  };

  const handleVote = (pollId: string) => {
    if (selectedOptions[pollId]) {
      setVotedPolls(prev => ({
        ...prev,
        [pollId]: selectedOptions[pollId]
      }));
    }
  };

  const calculatePercentage = (votes: number, totalVotes: number) => {
    return Math.round((votes / totalVotes) * 100);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <MainNav />
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link href="/signin">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <Link href="/">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">Community Polls</h1>
            </div>
            <Link href="/polls/create">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Poll
              </Button>
            </Link>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {polls.map((poll) => (
              <Card key={poll.id} className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>{poll.question}</CardTitle>
                  <CardDescription>Created by {poll.createdBy} • {poll.createdAt}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  {!votedPolls[poll.id] ? (
                    <RadioGroup value={selectedOptions[poll.id] || ""} onValueChange={(value) => handleOptionSelect(poll.id, value)}>
                      {poll.options.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2 mb-3">
                          <RadioGroupItem value={option.id} id={`option-${poll.id}-${option.id}`} />
                          <Label htmlFor={`option-${poll.id}-${option.id}`}>{option.text}</Label>
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
                          <Progress value={calculatePercentage(option.votes, poll.totalVotes)} className="h-2" />
                          <p className="text-xs text-muted-foreground">{option.votes} votes</p>
                        </div>
                      ))}
                      <p className="text-sm text-muted-foreground pt-2">Total: {poll.totalVotes} votes</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {!votedPolls[poll.id] ? (
                    <Button onClick={() => handleVote(poll.id)} disabled={!selectedOptions[poll.id]} className="w-full">
                      Vote
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" onClick={() => setVotedPolls(prev => {
                      const newVotes = {...prev};
                      delete newVotes[poll.id];
                      return newVotes;
                    })}>
                      Change Vote
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Community Engagement Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}