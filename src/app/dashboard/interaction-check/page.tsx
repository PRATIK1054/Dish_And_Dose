import { InteractionChecker } from "@/components/interaction-checker";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

function InteractionCheckerWithSuspense() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
      <InteractionChecker />
    </Suspense>
  )
}

export default function InteractionCheckPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold font-headline">Interaction Check</h1>
      <InteractionCheckerWithSuspense />
    </div>
  )
}
