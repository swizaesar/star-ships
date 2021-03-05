import Detail from "../Pages/Detail";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/Error/404";

export default [
    {
        component: Home,
        path: "/",
        layout: import("./RouteGuestLayout"),
        title: "Home",
        name: "Home",
        role: "",
    },
    {
        component: Detail,
        path: "/start-ship/:id",
        layout: import("./RouteGuestLayout"),
        title: "Detail",
        name: "Detail",
        role: "",
    },
    {
        component: ErrorPage,
        path: "/404",
        layout: import("./RouteGuestLayout"),
        title: "404",
        name: "404",
        role: "",
    },
];
