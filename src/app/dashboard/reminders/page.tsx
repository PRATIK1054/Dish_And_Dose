import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BellPlus } from "lucide-react";

export default function RemindersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Medication Reminders</h1>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Set a New Reminder</CardTitle>
          <CardDescription>We'll notify you when it's time to take your medication.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="med-name">Medication Name</Label>
            <Input id="med-name" placeholder="e.g., Levothyroxine" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage</Label>
              <Input id="dosage" placeholder="e.g., 50mcg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="meal-timing">Meal Timing</Label>
            <Select>
              <SelectTrigger id="meal-timing">
                <SelectValue placeholder="Select meal timing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="before">Take before food</SelectItem>
                <SelectItem value="with">Take with food</SelectItem>
                <SelectItem value="after">Take after food</SelectItem>
                <SelectItem value="any">Anytime</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            <BellPlus className="mr-2" />
            Set Reminder
          </Button>
        </CardContent>
      </Card>
      {/* A section for existing reminders could go here */}
    </div>
  )
}
