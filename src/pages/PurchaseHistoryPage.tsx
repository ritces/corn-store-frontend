import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Wheat } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PurchaseHistoryTable } from "@/components/history/PurchaseHistoryTable";
import { PurchaseHistoryFilters } from "@/components/history/PurchaseHistoryFilters";
import { PurchaseHistoryPagination } from "@/components/history/PurchaseHistoryPagination";

// services
import { getcornPurchaseHistory } from "@/services/corns.service";
import { PurchaseRecord } from "@/services/interfaces/corns.interface";

export function PurchaseHistoryPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [allPurchases, setAllPurchases] = useState<PurchaseRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({
    from: undefined,
    to: undefined,
  });
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setError(null);
    const fetchPurchases = async () => {
      try {
        const purchases = await getcornPurchaseHistory();
        setAllPurchases(purchases);
      } catch (error) {
        setError("Error fetching purchases");
        console.error("Error fetching purchases:", error);
      }
    };
    fetchPurchases();
  }, []);

  // Check if allPurchases is an array
  const purchases = Array.isArray(allPurchases) ? allPurchases : [];

  // Filter purchases based on search, date range, and status
  const filteredPurchases = purchases.filter((purchase: PurchaseRecord) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      purchase.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      purchase.address.toLowerCase().includes(searchQuery.toLowerCase());

    // Date filter
    console.log("purchase.createdAt", purchase.createdAt);
    const purchaseDate = new Date(purchase.createdAt);
    const matchesDateFrom = !dateRange.from || purchaseDate >= dateRange.from;
    const matchesDateTo = !dateRange.to || purchaseDate <= dateRange.to;

    // Status filter
    const matchesStatus =
      statusFilter === "all" || purchase.status === statusFilter;

    return matchesSearch && matchesDateFrom && matchesDateTo && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPurchases.length / itemsPerPage);
  const paginatedPurchases = filteredPurchases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleBuyAgain = () => {
    navigate("/purchase");
  };

  // Clear filters
  const clearFilters = () => {
    setSearchQuery("");
    setDateRange({ from: undefined, to: undefined });
    setStatusFilter("all");
    setCurrentPage(1);
  };

  console.log("error", error);
  if (error) {
    return (
      <div className="text-center py-8">
        <span className="text-red-500">{error}</span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-yellow-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Button
            variant="ghost"
            className="flex items-center gap-2 pl-0 text-yellow-700"
            onClick={() => navigate("/purchase")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Purchase
          </Button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <Wheat className="h-8 w-8 text-yellow-600" />
          <h1 className="text-3xl font-bold text-yellow-800">
            Purchase History
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your corn Orders</CardTitle>
            <CardDescription>
              View all your previous corn purchases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PurchaseHistoryFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              onClearFilters={clearFilters}
            />

            {paginatedPurchases.length > 0 ? (
              <>
                <PurchaseHistoryTable
                  purchases={paginatedPurchases}
                  onBuyAgain={handleBuyAgain}
                />
                <PurchaseHistoryPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredPurchases.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No orders found matching your filters.
                </p>
                {filteredPurchases.length !== allPurchases.length && (
                  <Button
                    className="mt-4"
                    variant="outline"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
