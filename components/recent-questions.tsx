import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, MessageSquare, Clock } from "lucide-react";

// Mock data - would come from API in real implementation
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
];

export function RecentQuestions() {
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <Link key={question.id} href={`/questions/${question.id}`} className="block group">
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={question.author.avatar} alt={question.author.name} />
                    <AvatarFallback>{question.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{question.author.name}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{question.createdAt}</span>
                </div>
              </div>
              <CardTitle className="text-lg mt-2 group-hover:text-primary transition-colors">
                {question.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-wrap gap-2">
                {question.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between text-muted-foreground text-sm pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{question.upvotes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{question.answers} answers</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}