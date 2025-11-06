"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Pill, ShieldAlert } from "lucide-react";
import Link from "next/link";
import React, { useContext } from 'react';
import { AppContext } from '@/context/app-context';

export default function DashboardPage() {
  const { dict } = useContext(AppContext);
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold font-headline">{dict.welcomeBack}</h1>
        <p className="text-muted-foreground">
          {dict.welcomeMessage}
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-accent" />
              {dict.interactionCheck}
            </CardTitle>
            <CardDescription>
              {dict.interactionCheckDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center flex-1">
             <Link href="/dashboard/interaction-check" className="text-lg font-semibold text-primary hover:underline">{dict.startChecking}</Link>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="w-6 h-6 text-accent" />
              {dict.myMedications}
            </CardTitle>
            <CardDescription>
              {dict.myMedicationsDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center flex-1">
             <Link href="/dashboard/medications" className="text-lg font-semibold text-primary hover:underline">{dict.manageMeds}</Link>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-accent" />
              {dict.learn}
            </CardTitle>
            <CardDescription>
             {dict.learnDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center flex-1">
            <Link href="/dashboard/education" className="text-lg font-semibold text-primary hover:underline">{dict.readArticles}</Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
