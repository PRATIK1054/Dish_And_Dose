export type Interaction = {
  id: number;
  drugName: string;
  foodInteraction: string;
  recommendation: string;
  severity: 'High' | 'Moderate' | 'Low';
};

export const interactions: Interaction[] = [
  {
    id: 1,
    drugName: "Warfarin",
    foodInteraction: "Vitamin K-rich foods (e.g., spinach, kale, broccoli)",
    recommendation: "Maintain a consistent intake of Vitamin K. Drastic changes can affect drug efficacy.",
    severity: "High",
  },
  {
    id: 2,
    drugName: "Digoxin",
    foodInteraction: "High-fiber foods (e.g., bran), licorice",
    recommendation: "Avoid taking with high-fiber meals as it can reduce absorption. Avoid licorice as it can increase risk of toxicity.",
    severity: "High",
  },
  {
    id: 3,
    drugName: "Tetracycline",
    foodInteraction: "Dairy products (milk, cheese, yogurt), calcium/iron supplements",
    recommendation: "Take 1-2 hours before or after consuming dairy or supplements to ensure proper absorption.",
    severity: "High",
  },
  {
    id: 4,
    drugName: "MAOIs (e.g., Phenelzine)",
    foodInteraction: "Tyramine-rich foods (aged cheeses, cured meats, soy sauce, beer)",
    recommendation: "Strictly avoid tyramine-rich foods to prevent a dangerous spike in blood pressure.",
    severity: "High",
  },
  {
    id: 5,
    drugName: "Statins (e.g., Atorvastatin, Simvastatin)",
    foodInteraction: "Grapefruit and grapefruit juice",
    recommendation: "Avoid grapefruit as it can increase drug levels in your blood, raising the risk of side effects.",
    severity: "Moderate",
  },
  {
    id: 6,
    drugName: "Levothyroxine",
    foodInteraction: "Walnuts, soybean flour, cottonseed meal, high-fiber foods",
    recommendation: "Take on an empty stomach 30-60 minutes before breakfast for best absorption. Separate from these foods by several hours.",
    severity: "Moderate",
  },
  {
    id: 7,
    drugName: "Metformin",
    foodInteraction: "Alcohol",
    recommendation: "Limit alcohol intake as it can increase the risk of lactic acidosis, a rare but serious side effect.",
    severity: "Moderate",
  },
  {
    id: 8,
    drugName: "Ciprofloxacin",
    foodInteraction: "Caffeine, dairy products",
    recommendation: "Can increase caffeine's effects. Take 2 hours before or 6 hours after dairy or calcium-fortified juices.",
    severity: "Moderate",
  },
  {
    id: 9,
    drugName: "Aspirin",
    foodInteraction: "Alcohol, foods high in salicylates (some fruits, spices)",
    recommendation: "Limit alcohol to reduce risk of stomach bleeding. Be mindful of high-salicylate foods if you are sensitive.",
    severity: "Low",
  },
  {
    id: 10,
    drugName: "Ibuprofen",
    foodInteraction: "Alcohol",
    recommendation: "Avoid or limit alcohol to decrease the risk of stomach irritation and bleeding.",
    severity: "Low",
  },
];
