import React from 'react'
import { Link } from 'react-router-dom';

export default function PendapatanTenantItemList({ pendapatan, user, onDelete, index }) {
    const removeButton = (id) => {
        if (user.role !== "admin") {
            return;
        }

        return (
            <button className='px-3 py-1.5 bg-red-600 text-white text-sm font-semibold' onClick={e => onDelete(pendapatan.IDpendapatan)}>Remove</button>
        )
    }

    const updateButton = () => {
        if (user.role !== "admin") {
            return;
        }

        return (
            <Link to={`/pendapatan/edit/${pendapatan.IDpendapatan}`} className='px-3 py-1.5 bg-yellow-600 text-white text-sm font-semibold'>Edit</Link>
        )
    }

    return (
        <tr>
            <td className='border border-gray-300 p-2 text-sm font-semibold text-gray-900'>{index + 1}</td>
            <td className='border border-gray-300 p-2 text-sm font-semibold text-gray-900'>{pendapatan.tenant && pendapatan.tenant.namatenant}</td>
            <td className='border border-gray-300 p-2 text-sm font-semibold text-gray-900'>{pendapatan.tanggal}</td>
            <td className='border border-gray-300 p-2 text-sm font-semibold text-gray-900'>{pendapatan.totalPendapatan}</td>
            <td className='border border-gray-300 p-2 text-sm font-semibold text-gray-900'>{pendapatan.setoranTenant}</td>
            <td className='border border-gray-300 p-2 text-sm font-semibold text-gray-900 w-20'>
                <div className="flex justify-end gap-5 items-center">
                    <Link to={`/pendapatan/detail/${pendapatan.IDpendapatan}`} className='px-3 py-1.5 bg-indigo-600 text-white text-sm font-semibold'>Detail</Link>
                    {updateButton()}
                    {removeButton()}
                </div>
            </td>
        </tr>
    )
}
