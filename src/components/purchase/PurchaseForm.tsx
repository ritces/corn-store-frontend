import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { corn, Truck, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { purchaseSchema, type PurchaseFormValues } from "./purchaseSchema";
import { toast } from "sonner";
import { purchasecorn } from "@/services/corns.service";
import { cornPurchasePayload } from "@/services/interfaces/corns.interface";
import { AxiosError } from "axios";
interface PurchaseFormProps {
  unitPrice: number;
}

export const PurchaseForm = ({ unitPrice }: PurchaseFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PurchaseFormValues>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      totalPrice: 2.5,
      status: "Delivered",
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });

  const handleFormSubmit = async (data: PurchaseFormValues) => {
    console.log("Validated form data:", data);

    const payload: cornPurchasePayload = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
      totalPrice: data.totalPrice ?? 2.5,
      status: data.status ?? "Delivered",
    };

    try {
      const response = await purchasecorn(payload);
      console.log("Purchase response:", response);
      toast.success("Order placed successfully!", {
        description: `Thank you, ${payload.name}! Your corns are on the way to ${payload.address}.`,
        duration: 5000,
      });
      reset();
    } catch (error) {
      console.error("Error purchasing corns:", error);
      console.log(error);
      if (error instanceof AxiosError && error.response?.data?.retryAfter) {
        toast.error("Error purchasing corns:", {
          description: `Not allowed to purchase more than 1 corn per minute. Please try again in ${error.response.data.retryAfter} seconds.`,
          duration: 5000,
        });
      } else {
        toast.error("Error purchasing corns:", {
          description: `Error purchasing corns: `,
          duration: 5000,
        });
      }
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl text-yellow-800">
            Purchase Information
          </CardTitle>
          <Link to="/purchase-history">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-yellow-700"
            >
              <ClipboardList className="h-4 w-4" />
              View Purchase History
            </Button>
          </Link>
        </div>
        <CardDescription>
          Please complete your details to place an order
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-yellow-700">
              Personal Information
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Your phone number"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Delivery Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-yellow-700 flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Delivery Address
            </h3>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Street and number"
                {...register("address")}
              />
              {errors.address && (
                <p className="text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="Your city"
                  {...register("city")}
                />
                {errors.city && (
                  <p className="text-sm text-red-600">{errors.city.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="postal-code">Postal Code</Label>
                <Input
                  id="postalCode"
                  placeholder="Postal code"
                  {...register("postalCode")}
                />
                {errors.postalCode && (
                  <p className="text-sm text-red-600">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Your Order */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-yellow-700 flex items-center gap-2">
              <corn className="h-5 w-5" />
              Your Order
            </h3>
            <p className="text-muted-foreground">
              Standard package of organic corns (1kg)
            </p>
          </div>

          {/* Total Price */}
          <div className="rounded-lg bg-yellow-100 p-4">
            <div className="flex justify-between font-bold text-lg text-yellow-900">
              <span>Total price:</span>
              <span>${unitPrice.toFixed(2)}</span>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-700"
          >
            Buy Now
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
