import React, { useEffect, useState } from 'react'
import axiosClient from '../axios';
import StokBarangItemList from './StokBarangItemList';
import { useStateContext } from '../contexts/ContextProvider';
import { Link } from 'react-router-dom';

export default function StokBarangItem({ user }) {
    const { stoks, setStoks, showToast } = useStateContext();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosClient.get('/v1/stok').then(({ data }) => {
            setStoks(data);
            setLoading(false);
        }).catch((res) => {
            console.log(res);
            setLoading(false);
        })
    }, []);

    const onDelete = (id) => {
        axiosClient.delete(`/v1/stok/${id}`).then(({ data }) => {
            const newStok = stoks.filter((stok) => stok.IDproduk !== id)
            setStoks(newStok);
            showToast(data.message)
        }).catch((err) => {
            console.log(data);
        })
    }

    return (
        <div>
            <div className="flex items-center mb-5 justify-between">
                <h2 className='text-lg font-medium text-gray-500'>Stok Barang</h2>
                <Link to="/stok/add" className='px-3 py-1.5 bg-green-600 text-white text-sm text-semibold'>Tambah Data</Link>
            </div>
            <table className='w-full text-left'>
                <thead>
                    <tr>
                        <th className='border border-gray-300 p-2 text-sm font-semibold text-white bg-gray-500'>No</th>
                        <th className='border border-gray-300 p-2 text-sm font-semibold text-white bg-gray-500'>Nama</th>
                        <th className='border border-gray-300 p-2 text-sm font-semibold text-white bg-gray-500'>Harga Beli</th>
                        <th className='border border-gray-300 p-2 text-sm font-semibold text-white bg-gray-500'>Harga Jual</th>
                        <th className='border border-gray-300 p-2 text-sm font-semibold text-white bg-gray-500'>Stok</th>
                        <th className='border border-gray-300 p-2 text-sm font-semibold text-white bg-gray-500'>Kategori</th>
                        <th className='border border-gray-300 p-2 text-sm font-semibold text-white bg-gray-500'>Action</th>
                    </tr>
                </thead>
                <tbody className='fade-in-down' style={{ animationDelay: "0.5s" }}>
                    {!loading && stoks.length > 0 && stoks.map((stok, index) => (
                        <StokBarangItemList key={index} stok={stok} user={user} onDelete={onDelete} index={index} />
                    ))}
                </tbody>
            </table>
            {loading && (
                <div className='text-center text-sm font-semibold'>Loading...</div>
            )}
        </div>
    )
}
