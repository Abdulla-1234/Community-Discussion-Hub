"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, MessageSquare, Clock, PlusCircle } from "lucide-react";

export default function DiscussionsPage() {
  // Mock discussions data
  const discussions = [
    {
      id: "d-1",
      title: "Should we implement a reputation system for our community?",
      excerpt: "I'm thinking about adding a reputation system to encourage quality contributions. What do you think?",
      author: {
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
      },
      createdAt: "3 hours ago",
      tags: ["Community", "Features"],
      upvotes: 18,
      replies: 12,
      isHot: true,
    },
    {
      id: "d-2",
      title: "Weekly community showcase thread - share what you're working on!",
      excerpt: "Use this thread to share your projects, get feedback, and connect with other community members.",
      author: {
        name: "Moderator Team",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
      },
      createdAt: "1 day ago",
      tags: ["Weekly", "Showcase"],
      upvotes: 42,
      replies: 37,
      isPinned: true,
    },
    {
      id: "d-3",
      title: "Let's discuss the future of remote work and community building",
      excerpt: "How are you maintaining community connections in a remote-first world? Share your strategies and challenges.",
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
      },
      createdAt: "2 days ago",
      tags: ["Remote Work", "Discussion"],
      upvotes: 31,
      replies: 24,
    },
    {
      id: "d-4",
      title: "Community guidelines update - please read and provide feedback",
      excerpt: "We've updated our community guidelines to better address recent challenges. Your feedback is important!",
      author: {
        name: "Admin",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
      },
      createdAt: "4 days ago",
      tags: ["Announcement", "Guidelines"],
      upvotes: 56,
      replies: 43,
      isPinned: true,
    },
    {
      id: "d-5",
      title: "Introducing ourselves - who are you and what brings you here?",
      excerpt: "Let's get to know each other better! Share a bit about yourself, your interests, and what brought you to our community.",
      author: {
        name: "Elena Rodriguez",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
      },
      createdAt: "1 week ago",
      tags: ["Introductions", "Community"],
      upvotes: 89,
      replies: 124,
      isHot: true,
    },
    {
      id: "d-6",
      title: "Feedback wanted: New community features coming next month",
      excerpt: "We're planning to roll out several new features next month and would love your input on priorities and implementation.",
      author: {
        name: "Product Team",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
      },
      createdAt: "3 days ago",
      tags: ["Feedback", "Features"],
      upvotes: 47,
      replies: 36,
    },
  ];

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Community Discussions</h1>
        <Link href="/discussions/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Start Discussion
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {discussions.map((discussion) => (
          <Link key={discussion.id} href={`/discussions/${discussion.id}`} className="block group">
            <Card className={`overflow-hidden transition-all hover:shadow-md ${discussion.isPinned ? 'border-primary/50' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                      <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{discussion.author.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {discussion.isPinned && (
                      <Badge variant="outline" className="bg-primary/10 text-primary">Pinned</Badge>
                    )}
                    {discussion.isHot && (
                      <Badge variant="outline" className="bg-destructive/10 text-destructive">Hot</Badge>
                    )}
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{discussion.createdAt}</span>
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg mt-2 group-hover:text-primary transition-colors">
                  {discussion.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-muted-foreground line-clamp-2 mb-2">{discussion.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {discussion.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between text-muted-foreground text-sm pt-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{discussion.upvotes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{discussion.replies} replies</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}