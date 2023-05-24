import React, { useEffect, useState } from 'react'
import axiosClient from '../axios';
import PenjualanItemList from './PenjualanItemList';
import { useStateContext } from '../contexts/ContextProvider';
import { Link } from 'react-router-dom';

export default function PenjualanItem({ user }) {
    const [penjualans, setPenjualans] = useState([]);
    const { showToast } = useStateContext();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosClient.get('/v1/penjualan').then(({ data }) => {
            setPenjualans(data);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }, [])

    const onDelete = (id) => {
        axiosClient.delete(`/v1/penjualan/${id}`).then(({ data }) => {
            const newPenjualan = penjualans.filter((penjualan) => penjualan.id !== id);
            setPenjualans(newPenjualan);
            showToast(data.message);
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div>
            <div className="flex items-center mb-5 justify-between">
                <h2 className='text-lg font-medium text-gray-500'>Penjualan</h2>
                <Link to="/penjualan/add" className='px-3 py-1.5 bg-green-600 text-white text-sm text-semibold'>Tambah Data</Link>
            </div>
            <table className='w-full text-left'>
                <thead>
                    <tr>
                        <th className='border border-gray-300 p-2 text-sm font-semibold text-white bg-gray-500'>No</th>
                        <th className='border border-gray-300 p-2 text-sm font-semibold text-white bg-gray-500'>Nama Produk</th>
                        <th className='border border-gray-300 p-2 text-sm font-semibold text-white bg-gray-500'>Tanggal</th>
                        <th className='border border-gray-300 p-2 text-sm font-semibold text-white bg-gray-500'>Qty</th>
                        <th className='border border-gray-300 p-2 text-sm font-semibold text-white bg-gray-500'>Harga Jual</th>
                        <th className='border border-gray-300 p-2 text-sm font-semibold text-white bg-gray-500'>Dibayar</th>
                        <th className='border border-gray-300 p-2 text-sm font-semibold text-white bg-gray-500'>Kembali</th>
                        <th className='border border-gray-300 p-2 text-sm font-semibold text-white bg-gray-500'>Action</th>
                    </tr>
                </thead>
                <tbody className='fade-in-down' style={{ animationDelay: "0.5s" }}>
                    {!loading && penjualans.length > 0 && penjualans.map((penjualan, index) => (
                        <PenjualanItemList key={index} penjualan={penjualan} user={user} onDelete={onDelete} index={index} />
                    ))}
                </tbody>
            </table>
            {loading && (
                <div className='text-center text-sm font-semibold'>Loading...</div>
            )}
        </div>
    )
}
