import React from 'react'
import { Link } from 'react-router-dom'

export default function DetailPageComponent({ children, title }) {
    return (
        <div className='max-w-xl mx-auto  bg-gray-50 rounded p-4'>
            <div className="flex items-center justify-between border-b border-teal-500  p-5">
                <div className='text-2xl text-teal-500 font-semibold'>{title}</div>
                <Link to="/" className='px-3 py-1.5 text-sm font-semibold text-white bg-red-500'>Back</Link>
            </div>
            {children}
        </div>
    )
}
