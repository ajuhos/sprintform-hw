import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Layout, TransactionsPageContent} from "./areas";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// Material UI
import {CssBaseline} from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// React Query
const queryClient = new QueryClient()

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
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
      </QueryClientProvider>
  </React.StrictMode>,
)
