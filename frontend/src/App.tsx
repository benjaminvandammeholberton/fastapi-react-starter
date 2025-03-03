// src/App.tsx
import { RouterProvider } from "react-router-dom";
import router from "./router";
import Footer from "./components/Footer";
import { ThemeProvider } from "./providers/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col items-center justify-between pt-6 pb-2">
        <RouterProvider router={router} />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
