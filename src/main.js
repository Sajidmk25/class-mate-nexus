
import { createRoot } from 'react-dom/client'
import App from './App.js'
import './index.css'
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </QueryClientProvider>
);
