import { PurchaseForm } from "@/components/purchase/PurchaseForm";
import { CornDetailsCard } from "@/components/purchase/CornDetailsCard";

export const CornPurchasePage = () => {
  const unitPrice = 2.5;

  return (
    <div className="grid gap-8 md:grid-cols-2 container mx-auto p-4">
      <PurchaseForm unitPrice={unitPrice} />
      <CornDetailsCard unitPrice={unitPrice} />
    </div>
  );
};
