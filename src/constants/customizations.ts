/** Customization options relevant to Japanese dining */
export const CUSTOMIZATION_OPTIONS = [
  "Extra soy sauce",
  "Extra wasabi",
  "Extra ginger",
  "No wasabi",
  "No ginger",
  "Extra spicy",
  "Less spicy",
  "Extra sauce",
  "Extra sesame",
  "No onion",
  "Extra nori",
  "Brown rice",
] as const;

export type CustomizationOption = (typeof CUSTOMIZATION_OPTIONS)[number];
