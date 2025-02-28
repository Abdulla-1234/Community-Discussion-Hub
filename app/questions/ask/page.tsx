"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function AskQuestionPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    tags: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a question title",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.details.trim()) {
      toast({
        title: "Error",
        description: "Please provide details for your question",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, this would send data to your backend
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Success",
        description: "Your question has been posted",
      });
      router.push("/questions");
    }, 1000);
  };

  return (
    <div className="container py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Ask a Question</h1>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Question Details</CardTitle>
            <CardDescription>
              Be specific and provide enough details for others to understand your question
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Question Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="What's your question? Be specific."
                value={formData.title}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-muted-foreground">
                Your title should summarize the problem you're facing
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="details">Details</Label>
              <Textarea
                id="details"
                name="details"
                placeholder="Provide more context and details about your question..."
                value={formData.details}
                onChange={handleChange}
                className="min-h-[200px]"
                required
              />
              <p className="text-xs text-muted-foreground">
                Include all relevant information, what you've tried, and what you're trying to achieve
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                name="tags"
                placeholder="e.g., moderation, engagement, growth (comma separated)"
                value={formData.tags}
                onChange={handleChange}
              />
              <p className="text-xs text-muted-foreground">
                Add up to 5 tags to help categorize your question
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/questions")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post Question"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}