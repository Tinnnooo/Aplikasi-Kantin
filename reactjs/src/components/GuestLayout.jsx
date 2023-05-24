import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import Toast from './Toast';

export default function GuestLayout() {
    const { userToken } = useStateContext();

    if (userToken) {
        return <Navigate to="/" />
    }

    return (
        <>
            <div className='h-[100vh] bg-gray-200 flex justify-center items-center z-100'>
                <div className='w-[100%] sm:w-[55%] lg:w-[35%] md:w-[45%] h-[50%] bg-white p-5 rounded'>
                    <Outlet />
                </div>
            </div>
            <Toast />
        </>
    )
}
