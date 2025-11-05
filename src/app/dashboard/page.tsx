import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Pill, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold font-headline">Welcome back!</h1>
        <p className="text-muted-foreground">
          Your guide to safe eating with medication.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-accent" />
              Interaction Check
            </CardTitle>
            <CardDescription>
              Check for food-drug interactions to stay safe.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center flex-1">
             <Link href="/dashboard/interaction-check" className="text-lg font-semibold text-primary hover:underline">Start Checking</Link>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="w-6 h-6 text-accent" />
              My Medications
            </CardTitle>
            <CardDescription>
              Manage your list of medications for personalized advice.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center flex-1">
             <Link href="/dashboard/medications" className="text-lg font-semibold text-primary hover:underline">Manage Meds</Link>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-accent" />
              Learn
            </CardTitle>
            <CardDescription>
             Expand your knowledge on safe medication use.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center flex-1">
            <Link href="/dashboard/education" className="text-lg font-semibold text-primary hover:underline">Read Articles</Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
