"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, MessageSquare, Share2, Search, Filter, BarChart, HelpCircle, ArrowLeft } from "lucide-react";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [votedItems, setVotedItems] = useState<Record<string, 'up' | 'down' | null>>({});

  // Mock data for all content types
  const allContent = [
    {
      id: "poll-1",
      type: "poll",
      title: "What feature would you like to see next?",
      author: {
        name: "Admin",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        role: "Admin"
      },
      stats: {
        upvotes: 124,
        downvotes: 8,
        comments: 32,
        votes: 390
      },
      createdAt: "2 days ago",
      tags: ["Feature", "Feedback"]
    },
    {
      id: "discussion-1",
      type: "discussion",
      title: "Introducing our new community guidelines",
      content: "We've updated our community guidelines to ensure a positive experience for all members. The new guidelines focus on respectful communication, constructive feedback, and inclusive discussions.",
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
      id: "question-1",
      type: "question",
      title: "How do I optimize my React application for better performance?",
      content: "I've built a React application that's starting to slow down as it grows. What are some best practices for optimizing performance?",
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
      id: "poll-2",
      type: "poll",
      title: "How often do you use our platform?",
      author: {
        name: "Moderator",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        role: "Moderator"
      },
      stats: {
        upvotes: 87,
        downvotes: 5,
        comments: 18,
        votes: 425
      },
      createdAt: "5 days ago",
      tags: ["Usage", "Feedback"]
    },
    {
      id: "discussion-2",
      type: "discussion",
      title: "What's your favorite productivity tool?",
      content: "I've been trying to optimize my workflow and would love to hear what tools everyone is using. Currently, I'm using a combination of Notion for notes, Todoist for tasks, and Calendly for scheduling.",
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
      id: "question-2",
      type: "question",
      title: "What's the best approach for handling authentication in a Next.js application?",
      content: "I'm building a Next.js application and need to implement user authentication. Should I use JWT, session-based auth, or a third-party service?",
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
    }
  ];

  const handleVote = (itemId: string, voteType: 'up' | 'down') => {
    setVotedItems(prev => {
      // If already voted this way, remove the vote
      if (prev[itemId] === voteType) {
        const newVotes = {...prev};
        newVotes[itemId] = null;
        return newVotes;
      }
      // Otherwise set the vote
      return {...prev, [itemId]: voteType};
    });
  };

  // Filter content based on search query and active tab
  const filteredContent = allContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTab = activeTab === "all" || item.type === activeTab;
    
    return matchesSearch && matchesTab;
  });

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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center gap-2">
              <Link href="/">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Explore Content</h1>
                <p className="text-muted-foreground">Discover polls, discussions, and questions from the community</p>
              </div>
            </div>
            <Link href="/create">
              <Button>Create New</Button>
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search content..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="md:w-auto w-full">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">All Content</TabsTrigger>
              <TabsTrigger value="poll" className="flex items-center gap-1">
                <BarChart className="h-4 w-4" />
                Polls
              </TabsTrigger>
              <TabsTrigger value="discussion" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                Discussions
              </TabsTrigger>
              <TabsTrigger value="question" className="flex items-center gap-1">
                <HelpCircle className="h-4 w-4" />
                Questions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-6">
              {filteredContent.length > 0 ? (
                filteredContent.map((item) => (
                  <ContentCard 
                    key={item.id} 
                    item={item} 
                    votedItems={votedItems} 
                    handleVote={handleVote} 
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No content found matching your search criteria.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="poll" className="space-y-6">
              {filteredContent.filter(item => item.type === "poll").length > 0 ? (
                filteredContent
                  .filter(item => item.type === "poll")
                  .map((item) => (
                    <ContentCard 
                      key={item.id} 
                      item={item} 
                      votedItems={votedItems} 
                      handleVote={handleVote} 
                    />
                  ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No polls found matching your search criteria.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="discussion" className="space-y-6">
              {filteredContent.filter(item => item.type === "discussion").length > 0 ? (
                filteredContent
                  .filter(item => item.type === "discussion")
                  .map((item) => (
                    <ContentCard 
                      key={item.id} 
                      item={item} 
                      votedItems={votedItems} 
                      handleVote={handleVote} 
                    />
                  ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No discussions found matching your search criteria.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="question" className="space-y-6">
              {filteredContent.filter(item => item.type === "question").length > 0 ? (
                filteredContent
                  .filter(item => item.type === "question")
                  .map((item) => (
                    <ContentCard 
                      key={item.id} 
                      item={item} 
                      votedItems={votedItems} 
                      handleVote={handleVote} 
                    />
                  ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No questions found matching your search criteria.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
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

interface ContentCardProps {
  item: any;
  votedItems: Record<string, 'up' | 'down' | null>;
  handleVote: (itemId: string, voteType: 'up' | 'down') => void;
}

function ContentCard({ item, votedItems, handleVote }: ContentCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'poll':
        return <BarChart className="h-4 w-4" />;
      case 'discussion':
        return <MessageSquare className="h-4 w-4" />;
      case 'question':
        return <HelpCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  const getTypeUrl = (type: string, id: string) => {
    switch (type) {
      case 'poll':
        return `/polls/${id}`;
      case 'discussion':
        return `/discussions/${id}`;
      case 'question':
        return `/questions/${id}`;
      default:
        return '#';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={item.author.avatar} alt={item.author.name} />
              <AvatarFallback>{item.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{item.author.name}</p>
              <p className="text-xs text-muted-foreground">{item.author.role} • {item.createdAt}</p>
            </div>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            {getTypeIcon(item.type)}
            <span className="capitalize">{item.type}</span>
          </Badge>
        </div>
        <CardTitle className="mt-2">
          <Link href={getTypeUrl(item.type, item.id)} className="hover:underline">
            {item.title}
          </Link>
        </CardTitle>
        <CardDescription>
          <div className="flex flex-wrap gap-2 mt-1">
            {item.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </CardDescription>
      </CardHeader>
      {item.content && (
        <CardContent>
          <p className="line-clamp-3">{item.content}</p>
        </CardContent>
      )}
      <CardFooter className="flex justify-between">
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={votedItems[item.id] === 'up' ? 'text-primary' : ''}
            onClick={() => handleVote(item.id, 'up')}
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            {item.stats.upvotes + (votedItems[item.id] === 'up' ? 1 : 0) - (votedItems[item.id] === 'down' ? 0 : 0)}
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className={votedItems[item.id] === 'down' ? 'text-destructive' : ''}
            onClick={() => handleVote(item.id, 'down')}
          >
            <ThumbsDown className="h-4 w-4 mr-1" />
            {item.stats.downvotes + (votedItems[item.id] === 'down' ? 1 : 0) - (votedItems[item.id] === 'up' ? 0 : 0)}
          </Button>
        </div>
        <Link href={getTypeUrl(item.type, item.id)}>
          <Button variant="ghost" size="sm">
            {item.type === 'question' ? (
              <>
                <MessageSquare className="h-4 w-4 mr-1" />
                {item.stats.answers} Answers
              </>
            ) : (
              <>
                <MessageSquare className="h-4 w-4 mr-1" />
                {item.stats.comments} Comments
              </>
            )}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}