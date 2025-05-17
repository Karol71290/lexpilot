import "./App.css";
import { Toaster } from "@/components/ui/toaster"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";
import PromptBuilder from "./pages/PromptBuilder";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import ChatTest from "./pages/ChatTest";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Set theme based on system preference on initial load
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/prompt-builder",
    element: <PromptBuilder />
  },
  {
    path: "/settings",
    element: <Settings />
  },
  {
    path: "/chat-test",
    element: <ChatTest />
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default App;
