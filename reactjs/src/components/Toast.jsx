import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'

export default function Toast() {
    const { toast } = useStateContext();
    return (
        <>
            {toast.show && (
                <div className={`fixed w-[250px] bottom-10 right-5 px-3 py-2 text-md rounded font-semibold text-white ${toast.color === 'red' ? "bg-red-500" : "bg-emerald-500"} fade-in-down`} >{toast.message}</div >
            )
            }
        </>
    )
}
