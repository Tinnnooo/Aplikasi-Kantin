import React, { useEffect, useState } from 'react'
import axiosClient from '../axios';
import TenantItemList from './TenantItemList';
import { Link, Navigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

export default function TenantItem({ user }) {
    const { showToast, currentUser } = useStateContext();
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosClient.get('/v1/tenant').then(({ data }) => {
            setTenants(data);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }, []);

    const onDelete = (id) => {
        axiosClient.delete(`/v1/tenant/${id}`).then(({ data }) => {
            const newTenant = tenants.filter((tenant) => tenant.IDtenant !== id);
            setTenants(newTenant);
            showToast(data.message);
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div>
            <div className="flex items-center mb-5 justify-between">
                <h2 className='text-lg font-medium text-gray-500'>Tenant</h2>
                {currentUser.role === 'admin' && (
                    <Link to="/tenant/add" className='px-3 py-1.5 bg-green-600 text-white text-sm text-semibold'>Tambah Data</Link>
                )}
            </div>
            <table className='w-full text-left'>
                <thead>
                    <tr>
                        <th className='border border-gray-300 p-2 text-sm font-semibold text-white bg-gray-500'>No</th>
                        <th className='border border-gray-300 p-2 text-sm font-semibold text-white bg-gray-500'>Nama Tenant</th>
                        <th className='border border-gray-300 p-2 text-sm font-semibold text-white bg-gray-500'>Detail</th>
                        <th className='border border-gray-300 p-2 text-sm font-semibold text-white bg-gray-500'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tenants.length > 0 && tenants.map((tenant, index) => (
                        <TenantItemList key={index} tenant={tenant} user={user} onDelete={onDelete} index={index} />
                    ))}
                </tbody>
            </table>
            {loading && (
                <div className='text-center text-sm font-semibold'>Loading...</div>
            )}
        </div>
    )
}
