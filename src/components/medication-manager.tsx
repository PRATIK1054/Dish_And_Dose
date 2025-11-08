"use client";

import { useMedications } from "@/hooks/use-medications";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus, X, Pill, Loader2 } from "lucide-react";
import React, { useContext } from 'react';
import { AppContext } from "@/context/app-context";

const formSchema = z.object({
  medicationName: z.string().min(2, { message: "Name is too short." }),
});

export function MedicationManager() {
  const { medicationDocs, addMedication, removeMedication, isLoaded } = useMedications();
  const { dict } = useContext(AppContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { medicationName: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addMedication(values.medicationName);
    form.reset();
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Add New Medication</CardTitle>
          <CardDescription>Add a medication to your personal list.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2">
              <FormField
                control={form.control}
                name="medicationName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="sr-only">Medication Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Aspirin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Plus className="mr-2" />
                Add
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Your Current Medications</CardTitle>
          <CardDescription>This list is used for personalized suggestions.</CardDescription>
        </CardHeader>
        <CardContent>
          {!isLoaded ? (
            <div className="flex items-center justify-center h-24">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : medicationDocs && medicationDocs.length > 0 ? (
            <ul className="space-y-2">
              {medicationDocs.map((med) => (
                <li key={med.id} className="flex items-center justify-between p-2 rounded-md bg-secondary">
                  <div className="flex items-center gap-2">
                    <Pill className="w-4 h-4 text-secondary-foreground" />
                    <span className="font-medium text-secondary-foreground">{med.name}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => removeMedication(med.id)}>
                    <X className="w-4 h-4" />
                    <span className="sr-only">Remove {med.name}</span>
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-8 text-center text-muted-foreground">{dict.noMedications || 'You haven\'t added any medications yet.'}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
