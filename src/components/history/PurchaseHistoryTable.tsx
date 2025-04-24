import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Copy } from "lucide-react";
import { toast } from "sonner";

// interfaces
import { PurchaseRecord } from "@/services/interfaces/corns.interface";

interface PurchaseHistoryTableProps {
  purchases: PurchaseRecord[];
  onBuyAgain: (purchaseId: string) => void;
}

export const PurchaseHistoryTable = ({
  purchases,
  onBuyAgain,
}: PurchaseHistoryTableProps) => {
  const handleCopyId = (id: string) => {
    navigator.clipboard
      .writeText(id)
      .then(() => {
        toast.success("Order ID copied to clipboard!", { id: `copy-${id}` });
      })
      .catch((err) => {
        console.error("Failed to copy ID: ", err);
        toast.error("Failed to copy Order ID.");
      });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Order ID</TableHead>
          <TableHead>
            <div className="flex items-center gap-1">
              Date
              <ArrowUpDown className="h-3 w-3" />
            </div>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="max-w-[400px]">Delivery Address</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purchases.map((purchase) => (
          <TableRow key={purchase.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <span className="truncate max-w-[80px]" title={purchase.id}>
                  {purchase.id}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-foreground"
                  onClick={() => handleCopyId(purchase.id)}
                  title="Copy Order ID"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </TableCell>
            <TableCell>
              {new Date(purchase.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>{purchase.name}</TableCell>
            <TableCell>{purchase.email}</TableCell>
            <TableCell>${purchase.totalPrice.toFixed(2)}</TableCell>
            <TableCell
              className="max-w-[400px] truncate"
              title={purchase.address}
            >
              {purchase.address}
            </TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  purchase.status === "Delivered"
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : purchase.status === "Processing"
                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    : "bg-red-100 text-red-800 hover:bg-red-100"
                }
              >
                {purchase.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="outline"
                size="sm"
                className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                onClick={() => onBuyAgain(purchase.id)}
              >
                Buy Again
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
