import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DetailPageComponent from '../components/DetailPageComponent'
import axiosClient from '../axios';

export default function StokDetail() {
    const [stok, setStok] = useState({});
    const { id } = useParams();
    useEffect(() => {
        axiosClient.get(`/v1/stok/${id}`).then(({ data }) => {
            setStok(data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);
    return (
        <DetailPageComponent title="Detail Stok">
            <div className="grid grid-cols-2 p-4">
                <div className="col-span-2">
                    <label htmlFor="nama" className='text-md text-gray-700 font-semibold'>Nama Stok:</label>
                    <div className='mt-1 px-2'>
                        <div className='text-md text-green-700 font-bold'>{stok.nama}</div>
                    </div>
                </div>

                <div className="col-span-1 mt-4">
                    <label htmlFor="hargabeli" className='text-md text-gray-700 font-semibold'>Harga Beli:</label>
                    <div className='mt-1 px-2'>
                        <div className='text-md text-green-700 font-bold'>{stok.hargabeli}</div>
                    </div>
                </div>

                <div className="col-span-1 mt-4">
                    <label htmlFor="hargajual" className='text-md text-gray-700 font-semibold'>Harga Jual:</label>
                    <div className='mt-1 px-2'>
                        <div className='text-md text-green-700 font-bold'>{stok.hargajual}</div>
                    </div>
                </div>

                <div className="col-span-1 mt-4">
                    <label htmlFor="stok" className='text-md text-gray-700 font-semibold'>Stok:</label>
                    <div className='mt-1 px-2'>
                        <div className='text-md text-green-700 font-bold'>{stok.stok}</div>
                    </div>
                </div>

                <div className="col-span-1 mt-4">
                    <label htmlFor="kategori" className='text-md text-gray-700 font-semibold'>Kategori:</label>
                    <div className='mt-1 px-2'>
                        <div className='text-md text-green-700 font-bold'>{stok.kategori}</div>
                    </div>
                </div>
            </div >
        </DetailPageComponent >
    )
}
