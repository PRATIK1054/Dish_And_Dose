import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UtensilsCrossed } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm mx-4">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <UtensilsCrossed className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline">Med膳Connect</CardTitle>
          <CardDescription>
            Your guide to safe eating with medication.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="patient@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" asChild>
            <Link href="/dashboard">Login</Link>
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link href="#" className="underline text-primary">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
