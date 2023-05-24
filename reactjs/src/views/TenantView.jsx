import React, { useEffect, useState } from 'react'
import TambahDataComponent from '../components/TambahDataComponent'
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

export default function TenantView() {
    const { showToast, currentUser } = useStateContext();
    const [namatenant, setNamatenant] = useState('');
    const [detail, setDetail] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    if (currentUser.role && currentUser.role !== "admin") {
        return <Navigate to='/' />
    }

    useEffect(() => {
        if (id) {
            axiosClient.get(`/v1/tenant/${id}`).then(({ data }) => {
                setNamatenant(data.namatenant);
                setDetail(data.detail);
            }).catch((err) => {
                console.log(err);
            })
        }
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        if (id) {
            axiosClient.post(`/v1/tenant/${id}`, {
                namatenant,
                detail,
            }).then(({ data }) => {
                showToast(data.message);
                navigate('/');
            }).catch((err) => {
                showToast(err.response.data.message);
            })
        } else {
            axiosClient.post('/v1/tenant', {
                namatenant,
                detail,
            }).then(({ data }) => {
                showToast(data.message);
                navigate('/');
            }).catch((err) => {
                showToast(err.response.data.mesasge, 'red');
            })
        }

    }
    return (
        <TambahDataComponent title={id ? "Update Data Tenant" : "Tambah Data Tenant"}>
            <form method='post' onSubmit={onSubmit}>
                <div className='w-full grid grid-cols-2 gap-5'>
                    <div className="col-span-2">
                        <label htmlFor="namatenant">Nama Tenant</label>
                        <div className='mt-2'>
                            <input type="text" name='namatenant' id='namatenant' placeholder='Nama Tenant' className='w-full ring-1 px-2 py-1.5 rounded' value={namatenant} onInput={e => setNamatenant(e.target.value)} />
                        </div>
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="detail">Detail</label>
                        <div className='mt-2'>
                            <input type="text" name='detail' id='detail' className='w-full ring-1 px-2 py-1.5 rounded' placeholder='Detail' value={detail} onInput={e => setDetail(e.target.value)} />
                        </div>
                    </div>

                    <div className="col-span-2 flex items-center justify-end">
                        <button className='px-3 py-1.5 text-sm font-semibold text-white bg-emerald-500'>{id ? "Update Data" : "Tambah Data"}</button>
                    </div>
                </div>
            </form>
        </TambahDataComponent>
    )
}
