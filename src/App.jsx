import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NavbarProvider } from "./context/NavbarContext";
import AppLayout from "./layout/app-layout";
import Auth from "./pages/Auth";
import LandingPage from "./pages/LandingPage";
import Link from "./pages/Link";
import RedirectLink from "./pages/RedirectLink";
import UrlProvider from "./context/UrlContext";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/link/:id",
        element: <Link />,
      },
      {
        path: ":id",
        element: <RedirectLink />,
      },
    ],
  },
]);

function App() {
  return (
    <UrlProvider>
      <NavbarProvider>
        <RouterProvider router={router} />
      </NavbarProvider>
    </UrlProvider>
  );
}

export default App;
