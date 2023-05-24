import React, { useEffect, useState } from 'react'
import DetailPageComponent from '../components/DetailPageComponent'
import { useParams } from 'react-router-dom';
import axiosClient from '../axios';

export default function PenjualanDetail() {
    const [penjualan, setPenjualan] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axiosClient.get(`/v1/penjualan/${id}`).then(({ data }) => {
            setPenjualan(data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);
    return (
        <DetailPageComponent title="Detail Penjualan">
            <div className="grid grid-cols-2 p-4">
                <div className="col-span-2">
                    <label htmlFor="nama" className='text-md text-gray-700 font-semibold'>Nama Produk:</label>
                    <div className='mt-1 px-2'>
                        <div className='text-md text-green-700 font-bold'>{penjualan.produk && penjualan.produk.nama}</div>
                    </div>
                </div>

                <div className="col-span-1 mt-4">
                    <label htmlFor="tanggal" className='text-md text-gray-700 font-semibold'>Tanggal:</label>
                    <div className='mt-1 px-2'>
                        <div className='text-md text-green-700 font-bold'>{penjualan.tanggal}</div>
                    </div>
                </div>

                <div className="col-span-1 mt-4">
                    <label htmlFor="qty" className='text-md text-gray-700 font-semibold'>Qty:</label>
                    <div className='mt-1 px-2'>
                        <div className='text-md text-green-700 font-bold'>{penjualan.qty}</div>
                    </div>
                </div>

                <div className="col-span-1 mt-4">
                    <label htmlFor="hargajual" className='text-md text-gray-700 font-semibold'>Harga Jual:</label>
                    <div className='mt-1 px-2'>
                        <div className='text-md text-green-700 font-bold'>{penjualan.hargajual}</div>
                    </div>
                </div>

                <div className="col-span-1 mt-4">
                    <label htmlFor="total" className='text-md text-gray-700 font-semibold'>Total:</label>
                    <div className='mt-1 px-2'>
                        <div className='text-md text-green-700 font-bold'>{penjualan.total}</div>
                    </div>
                </div>

                <div className="col-span-1 mt-4">
                    <label htmlFor="dibayar" className='text-md text-gray-700 font-semibold'>Dibayar:</label>
                    <div className='mt-1 px-2'>
                        <div className='text-md text-green-700 font-bold'>{penjualan.dibayar}</div>
                    </div>
                </div>

                <div className="col-span-1 mt-4">
                    <label htmlFor="kembali" className='text-md text-gray-700 font-semibold'>Kembali:</label>
                    <div className='mt-1 px-2'>
                        <div className='text-md text-green-700 font-bold'>{penjualan.kembali}</div>
                    </div>
                </div>
            </div >
        </DetailPageComponent>
    )
}
