import { Link } from "react-router-dom";
import { ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import cornsImage from "@/assets/corn.webp";

interface CornDetailsCardProps {
  unitPrice: number;
}

export const CornDetailsCard = ({ unitPrice }: CornDetailsCardProps) => {
  return (
    <div className="flex flex-col gap-6">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-2xl text-yellow-800">
            Premium Organic corns
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
            <img
              src={cornsImage}
              alt="Fresh corns"
              className="object-cover w-full h-full"
            />
          </div>
          {/* Details */}
          <div className="space-y-4 w-full">
            <div className="flex justify-between items-center">
              <span className="font-medium">Price:</span>
              <span className="text-yellow-700 font-bold">
                ${unitPrice.toFixed(2)}/kg
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Origin:</span>
              <span>Local farm</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Type:</span>
              <span>Organic</span>
            </div>
            <Separator />
            <div className="space-y-2">
              <h4 className="font-medium">Description:</h4>
              <p className="text-sm text-muted-foreground">
                Our organic corns are grown without pesticides or harmful
                chemicals. Harvested at their optimal point to ensure the best
                flavor and nutritional value. Perfect for salads, juices, or as
                a healthy snack.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
 
    </div>
  );
};
