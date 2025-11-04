import { EntreeOfTheDay } from "@/components/entree-of-the-day";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold font-headline">Welcome back!</h1>
        <p className="text-muted-foreground">
          Here's what's on the menu for your health today.
        </p>
      </header>
      <EntreeOfTheDay />
    </div>
  );
}
