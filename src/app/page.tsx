"use client";

import React, { useContext } from 'react';
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
import { AppContext } from "@/context/app-context";

export default function LoginPage() {
  const { dict } = useContext(AppContext);

  return (
    <main className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm mx-4">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <UtensilsCrossed className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline">{dict.title}</CardTitle>
          <CardDescription>
            {dict.welcomeMessage}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{dict.email}</Label>
            <Input id="email" type="email" placeholder="patient@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{dict.password}</Label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" asChild>
            <Link href="/dashboard">{dict.login}</Link>
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            {dict.dontHaveAccount}{" "}
            <Link href="#" className="underline text-primary">
              {dict.signUp}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
