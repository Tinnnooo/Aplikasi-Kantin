import React, { useEffect } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios';
import Toast from './Toast';

export default function DefaultLayout() {
    const { currentUser, setCurrentUser, userToken, setToken, showToast } = useStateContext();

    if (!userToken) {
        return <Navigate to="/login" />
    }

    useEffect(() => {
        axiosClient.get('/v1/me').then(({ data }) => {
            setCurrentUser(data);
        }).catch((err) => {
            setToken(null);
        })
    }, []);

    const logout = () => {
        axiosClient.get('/v1/auth/logout').then(({ data }) => {
            showToast(data.message);
            setToken(null);
        }).catch((res) => {
            console.log(res.response.data.message);
        });
    }

    return (
        <>
            <nav className='fixed bg-emerald-200 w-full py-3 px-10 z-50'>
                <div className='flex justify-between'>
                    <div className="flex items-center gap-10">
                        <h2 className='text-lg font-bold text-gray-700'>Logo</h2>
                        <div className="flex gap-5 items-center">
                            <Link to="/home" className='text-lg font-semibold text-gray-700 hover:text-gray-900'>Home</Link>
                            <Link to="/dashboard" className='text-lg font-semibold text-gray-700 hover:text-gray-900' >Management</Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-10">
                        <div className='text-md font-semibold text-gray-500'>{currentUser.username}</div>
                        <button className='px-3 py-1.5 text-md font-semibold text-red-500 hover:bg-red-500 hover:text-white rounded' onClick={logout}>Logout</button>
                    </div>
                </div>
            </nav>
            <main className='py-[4rem] px-10'>
                <Outlet />
            </main>

            <Toast />
        </>
    )
}
