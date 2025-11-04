import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export default function EducationPage() {
  const educationalContent = [
    {
      title: "What is a food-drug interaction?",
      content: "A food-drug interaction is a change in a drug's effect on the body when the drug is taken with certain foods, beverages, or supplements. These interactions can make a drug less effective, increase its action, or cause unexpected side effects.",
    },
    {
      title: "How can food modify drug effects?",
      content: "Food can affect drugs in several ways. It can slow down or reduce the absorption of a drug into the bloodstream. Some foods contain active substances that can directly interact with a drug, like grapefruit juice increasing the concentration of certain statins. Other foods, like those rich in Vitamin K, can counteract the effects of blood thinners like Warfarin.",
    },
    {
      title: "Why is timing important?",
      content: "The timing of your meals in relation to your medication can be crucial. Some drugs need to be taken on an empty stomach to be fully absorbed, while others should be taken with food to prevent stomach upset or to enhance absorption. Always follow the instructions provided by your doctor or pharmacist.",
    },
    {
      title: "General Safe Medication Practices",
      content: "Always read the label on your prescription. Take your medication exactly as prescribed. Do not mix medication with hot drinks, as heat can destroy its effectiveness. Inform your doctor about all medications you are taking, including over-the-counter drugs and supplements. Avoid alcohol, as it can interact with many medications.",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Learn About Safe Medication Use</h1>
      <p className="text-muted-foreground">Expand your knowledge to stay safe and healthy.</p>
      <Card>
        <CardContent className="p-2 md:p-6">
          <Accordion type="single" collapsible className="w-full">
            {educationalContent.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg text-left hover:no-underline">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
