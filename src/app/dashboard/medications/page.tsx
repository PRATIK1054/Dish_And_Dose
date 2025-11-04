import { MedicationManager } from "@/components/medication-manager";

export default function MedicationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">My Medications</h1>
      <MedicationManager />
    </div>
  );
}
