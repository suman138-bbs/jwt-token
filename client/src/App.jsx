import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";

import Username from "./components/Username";
import Reset from "./components/Reset";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Recovery from "./components/Recovery";
import Password from "./components/Password";

const LazyPageNotFound = React.lazy(() => import("./components/PageNotFound"));

function App() {
  const route = [
    {
      path: "/",
      element: <Username />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/password",
      element: <Password />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/recovery",
      element: <Recovery />,
    },
    {
      path: "/reset",
      element: <Reset />,
    },
    {
      path: "*",
      element: <LazyPageNotFound />,
    },
  ];
  const routing = useRoutes(route);
  return <Suspense fallback="loading.....">{routing}</Suspense>;
}

export default App;
