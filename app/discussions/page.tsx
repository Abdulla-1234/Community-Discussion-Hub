"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, ThumbsDown, MessageSquare, Share2, PlusCircle, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DiscussionsPage() {
  // Mock discussions data
  const discussions = [
    {
      id: "1",
      title: "Introducing our new community guidelines",
      content: "We've updated our community guidelines to ensure a positive experience for all members. The new guidelines focus on respectful communication, constructive feedback, and inclusive discussions. Please take a moment to review them and share your thoughts.",
      author: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        role: "Admin"
      },
      stats: {
        upvotes: 124,
        downvotes: 8,
        comments: 32
      },
      createdAt: "1 day ago",
      tags: ["Announcement", "Guidelines"]
    },
    {
      id: "2",
      title: "What's your favorite productivity tool?",
      content: "I've been trying to optimize my workflow and would love to hear what tools everyone is using. Currently, I'm using a combination of Notion for notes, Todoist for tasks, and Calendly for scheduling. What tools have you found most helpful for staying organized and productive?",
      author: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        role: "Member"
      },
      stats: {
        upvotes: 87,
        downvotes: 3,
        comments: 45
      },
      createdAt: "3 days ago",
      tags: ["Productivity", "Tools", "Discussion"]
    },
    {
      id: "3",
      title: "Thoughts on remote work vs. office work?",
      content: "As many companies are deciding on their long-term work policies, I'm curious about everyone's preferences and experiences. Do you prefer working remotely, in an office, or a hybrid approach? What benefits and challenges have you encountered with each?",
      author: {
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        role: "Member"
      },
      stats: {
        upvotes: 112,
        downvotes: 5,
        comments: 78
      },
      createdAt: "5 days ago",
      tags: ["Work", "Remote", "Discussion"]
    }
  ];

  const [votedDiscussions, setVotedDiscussions] = useState<Record<string, 'up' | 'down' | null>>({});

  const handleVote = (discussionId: string, voteType: 'up' | 'down') => {
    setVotedDiscussions(prev => {
      // If already voted this way, remove the vote
      if (prev[discussionId] === voteType) {
        const newVotes = {...prev};
        newVotes[discussionId] = null;
        return newVotes;
      }
      // Otherwise set the vote
      return {...prev, [discussionId]: voteType};
    });
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
              <h1 className="text-3xl font-bold">Community Discussions</h1>
            </div>
            <Link href="/discussions/create">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Start Discussion
              </Button>
            </Link>
          </div>
          
          <div className="space-y-6">
            {discussions.map((discussion) => (
              <Card key={discussion.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                        <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{discussion.author.name}</p>
                        <p className="text-xs text-muted-foreground">{discussion.author.role} • {discussion.createdAt}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                  <CardTitle className="mt-2">
                    <Link href={`/discussions/${discussion.id}`} className="hover:underline">
                      {discussion.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {discussion.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3">{discussion.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={votedDiscussions[discussion.id] === 'up' ? 'text-primary' : ''}
                      onClick={() => handleVote(discussion.id, 'up')}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {discussion.stats.upvotes + (votedDiscussions[discussion.id] === 'up' ? 1 : 0) - (votedDiscussions[discussion.id] === 'down' ? 0 : 0)}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={votedDiscussions[discussion.id] === 'down' ? 'text-destructive' : ''}
                      onClick={() => handleVote(discussion.id, 'down')}
                    >
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      {discussion.stats.downvotes + (votedDiscussions[discussion.id] === 'down' ? 1 : 0) - (votedDiscussions[discussion.id] === 'up' ? 0 : 0)}
                    </Button>
                  </div>
                  <Link href={`/discussions/${discussion.id}`}>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {discussion.stats.comments} Comments
                    </Button>
                  </Link>
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