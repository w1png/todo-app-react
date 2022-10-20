import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Route, } from "react-router-dom";

import MainPage from "./pages/MainPage";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  }
]);

root.render(
  <RouterProvider router={router} />
);

