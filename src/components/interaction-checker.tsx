"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { interactions, type Interaction } from "@/lib/interactions";
import { useSpeechSynthesis } from "@/hooks/use-speech-synthesis";
import { AppContext } from "@/context/app-context";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Volume2, Search, XCircle } from "lucide-react";
import { Separator } from "./ui/separator";

const formSchema = z.object({
  drugName: z.string().min(2, { message: "Drug name must be at least 2 characters." }),
});

export function InteractionChecker() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<Interaction[]>([]);
  const [searchedTerm, setSearchedTerm] = useState("");
  const { speak, isSpeaking } = useSpeechSynthesis();
  const { dict } = useContext(AppContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      drugName: "",
    },
  });

  const handleSearch = useCallback((drugName: string) => {
    const searchTerm = drugName.toLowerCase().trim();
    if (!searchTerm) return;
    const foundInteractions = interactions.filter(
      (i) => i.drugName.toLowerCase().includes(searchTerm)
    );
    setResults(foundInteractions);
    setSearchedTerm(drugName);
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSearch(values.drugName);
  }

  useEffect(() => {
    const drugNameFromQuery = searchParams.get('drugName');
    if (drugNameFromQuery) {
      form.setValue('drugName', drugNameFromQuery);
      handleSearch(drugNameFromQuery);
    }
  }, [searchParams, form, handleSearch]);

  function handleSpeak() {
    if (results.length > 0) {
      const textToSpeak = results.map(result => 
        `${dict.speakInteractionFor || 'Interaction for'} ${result.drugName}. ${dict.speakSeverity || 'Severity'}: ${result.severity}. ${dict.speakInteractsWith || 'Interacts with'} ${result.foodInteraction}. ${dict.speakRecommendation || 'Recommendation'}: ${result.recommendation}`
      ).join('. ');
      speak({ text: textToSpeak });
    }
  }

  const getSeverityBadgeVariant = (severity: Interaction['severity']) => {
    switch (severity) {
      case 'High': return 'destructive';
      case 'Moderate': return 'secondary';
      default: return 'outline';
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{dict.interactionCheckTitle}</CardTitle>
          <CardDescription>{dict.interactionCheckDescription2}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2">
              <FormField
                control={form.control}
                name="drugName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="sr-only">{dict.drugName}</FormLabel>
                    <FormControl>
                      <Input placeholder={dict.drugNamePlaceholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Search className="mr-2" />
                {dict.check}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {searchedTerm && (
        <Card className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" data-state="open">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="space-y-1">
                <CardTitle>{dict.resultsFor} "{searchedTerm}"</CardTitle>
                <CardDescription>{results.length} {dict.interactionsFound}</CardDescription>
              </div>
              {results.length > 0 && (
                <Button variant="ghost" size="icon" onClick={handleSpeak} disabled={isSpeaking}>
                  <Volume2 className={isSpeaking ? 'text-accent animate-pulse' : ''} />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((result) => (
                  <div key={result.id} className="p-4 border rounded-lg bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{result.drugName}</h3>
                      <Badge variant={getSeverityBadgeVariant(result.severity)}>{result.severity}</Badge>
                    </div>
                    <Separator className="my-2" />
                    <div className="grid gap-4 mt-2 sm:grid-cols-2">
                      <div>
                        <h4 className="font-semibold">{dict.foodInteraction}</h4>
                        <p className="text-muted-foreground">{result.foodInteraction}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">{dict.recommendation}</h4>
                        <p className="text-muted-foreground">{result.recommendation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Alert variant="destructive">
                <XCircle className="w-4 h-4" />
                <AlertTitle>{dict.noInteractionsFound}</AlertTitle>
                <AlertDescription>
                  {dict.noInteractionsFoundMessage.replace('{searchedTerm}', searchedTerm)}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
