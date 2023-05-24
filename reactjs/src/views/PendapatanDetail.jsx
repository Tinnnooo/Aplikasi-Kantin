import React, { useEffect, useState } from 'react'
import DetailPageComponent from '../components/DetailPageComponent'
import { useParams } from 'react-router-dom';
import axiosClient from '../axios';

export default function PendapatanDetail() {
    const [pendapatan, setPendapatan] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axiosClient.get(`/v1/pendapatantenant/${id}`).then(({ data }) => {
            setPendapatan(data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])


    return (
        <DetailPageComponent title="Detail Pendapatan">
            <div className="grid grid-cols-2 p-4">
                <div className="col-span-2">
                    <label htmlFor="tanggal" className='text-md text-gray-700 font-semibold'>Tanggal:</label>
                    <div className='mt-1 px-2'>
                        <div className='text-md text-green-700 font-bold'>{pendapatan.tanggal}</div>
                    </div>
                </div>

                <div className="col-span-1 mt-4">
                    <label htmlFor="namatenant" className='text-md text-gray-700 font-semibold'>Nama Tenant:</label>
                    <div className='mt-1 px-2'>
                        <div className='text-md text-green-700 font-bold'>{pendapatan.tenant && pendapatan.tenant.namatenant}</div>
                    </div>
                </div>

                <div className="col-span-1 mt-4">
                    <label htmlFor="totalPendapatan" className='text-md text-gray-700 font-semibold'>Total Pendapatan:</label>
                    <div className='mt-1 px-2'>
                        <div className='text-md text-green-700 font-bold'>{pendapatan.totalPendapatan}</div>
                    </div>
                </div>

                <div className="col-span-1 mt-4">
                    <label htmlFor="setoranTenant" className='text-md text-gray-700 font-semibold'>Setoran Tenant:</label>
                    <div className='mt-1 px-2'>
                        <div className='text-md text-green-700 font-bold'>{pendapatan.setoranTenant}</div>
                    </div>
                </div>
            </div >
        </DetailPageComponent>
    )
}
