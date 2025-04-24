import { Suspense } from "react";
import { AppRouter } from "@/routes/config";
import { Toaster } from "sonner";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppRouter />
      <Toaster richColors position="top-right" />
    </Suspense>
  );
}

export default App;
