import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NavbarProvider } from "./context/NavbarContext";
import AppLayout from "./layout/app-layout";
import Auth from "./pages/Auth";
import LandingPage from "./pages/LandingPage";
import Link from "./pages/Link";
import RedirectLink from "./pages/RedirectLink";
import UrlProvider from "./context/UrlContext";
import ProtectedRouter from "./component/ProtectedRouter";
import Dashboard from "./pages/Dashboard";

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
        path: "/dashboard",
        element:
        <ProtectedRouter>
          <Dashboard/>
        </ProtectedRouter>
      },
      {
        path: "/link/:id",
        element: (
          <ProtectedRouter>
            <Link />
          </ProtectedRouter>
        ),
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
