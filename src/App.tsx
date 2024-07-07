import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import HomeLayout from "./layouts/Home/Layout";
import Bookings from "./pages/Bookings/Bookings";
import Dashboard from "./pages/Dashboard/Dashboard";
import Services from "./pages/Services/Services";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
      {
        path: "services",
        element: <Services />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
