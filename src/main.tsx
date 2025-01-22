import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CurrenciesPage from "./pages/Currencies.tsx";
import ConvertorPage from "./pages/Convertor.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CurrenciesPage />,
  },
  {
    path: "/convertor",
    element: <ConvertorPage />,
  }
]);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
