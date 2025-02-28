"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, MessageSquare, Clock, PlusCircle } from "lucide-react";

export default function QuestionsPage() {
  // Mock questions data
  const questions = [
    {
      id: "q-1",
      title: "What's the best way to moderate a large online community?",
      author: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
      },
      createdAt: "2 hours ago",
      tags: ["Moderation", "Community"],
      upvotes: 24,
      answers: 7,
    },
    {
      id: "q-2",
      title: "How do you handle toxic users without driving away engagement?",
      author: {
        name: "Elena Rodriguez",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
      },
      createdAt: "1 day ago",
      tags: ["Moderation", "Engagement"],
      upvotes: 42,
      answers: 13,
    },
    {
      id: "q-3",
      title: "What metrics should I track to measure community health?",
      author: {
        name: "Jordan Taylor",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
      },
      createdAt: "3 days ago",
      tags: ["Analytics", "Growth"],
      upvotes: 37,
      answers: 9,
    },
    {
      id: "q-4",
      title: "How often should you run community events to keep members engaged?",
      author: {
        name: "Aisha Johnson",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
      },
      createdAt: "5 days ago",
      tags: ["Events", "Engagement"],
      upvotes: 29,
      answers: 11,
    },
    {
      id: "q-5",
      title: "What's the ideal size for a community moderation team?",
      author: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
      },
      createdAt: "2 days ago",
      tags: ["Moderation", "Team"],
      upvotes: 18,
      answers: 6,
    },
    {
      id: "q-6",
      title: "How do you encourage lurkers to participate in discussions?",
      author: {
        name: "Sarah Wilson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
      },
      createdAt: "4 days ago",
      tags: ["Engagement", "Participation"],
      upvotes: 31,
      answers: 8,
    },
    {
      id: "q-7",
      title: "What are effective ways to onboard new community members?",
      author: {
        name: "James Lee",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
      },
      createdAt: "1 week ago",
      tags: ["Onboarding", "Growth"],
      upvotes: 26,
      answers: 12,
    },
    {
      id: "q-8",
      title: "How do you balance content quality with community growth?",
      author: {
        name: "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80
      }
    }
  ]
}