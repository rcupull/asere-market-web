import { BaseIdentity } from "./general";

export type BusinessCategory = "food" | "tool" | "clothing" | "service";

export interface Business extends BaseIdentity {
  name: string;
  category: BusinessCategory;
  routeName: string;
  createdBy: string; // userId
}
