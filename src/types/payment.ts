export type PaymentPlanType = 'free' | 'beginner' | 'professional' | 'company';

export interface PaymentPlan {
  type: PaymentPlanType;
  price: number; //CUP
  trialTime: number | null; // days for free plan
  //
  maxBusinessCount: number;
  maxBusinessPostsCount: number;
}
