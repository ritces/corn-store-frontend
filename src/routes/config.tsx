// React
import { Suspense } from "react";

// React Router
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// Components
import { MainLayout } from "@/components/layout/MainLayout";

// Pages
import { PurchaseHistoryPage } from "@/pages/PurchaseHistoryPage";
import { CornPurchasePage } from "@/pages/CornPurchasePage";

// Helper for Suspense fallback
const SuspenseFallback = () => (
  <div className="flex justify-center items-center h-screen">Loading...</div>
);

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <PurchaseHistoryPage />
          </Suspense>
        ),
      },
      {
        path: "/purchase",
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <CornPurchasePage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
