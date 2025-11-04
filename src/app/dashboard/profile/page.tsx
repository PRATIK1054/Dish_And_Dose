import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">My Profile</h1>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="https://picsum.photos/seed/user/80/80" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">Jane Doe</CardTitle>
              <CardDescription>jane.doe@example.com</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />
          <div className="grid gap-4 pt-4 md:grid-cols-2">
            <div className="p-4 rounded-lg bg-secondary">
              <h3 className="font-semibold text-secondary-foreground">Age</h3>
              <p className="text-muted-foreground">34</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary">
              <h3 className="font-semibold text-secondary-foreground">Gender</h3>
              <p className="text-muted-foreground">Female</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-secondary">
            <h3 className="font-semibold text-secondary-foreground">Medical Conditions</h3>
            <p className="text-muted-foreground">Hypertension, Type 2 Diabetes</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
