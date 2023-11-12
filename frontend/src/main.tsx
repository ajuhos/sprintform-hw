import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Layout, TransactionsPageContent, InsightsPageContent} from "./areas";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// Material UI
import {CssBaseline, ThemeProvider} from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {SprintformMUITheme} from "./theme.ts";

// React Query
const queryClient = new QueryClient()

// Routing
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <TransactionsPageContent />
            },
            {
                path: "/insights",
                element: <InsightsPageContent />
            },
            {
                path: "/create",
                element: <span>CREATE</span>
            },
            {
                path: "/edit/:id",
                element: <span>EDIT</span>
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <CssBaseline />
      <ThemeProvider theme={SprintformMUITheme}>
          <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
          </QueryClientProvider>
      </ThemeProvider>
  </React.StrictMode>,
)
