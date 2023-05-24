import React, { useEffect, useState } from 'react'
import DetailPageComponent from '../components/DetailPageComponent'
import { useParams } from 'react-router-dom';
import axiosClient from '../axios';

export default function TenantDetail() {
    const [tenant, setTenant] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axiosClient.get(`/v1/tenant/${id}`).then(({ data }) => {
            setTenant(data);
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    return (
        <DetailPageComponent title="Detail Tenant">
            <div className="grid grid-cols-2 p-4">
                <div className="col-span-2">
                    <label htmlFor="namatenant" className='text-md text-gray-700 font-semibold'>Nama Tenant:</label>
                    <div className='mt-1 px-2'>
                        <div className='text-md text-green-700 font-bold'>{tenant.namatenant}</div>
                    </div>
                </div>

                <div className="col-span-1 mt-4">
                    <label htmlFor="detail" className='text-md text-gray-700 font-semibold'>Detail :</label>
                    <div className='mt-1 px-2'>
                        <div className='text-md text-green-700 font-bold'>{tenant.detail}</div>
                    </div>
                </div>
            </div >
        </DetailPageComponent>
    )
}
