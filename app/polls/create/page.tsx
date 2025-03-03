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
import { Trash2, ArrowLeft } from "lucide-react";

const formSchema = z.object({
  question: z.string().min(5, { message: "Question must be at least 5 characters" }),
  options: z.array(
    z.object({
      text: z.string().min(1, { message: "Option text is required" })
    })
  ).min(2, { message: "At least 2 options are required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreatePollPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      options: [{ text: "" }, { text: "" }],
    },
  });

  const { fields, append, remove } = form.control._formValues.options;

  function onSubmit(values: FormValues) {
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

  const addOption = () => {
    const currentOptions = form.getValues().options;
    form.setValue("options", [...currentOptions, { text: "" }]);
  };

  const removeOption = (index: number) => {
    const currentOptions = form.getValues().options;
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
    form.setValue("options", newOptions);
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
              <Link href="/polls">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Create a New Poll</h1>
                <p className="text-muted-foreground">Ask the community and gather feedback</p>
              </div>
            </div>
            <Link href="/polls">
              <Button variant="outline">Back to Polls</Button>
            </Link>
          </div>
          
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Poll Details</CardTitle>
              <CardDescription>
                Create a poll with a question and multiple options for users to vote on.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
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
                          Be clear and specific with your question.
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
                    
                    {form.getValues().options.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <FormField
                          control={form.control}
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
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    
                    {form.formState.errors.options?.message && (
                      <p className="text-sm font-medium text-destructive">
                        {form.formState.errors.options.message}
                      </p>
                    )}
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating Poll..." : "Create Poll"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
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