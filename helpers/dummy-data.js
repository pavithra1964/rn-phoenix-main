import { DashboardMeasurePurchase } from "../models/DashboardMeasure";

export const PurchaseMeasures = [
  new DashboardMeasurePurchase(1, "Invoice Aged > 60 days", 4, 82, 2),
  new DashboardMeasurePurchase(2, "Invoice Pending Approval", 4, 83, 4),
  new DashboardMeasurePurchase(3, "Invoice Awaiting Reconciliation", 4, 84, 10),
  new DashboardMeasurePurchase(4, "No of Critical Spare < Minimum", 4, 85, 4),
  new DashboardMeasurePurchase(5, "PO Awaiting Vessel Receipt", 4, 86, 2),
];
