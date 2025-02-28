"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, MessageSquare, Eye, PlusCircle } from "lucide-react";

export default function PostsPage() {
  // Mock posts data
  const posts = [
    {
      id: "post-1",
      title: "10 Tips for Better Community Engagement",
      excerpt: "Learn how to foster meaningful interactions and build a thriving community with these proven strategies. We'll cover everything from creating engaging content to moderating discussions effectively.",
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
      },
      createdAt: "3 days ago",
      category: "Community",
      upvotes: 342,
      comments: 56,
      views: 1204,
    },
    {
      id: "post-2",
      title: "The Future of Online Communities in 2025",
      excerpt: "Exploring emerging trends and technologies that will shape how we connect and collaborate online. From AI-powered moderation to immersive virtual spaces, the future of community building is evolving rapidly.",
      author: {
        name: "Marcus Williams",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
      },
      createdAt: "1 week ago",
      category: "Trends",
      upvotes: 287,
      comments: 42,
      views: 956,
    },
    {
      id: "post-3",
      title: "How We Grew Our Community to 10,000 Members",
      excerpt: "A case study on our journey from a small group to a thriving community with engaged members. We'll share the strategies, challenges, and lessons learned along the way to help you grow your own community.",
      author: {
        name: "Priya Patel",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
      },
      createdAt: "5 days ago",
      category: "Growth",
      upvotes: 198,
      comments: 37,
      views: 823,
    },
    {
      id: "post-4",
      title: "Building Inclusive Online Spaces",
      excerpt: "How to create communities where everyone feels welcome and valued. This comprehensive guide covers accessibility, moderation policies, and fostering a culture of respect and belonging.",
      author: {
        name: "Jordan Lee",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
      },
      createdAt: "2 days ago",
      category: "Inclusion",
      upvotes: 176,
      comments: 29,
      views: 742,
    },
    {
      id: "post-5",
      title: "Effective Content Moderation Strategies",
      excerpt: "Best practices for keeping your community safe while encouraging healthy discussion. From automated tools to human moderation, learn how to balance freedom of expression with community standards.",
      author: {
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
      },
      createdAt: "4 days ago",
      category: "Moderation",
      upvotes: 231,
      comments: 48,
      views: 912,
    },
    {
      id: "post-6",
      title: "Monetizing Your Community: Ethical Approaches",
      excerpt: "Explore sustainable ways to generate revenue while maintaining trust and engagement. From membership models to partnerships, discover how to create value for both members and stakeholders.",
      author: {
        name: "Elena Rodriguez",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
      },
      createdAt: "1 week ago",
      category: "Business",
      upvotes: 154,
      comments: 31,
      views: 678,
    },
  ];

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Community Posts</h1>
        <Link href="/posts/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Post
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`} className="group">
            <Card className="h-full overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <span className="font-medium">{post.author.name}</span>
                    <span className="text-muted-foreground ml-2">{post.createdAt}</span>
                  </div>
                </div>
                <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between text-muted-foreground text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{post.upvotes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{post.views}</span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}