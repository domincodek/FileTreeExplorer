import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFoundPage } from "@/app/NotFoundPage";
import { ExplorerPage } from "@/features/explorer/pages/ExplorerPage";
import { HomePage } from "@/features/tree-import/pages/HomePage";
import { AppShell } from "@/shared/ui/AppShell";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "tree/*", element: <ExplorerPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
