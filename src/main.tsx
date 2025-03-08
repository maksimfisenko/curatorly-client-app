import { Provider } from "@/components/ui/provider"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import HealthcheckPage from "./pages/HealthcheckPage.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<App />} />
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/healthcheck" element={<HealthcheckPage />} />
					</Routes>
				</BrowserRouter>
			</Provider>
		</QueryClientProvider>
  	</StrictMode>
)
