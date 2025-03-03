"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, MessageSquare, BarChart, HelpCircle, ArrowLeft } from "lucide-react";

const discussionFormSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  content: z.string().min(20, { message: "Content must be at least 20 characters" }),
  tags: z.string().min(1, { message: "Please select at least one tag" }),
});

const pollFormSchema = z.object({
  question: z.string().min(5, { message: "Question must be at least 5 characters" }),
  options: z.array(
    z.object({
      text: z.string().min(1, { message: "Option text is required" })
    })
  ).min(2, { message: "At least 2 options are required" }),
});

const questionFormSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  content: z.string().min(20, { message: "Content must be at least 20 characters" }),
  tags: z.string().min(1, { message: "Please select at least one tag" }),
});

export default function CreatePostPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("discussion");
  
  // Discussion form
  const discussionForm = useForm<z.infer<typeof discussionFormSchema>>({
    resolver: zodResolver(discussionFormSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
  });

  // Poll form
  const pollForm = useForm<z.infer<typeof pollFormSchema>>({
    resolver: zodResolver(pollFormSchema),
    defaultValues: {
      question: "",
      options: [{ text: "" }, { text: "" }],
    },
  });

  // Question form
  const questionForm = useForm<z.infer<typeof questionFormSchema>>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
  });

  function onSubmitDiscussion(values: z.infer<typeof discussionFormSchema>) {
    setIsLoading(true);
    
    try {
      // In a real app, you would call your API to create the discussion
      console.log("Discussion values:", values);
      
      // Simulate API call
      setTimeout(() => {
        toast({
          title: "Discussion created!",
          description: "Your discussion has been successfully created.",
        });
        
        router.push("/discussions");
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while creating your discussion. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }

  function onSubmitPoll(values: z.infer<typeof pollFormSchema>) {
    setIsLoading(true);
    
    try {
      // In a real app, you would call your API to create the poll
      console.log("Poll values:", values);
      
      // Simulate API call
      setTimeout(() => {
        toast({
          title: "Poll created!",
          description: "Your poll has been successfully created.",
        });
        
        router.push("/polls");
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while creating your poll. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }

  function onSubmitQuestion(values: z.infer<typeof questionFormSchema>) {
    setIsLoading(true);
    
    try {
      // In a real app, you would call your API to create the question
      console.log("Question values:", values);
      
      // Simulate API call
      setTimeout(() => {
        toast({
          title: "Question created!",
          description: "Your question has been successfully created.",
        });
        
        router.push("/questions");
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while creating your question. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }

  const addOption = () => {
    const currentOptions = pollForm.getValues().options;
    pollForm.setValue("options", [...currentOptions, { text: "" }]);
  };

  const removeOption = (index: number) => {
    const currentOptions = pollForm.getValues().options;
    if (currentOptions.length <= 2) {
      toast({
        title: "Error",
        description: "A poll must have at least 2 options.",
        variant: "destructive",
      });
      return;
    }
    
    const newOptions = [...currentOptions];
    newOptions.splice(index, 1);
    pollForm.setValue("options", newOptions);
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
          <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center mb-8">
            <div className="flex items-center gap-2">
              <Link href="/">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Create New Content</h1>
                <p className="text-muted-foreground">Share your thoughts, create polls, or ask questions</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full md:w-[400px] mx-auto">
              <TabsTrigger value="discussion" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Discussion
              </TabsTrigger>
              <TabsTrigger value="poll" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                Poll
              </TabsTrigger>
              <TabsTrigger value="question" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Question
              </TabsTrigger>
            </TabsList>
            
            {/* Discussion Form */}
            <TabsContent value="discussion">
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>Create a Discussion</CardTitle>
                  <CardDescription>
                    Start a conversation with the community about any topic
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...discussionForm}>
                    <form onSubmit={discussionForm.handleSubmit(onSubmitDiscussion)} className="space-y-6">
                      <FormField
                        control={discussionForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter a descriptive title" {...field} />
                            </FormControl>
                            <FormDescription>
                              A clear title helps others understand your discussion
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={discussionForm.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Share your thoughts or ideas with the community" 
                                {...field} 
                                className="min-h-[200px] resize-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={discussionForm.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="general">General</SelectItem>
                                <SelectItem value="technology">Technology</SelectItem>
                                <SelectItem value="business">Business</SelectItem>
                                <SelectItem value="health">Health</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Categorize your discussion to help others find it
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating Discussion..." : "Create Discussion"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Poll Form */}
            <TabsContent value="poll">
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>Create a Poll</CardTitle>
                  <CardDescription>
                    Create a poll with multiple options for users to vote on
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...pollForm}>
                    <form onSubmit={pollForm.handleSubmit(onSubmitPoll)} className="space-y-6">
                      <FormField
                        control={pollForm.control}
                        name="question"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Question</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="What would you like to ask the community?" 
                                {...field} 
                                className="resize-none"
                              />
                            </FormControl>
                            <FormDescription>
                              Be clear and specific with your question
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <FormLabel>Poll Options</FormLabel>
                          <Button type="button" variant="outline" size="sm" onClick={addOption}>
                            Add Option
                          </Button>
                        </div>
                        
                        {pollForm.getValues().options.map((option, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <FormField
                              control={pollForm.control}
                              name={`options.${index}.text`}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input placeholder={`Option ${index + 1}`} {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeOption(index)}
                            >
                              <PlusCircle className="h-4 w-4 rotate-45" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating Poll..." : "Create Poll"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Question Form */}
            <TabsContent value="question">
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>Ask a Question</CardTitle>
                  <CardDescription>
                    Ask the community for help or insights on a specific topic
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...questionForm}>
                    <form onSubmit={questionForm.handleSubmit(onSubmitQuestion)} className="space-y-6">
                      <FormField
                        control={questionForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Question Title</FormLabel>
                            <FormControl>
                              <Input placeholder="What do you want to ask?" {...field} />
                            </FormControl>
                            <FormDescription>
                              Be specific and imagine you're asking a person
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={questionForm.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Details</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Include all the information someone would need to answer your question" 
                                {...field} 
                                className="min-h-[200px] resize-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={questionForm.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="react">React</SelectItem>
                                <SelectItem value="nextjs">Next.js</SelectItem>
                                <SelectItem value="javascript">JavaScript</SelectItem>
                                <SelectItem value="typescript">TypeScript</SelectItem>
                                <SelectItem value="webdev">Web Development</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Add a tag to help categorize your question
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Posting Question..." : "Post Question"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
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