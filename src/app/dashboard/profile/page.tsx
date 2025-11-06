"use client";

import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { AppContext } from '@/context/app-context';
import { Textarea } from '@/components/ui/textarea';

const profileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  age: z.coerce.number().min(1, { message: 'Age must be a positive number.' }),
  gender: z.string().min(1, { message: 'Please select a gender.' }),
  medicalConditions: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { dict, lang, setLang } = useContext(AppContext);
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const [userData, setUserData] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    age: 34,
    gender: "Female",
    medicalConditions: "Hypertension, Type 2 Diabetes",
  });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userData.name,
      age: userData.age,
      gender: userData.gender,
      medicalConditions: userData.medicalConditions,
    },
  });
  
  useEffect(() => {
    form.reset(userData);
  }, [userData, form]);

  const onSubmit = (data: ProfileFormValues) => {
    setUserData((prev) => ({ ...prev, ...data }));
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully saved.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">{dict.myProfile}</h1>
        {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="https://picsum.photos/seed/user/80/80" />
              <AvatarFallback>{userData.name.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{userData.name}</CardTitle>
              <CardDescription>{userData.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />
          {isEditing ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{dict.name || 'Name'}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-4 md:grid-cols-2">
                   <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{dict.age}</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{dict.gender}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="medicalConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{dict.medicalConditions}</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </Form>
          ) : (
            <>
              <div className="grid gap-4 pt-4 md:grid-cols-2">
                <div className="p-4 rounded-lg bg-secondary">
                  <h3 className="font-semibold text-secondary-foreground">{dict.age}</h3>
                  <p className="text-muted-foreground">{userData.age}</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary">
                  <h3 className="font-semibold text-secondary-foreground">{dict.gender}</h3>
                  <p className="text-muted-foreground">{userData.gender}</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-secondary">
                <h3 className="font-semibold text-secondary-foreground">{dict.medicalConditions}</h3>
                <p className="text-muted-foreground">{userData.medicalConditions}</p>
              </div>
            </>
          )}

          <Separator />
          <div className="space-y-2">
            <Label htmlFor="language-select">{dict.language}</Label>
            <Select value={lang} onValueChange={setLang}>
              <SelectTrigger id="language-select" className="max-w-xs">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Hindi">हिन्दी (Hindi)</SelectItem>
                <SelectItem value="Marathi">मराठी (Marathi)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
