import { Outlet } from "react-router-dom";
import { Wheat } from "lucide-react";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-yellow-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-5 flex items-center gap-2">
          <Wheat className="h-8 w-8 text-yellow-600" />
          <h1 className="text-2xl font-bold text-yellow-800">Corn Store</h1>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="bg-white mt-auto">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-gray-600">
            © 2025 corn Store. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
