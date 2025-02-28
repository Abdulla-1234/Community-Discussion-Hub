"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, ThumbsDown, MessageSquare, Share2 } from "lucide-react";

export function TrendingPosts() {
  // Mock trending posts data
  const posts = [
    {
      id: "1",
      title: "Introducing our new community guidelines",
      excerpt: "We've updated our community guidelines to ensure a positive experience for all members...",
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
      type: "announcement"
    },
    {
      id: "2",
      title: "What's your favorite productivity tool?",
      excerpt: "I've been trying to optimize my workflow and would love to hear what tools everyone is using...",
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
      type: "discussion"
    }
  ];

  const [votedPosts, setVotedPosts] = useState<Record<string, 'up' | 'down' | null>>({});

  const handleVote = (postId: string, voteType: 'up' | 'down') => {
    setVotedPosts(prev => {
      // If already voted this way, remove the vote
      if (prev[postId] === voteType) {
        const newVotes = {...prev};
        newVotes[postId] = null;
        return newVotes;
      }
      // Otherwise set the vote
      return {...prev, [postId]: voteType};
    });
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{post.author.name}</p>
                  <p className="text-xs text-muted-foreground">{post.author.role} • {post.createdAt}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
            <CardTitle className="mt-2">
              <Link href={`/posts/${post.id}`} className="hover:underline">
                {post.title}
              </Link>
            </CardTitle>
            <CardDescription>
              <span className="inline-block bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full mr-2">
                {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{post.excerpt}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className={votedPosts[post.id] === 'up' ? 'text-primary' : ''}
                onClick={() => handleVote(post.id, 'up')}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                {post.stats.upvotes + (votedPosts[post.id] === 'up' ? 1 : 0) - (votedPosts[post.id] === 'down' ? 0 : 0)}
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className={votedPosts[post.id] === 'down' ? 'text-destructive' : ''}
                onClick={() => handleVote(post.id, 'down')}
              >
                <ThumbsDown className="h-4 w-4 mr-1" />
                {post.stats.downvotes + (votedPosts[post.id] === 'down' ? 1 : 0) - (votedPosts[post.id] === 'up' ? 0 : 0)}
              </Button>
            </div>
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4 mr-1" />
              {post.stats.comments} Comments
            </Button>
          </CardFooter>
        </Card>
      ))}
      <div className="text-center mt-4">
        <Link href="/posts">
          <Button variant="outline">View All Posts</Button>
        </Link>
      </div>
    </div>
  );
}