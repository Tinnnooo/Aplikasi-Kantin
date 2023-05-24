import React from 'react'
import { Link } from 'react-router-dom'

export default function TambahDataComponent({ children, title }) {
    return (
        <div className='max-w-lg mx-auto p-5 border rounded shadow-lg'>
            <div className="flex justify-between items-center mb-5 border-b border-teal-500 pb-2">
                <div className="text-2xl font-medium text-teal-500">
                    {title}
                </div>
                <Link to="/" className='px-3 py-1.5 text-sm font-semibold text-white bg-red-500'>Back</Link>
            </div>
            {children}
        </div>
    )
}
