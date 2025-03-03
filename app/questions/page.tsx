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

export default function QuestionsPage() {
  // Mock questions data
  const questions = [
    {
      id: "1",
      title: "How do I optimize my React application for better performance?",
      content: "I've built a React application that's starting to slow down as it grows. What are some best practices for optimizing performance? I'm particularly interested in reducing render times and improving load speed.",
      author: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        role: "Member"
      },
      stats: {
        upvotes: 42,
        downvotes: 3,
        answers: 8
      },
      createdAt: "2 days ago",
      tags: ["React", "Performance", "Web Development"]
    },
    {
      id: "2",
      title: "What's the best approach for handling authentication in a Next.js application?",
      content: "I'm building a Next.js application and need to implement user authentication. Should I use JWT, session-based auth, or a third-party service like Auth0 or NextAuth.js? What are the pros and cons of each approach?",
      author: {
        name: "Sophia Martinez",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        role: "Member"
      },
      stats: {
        upvotes: 35,
        downvotes: 1,
        answers: 12
      },
      createdAt: "4 days ago",
      tags: ["Next.js", "Authentication", "Web Development"]
    },
    {
      id: "3",
      title: "How can I implement real-time features in my web application?",
      content: "I want to add real-time functionality like chat, notifications, and live updates to my web app. What technologies should I consider? I've heard of WebSockets, Server-Sent Events, and libraries like Socket.io. What are the trade-offs?",
      author: {
        name: "James Wilson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        role: "Member"
      },
      stats: {
        upvotes: 28,
        downvotes: 2,
        answers: 6
      },
      createdAt: "1 week ago",
      tags: ["Real-time", "WebSockets", "Web Development"]
    }
  ];

  const [votedQuestions, setVotedQuestions] = useState<Record<string, 'up' | 'down' | null>>({});

  const handleVote = (questionId: string, voteType: 'up' | 'down') => {
    setVotedQuestions(prev => {
      // If already voted this way, remove the vote
      if (prev[questionId] === voteType) {
        const newVotes = {...prev};
        newVotes[questionId] = null;
        return newVotes;
      }
      // Otherwise set the vote
      return {...prev, [questionId]: voteType};
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
              <h1 className="text-3xl font-bold">Community Questions</h1>
            </div>
            <Link href="/questions/ask">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Ask a Question
              </Button>
            </Link>
          </div>
          
          <div className="space-y-6">
            {questions.map((question) => (
              <Card key={question.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={question.author.avatar} alt={question.author.name} />
                        <AvatarFallback>{question.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{question.author.name}</p>
                        <p className="text-xs text-muted-foreground">{question.author.role} • {question.createdAt}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                  <CardTitle className="mt-2">
                    <Link href={`/questions/${question.id}`} className="hover:underline">
                      {question.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    <span className="flex flex-wrap gap-2 mt-1">
                      {question.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3">{question.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={votedQuestions[question.id] === 'up' ? 'text-primary' : ''}
                      onClick={() => handleVote(question.id, 'up')}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {question.stats.upvotes + (votedQuestions[question.id] === 'up' ? 1 : 0) - (votedQuestions[question.id] === 'down' ? 0 : 0)}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={votedQuestions[question.id] === 'down' ? 'text-destructive' : ''}
                      onClick={() => handleVote(question.id, 'down')}
                    >
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      {question.stats.downvotes + (votedQuestions[question.id] === 'down' ? 1 : 0) - (votedQuestions[question.id] === 'up' ? 0 : 0)}
                    </Button>
                  </div>
                  <Link href={`/questions/${question.id}`}>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {question.stats.answers} Answers
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