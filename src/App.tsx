import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import SharedModals from "./views/SharedModals";

dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Singapore");

const router = createBrowserRouter([
  {
    path: "/login",
    lazy: async () => {
      const { SignIn } = await import("./pages/SignIn");
      return { Component: SignIn };
    },
  },
  {
    path: "/",
    lazy: async () => {
      const { HomeLayout } = await import("./layouts/Home/Layout");
      return { Component: HomeLayout };
    },
    children: [
      {
        path: "dashboard",
        lazy: async () => {
          const { Dashboard } = await import("./pages/Dashboard");
          return { Component: Dashboard };
        },
      },
      {
        path: "users",
        lazy: async () => {
          const { Users } = await import("./pages/Users");
          return { Component: Users };
        },
      },
      {
        path: "users/:userId/pets",
        lazy: async () => {
          const { Pets } = await import("./pages/Pets");
          return { Component: Pets };
        },
      },
      {
        path: "bookings",
        lazy: async () => {
          const { Bookings } = await import("./pages/Bookings");
          return { Component: Bookings };
        },
      },
      {
        path: "bookings/new",
        lazy: async () => {
          const { CreateBooking } = await import("./pages/CreateBooking");
          return { Component: CreateBooking };
        },
      },
      {
        path: "services",
        lazy: async () => {
          const { Services } = await import("./pages/Services");
          return { Component: Services };
        },
      },
      {
        path: "services/:serviceId",
        lazy: async () => {
          const { ServiceDetails } = await import("./pages/ServiceDetails");
          return { Component: ServiceDetails };
        },
      },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={router} />
        <SharedModals />
      </QueryClientProvider>
    </>
  );
}

export default App;
