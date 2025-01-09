export type OnboardingFormData = {
  role: string;
  industry: string;
  goal: 'promotion' | 'switch' | 'skills';
  challenge: 'time' | 'clarity' | 'network';
  habitGoals: string[];
  habitMotivations: string[];
  preferredCategories: string[];
};