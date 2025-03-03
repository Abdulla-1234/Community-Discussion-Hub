"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart, Activity, Users, MessageSquare, HelpCircle, ArrowLeft } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <MainNav />
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button variant="ghost" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Account
            </Button>
            <Link href="/">
              <Button variant="outline" size="sm">
                Sign Out
              </Button>
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
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back! Here's an overview of your community activity.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                Export Data
              </Button>
              <Button>
                Create New
              </Button>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Polls</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+5 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Discussions</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">36</div>
                <p className="text-xs text-muted-foreground">+12 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Questions</CardTitle>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">+3 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+28%</div>
                <p className="text-xs text-muted-foreground">+4% from last month</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-1 md:col-span-2">
                  <CardHeader>
                    <CardTitle>Engagement Over Time</CardTitle>
                    <CardDescription>
                      User engagement metrics for the past 30 days
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <div className="h-full w-full flex items-center justify-center border rounded-md">
                      <LineChart className="h-8 w-8 text-muted-foreground" />
                      <span className="ml-2 text-muted-foreground">Engagement Chart</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Content Distribution</CardTitle>
                    <CardDescription>
                      Breakdown of content types
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <div className="h-full w-full flex items-center justify-center border rounded-md">
                      <PieChart className="h-8 w-8 text-muted-foreground" />
                      <span className="ml-2 text-muted-foreground">Distribution Chart</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Analytics</CardTitle>
                  <CardDescription>
                    In-depth metrics and performance indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Detailed analytics content will appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your latest interactions and content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 rounded-md border p-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <BarChart className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Created a new poll</p>
                        <p className="text-sm text-muted-foreground">
                          "What feature would you like to see next?" - 2 days ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-md border p-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Started a discussion</p>
                        <p className="text-sm text-muted-foreground">
                          "Thoughts on remote work vs. office work?" - 5 days ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-md border p-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <HelpCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Asked a question</p>
                        <p className="text-sm text-muted-foreground">
                          "How do I optimize my React application for better performance?" - 1 week ago
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-
  )
}