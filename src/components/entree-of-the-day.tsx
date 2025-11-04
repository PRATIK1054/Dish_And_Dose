"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { getEntreeOfTheDay } from "@/ai/flows/entree-of-the-day";
import { useMedications } from "@/hooks/use-medications";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Lightbulb } from "lucide-react";

export function EntreeOfTheDay() {
  const { medications, isLoaded } = useMedications();
  const [entree, setEntree] = useState("");
  const [isPending, startTransition] = useTransition();

  const entreeImage = PlaceHolderImages.find((p) => p.id === "entree-of-the-day");

  const fetchEntree = () => {
    startTransition(async () => {
      // Use a default empty list if not loaded yet
      const currentMedications = isLoaded ? medications : [];
      try {
        const result = await getEntreeOfTheDay({ medicationList: currentMedications });
        setEntree(result.entreeSuggestion);
      } catch (error) {
        console.error("Failed to fetch entree:", error);
        setEntree("Could not get a suggestion. Please try again.");
      }
    });
  };

  useEffect(() => {
    fetchEntree();
  }, [isLoaded]);

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-accent" />
          <CardTitle className="font-headline">Entrée of the Day</CardTitle>
        </div>
        <CardDescription>
          A safe and delicious meal suggestion based on your medications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isPending && !entree ? (
          <div className="flex items-center justify-center h-48 gap-2 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span>Finding a tasty suggestion...</span>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {entreeImage && (
              <div className="relative w-full h-48 overflow-hidden rounded-lg">
                <Image
                  src={entreeImage.imageUrl}
                  alt={entreeImage.description}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  data-ai-hint={entreeImage.imageHint}
                />
              </div>
            )}
            <div className="flex flex-col justify-center">
              <p className="text-2xl font-bold text-foreground">{entree}</p>
              {medications.length === 0 && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Add your medications for a more personalized suggestion.
                </p>
              )}
              <Button
                onClick={fetchEntree}
                disabled={isPending}
                className="mt-4 self-start bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Loader2
                  className={`mr-2 h-4 w-4 ${
                    isPending ? "animate-spin" : "hidden"
                  }`}
                />
                New Suggestion
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
