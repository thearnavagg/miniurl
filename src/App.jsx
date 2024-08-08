import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/app-layout";
import LandingPage from "./pages/LandingPage";
import Link from "./pages/Link";
import RedirectLink from "./pages/RedirectLink";
import Auth from "./pages/Auth";
import { NavbarProvider } from "./component/NavbarContext";

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
    <NavbarProvider>
      <RouterProvider router={router} />
    </NavbarProvider>
  );
}

export default App;
