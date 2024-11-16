import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./layout/Root";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute";
import AddHero from "./pages/AddHero/AddHero";
import UpdateHero from "./pages/UpdateHero/UpdateHero";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "/addHero",
        element: (
          <PrivateRoute>
            <AddHero />
          </PrivateRoute>
        ),
      },
      {
        path: "/updateMembers/:id",
        element: <UpdateHero />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
