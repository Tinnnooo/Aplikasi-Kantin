import React, { useEffect, useState } from 'react'
import axiosClient from '../axios';
import PendapatanTenantItemList from './PendapatanTenantItemList';
import { useStateContext } from '../contexts/ContextProvider';
import { Link } from 'react-router-dom';

export default function PendapatanTenantItem({ user }) {
    const { showToast } = useStateContext();
    const [pendapatans, setPendapatans] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosClient.get('/v1/pendapatantenant').then(({ data }) => {
            setPendapatans(data);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(true);
        });
    }, [])

    const onDelete = (id) => {
        axiosClient.delete(`/v1/pendapatantenant/${id}`).then(({ data }) => {
            const newPendapatan = pendapatans.filter((pendapatan) => pendapatan.IDpendapatan !== id);
            setPendapatans(newPendapatan);
            showToast(data.message);
        }).catch((err) => {
            showToast(err.response.data.message, 'red');
        });
    }

    return (
        <div>
            <div className="flex items-center mb-5 justify-between">
                <h2 className='text-lg font-medium text-gray-500'>Pendapatan Tenant</h2>
                <Link to='/pendapatan/add' className='px-3 py-1.5 bg-green-600 text-white text-sm text-semibold'>Tambah Data</Link>
            </div>
            <table className='w-full text-left'>
                <thead>
                    <tr>
                        <th className='border border-gray-300 p-2 text-sm font-semibold text-white bg-gray-500'>No</th>
                        <th className='border border-gray-300 p-2 text-sm font-semibold text-white bg-gray-500'>Nama Tenant</th>
                        <th className='border border-gray-300 p-2 text-sm font-semibold text-white bg-gray-500'>Tanggal</th>
                        <th className='border border-gray-300 p-2 text-sm font-semibold text-white bg-gray-500'>Total Pendapatan</th>
                        <th className='border border-gray-300 p-2 text-sm font-semibold text-white bg-gray-500'>Setoran Tenant</th>
                        <th className='border border-gray-300 p-2 text-sm font-semibold text-white bg-gray-500'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {!loading && pendapatans.length > 0 && pendapatans.map((pendapatan, index) => (
                        <PendapatanTenantItemList key={index} pendapatan={pendapatan} user={user} onDelete={onDelete} index={index} />
                    ))}
                </tbody>
            </table>
            {loading && (
                <div className='text-center text-sm font-semibold'>Loading...</div>
            )}
        </div>
    )
}
;