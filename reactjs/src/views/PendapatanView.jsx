import React, { useEffect, useState } from 'react'
import TambahDataComponent from '../components/TambahDataComponent'
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function PendapatanView() {
    const { tenants, setTenants, showToast } = useStateContext();
    const [IDtenant, setIDtenant] = useState('');
    const [tanggal, setTanggal] = useState('');
    const [totalPendapatan, setTotalPendapatan] = useState('');
    const [setoranTenant, setSetoranTenant] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axiosClient.get(`/v1/pendapatantenant/${id}`).then(({ data }) => {
                setIDtenant(data.tenant.IDtenant);
                setTanggal(data.tanggal);
                setTotalPendapatan(data.totalPendapatan);
                setSetoranTenant(data.setoranTenant);
            }).catch((err) => {
                console.log(err);
            });
        }

        axiosClient.get('/v1/tenant').then(({ data }) => {
            setTenants(data);
        }).catch((err) => {
            showToast(err.response.data.message, 'red');
        })
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        if (id) {
            axiosClient.post(`/v1/pendapatantenant/${id}`, {
                tanggal,
                IDtenant,
                totalPendapatan,
                setoranTenant,
            }).then(({ data }) => {
                showToast(data.message);
                navigate('/');
            }).catch((err) => {
                showToast(err.response.data.message);
            })
        } else {
            axiosClient.post('/v1/pendapatantenant', {
                tanggal,
                IDtenant,
                totalPendapatan,
                setoranTenant,
            }).then(({ data }) => {
                axiosClient.get(`/v1/pendapatantenant/kwitansi/${data.id}`).then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                })
                showToast(data.message);
                navigate('/');
            }).catch((err) => {
                showToast(err.response.data.message, 'red');
            });
        }
    }

    return (
        <TambahDataComponent title={id ? "Update Data Pendapatan Tenant" : "Tambah Data Pendapatan Tenant"}>
            <form method='post' onSubmit={onSubmit}>
                <div className='w-full grid grid-cols-2 gap-5'>
                    <div className="col-span-1">
                        <label htmlFor="IDtenant">Nama Tenant</label>
                        <div className='mt-2'>
                            <select name="IDtenant" id="IDtenant" className='px-2 py-1.5 ring-1 rounded w-full' value={IDtenant} onChange={e => setIDtenant(e.target.value)}>
                                <option value="">Select Tenant</option>
                                {tenants.length > 0 && tenants.map((tenant, index) => (
                                    <option key={index} value={tenant.IDtenant}>{tenant.namatenant}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <label htmlFor="tanggal">Tanggal</label>
                        <div className='mt-2'>
                            <input type="date" name='tanggal' id='tanggal' className='w-full ring-1 px-2 py-1.5 rounded' value={tanggal} onChange={e => setTanggal(e.target.value)} />
                        </div>
                    </div>

                    <div className="col-span-1">
                        <label htmlFor="totalPendapatan">Total Pendapatan</label>
                        <div className='mt-2'>
                            <input type="number" name='totalPendapatan' id='totalPendapatan' className='w-full ring-1 px-2 py-1.5 rounded' value={totalPendapatan} onInput={e => {
                                setTotalPendapatan(e.target.value);
                                const setoran = (e.target.value / 15);
                                setSetoranTenant(setoran)
                            }} placeholder='150000' />
                        </div>
                    </div>

                    <div className="col-span-1">
                        <label htmlFor="setoranTenant">Setoran Tenant</label>
                        <div className='mt-2'>
                            <input type="number" name='setoranTenant' id='setoranTenant' className='w-full ring-1 px-2 py-1.5 rounded' value={setoranTenant} onInput={e => setSetoranTenant(e.target.value)} placeholder='150000' />
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
