import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import StokView from "./views/StokView";
import PenjualanView from "./views/PenjualanView";
import TenantView from "./views/TenantView";
import PendapatanView from "./views/PendapatanView";
import StokDetail from "./views/StokDetail";
import PenjualanDetail from "./views/PenjualanDetail";
import TenantDetail from "./views/TenantDetail";
import PendapatanDetail from "./views/PendapatanDetail";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" />
            },
            {
                path: '/home',
                element: <Home />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/stok/add',
                element: <StokView />
            },
            {
                path: '/penjualan/add',
                element: <PenjualanView />
            },
            {
                path: '/tenant/add',
                element: <TenantView />
            },
            {
                path: '/pendapatan/add',
                element: <PendapatanView />
            },
            {
                path: '/stok/edit/:id',
                element: <StokView />
            },
            {
                path: '/penjualan/edit/:id',
                element: <PenjualanView />
            },
            {
                path: '/tenant/edit/:id',
                element: <TenantView />
            },
            {
                path: '/pendapatan/edit/:id',
                element: <PendapatanView />
            },
            {
                path: '/stok/detail/:id',
                element: <StokDetail />
            },
            {
                path: '/penjualan/detail/:id',
                element: <PenjualanDetail />
            },
            {
                path: '/tenant/detail/:id',
                element: <TenantDetail />
            },
            {
                path: '/pendapatan/detail/:id',
                element: <PendapatanDetail />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />
            }
        ]
    }
]);

export default router;