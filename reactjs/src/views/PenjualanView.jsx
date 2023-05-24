import React, { useEffect, useState } from 'react'
import TambahDataComponent from '../components/TambahDataComponent'
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function PenjualanView() {
    const { stoks, setStoks, showToast } = useStateContext();
    const [IDproduk, setIDproduk] = useState('');
    const [tanggal, setTanggal] = useState('');
    const [qty, setQty] = useState('');
    const [hargajual, setHargajual] = useState('');
    const [total, setTotal] = useState('');
    const [dibayar, setDibayar] = useState('');
    const [kembali, setKembali] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        if (id) {
            axiosClient.get(`/v1/penjualan/${id}`).then(({ data }) => {
                setIDproduk(data.produk.IDproduk);
                setTanggal(data.tanggal);
                setQty(data.qty);
                setHargajual(data.hargajual);
                setTotal(data.total);
                setDibayar(data.dibayar);
                setKembali(data.kembali);
            }).catch((err) => {
                console.log(err);
            })
        }

        axiosClient.get('/v1/stok').then(({ data }) => {
            setStoks(data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        if (id) {
            axiosClient.post(`/v1/penjualan/${id}`, {
                IDproduk,
                tanggal,
                qty,
                hargajual,
                total,
                dibayar,
                kembali
            }).then(({ data }) => {
                showToast(data.message);
                navigate('/');
            }).catch((err) => {
                showToast(err.response.data.message, 'red');
            })
        } else {
            axiosClient.post('/v1/penjualan', {
                IDproduk,
                tanggal,
                qty,
                hargajual,
                total,
                dibayar,
                kembali
            }).then(({ data }) => {
                showToast(data.message);
                axiosClient.get(`/v1/penjualan/struk/${data.id}`);
                navigate('/');
            }).catch((err) => {
                console.log(err);
                showToast(err.response.data.message, 'red');
            })
        }

    }
    return (
        <TambahDataComponent title={id ? "Update Data Penjualan" : "Tambah Data Penjualan"}>
            <form method='post' onSubmit={onSubmit}>
                <div className='w-full grid grid-cols-2 gap-5'>
                    <div className="col-span-2">
                        <label htmlFor="IDproduk" className='text-md font-semibold'>Nama Produk</label>
                        <div className='mt-2'>
                            <select name="IDproduk" id="IDproduk" className='w-full ring-1 px-2 py-1.5 text-sm rounded' value={IDproduk} onChange={e => setIDproduk(e.target.value)} required>
                                <option value="">Select Menu</option>
                                {stoks.length > 0 && stoks.map((stok, index) => (
                                    <option key={index} value={stok.IDproduk}>{stok.nama}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <label htmlFor="tanggal" className='text-md font-semibold'>Tanggal</label>
                        <div className='mt-2'>
                            <input type="date" name='tanggal' id='tanggal' className='w-full ring-1 px-2 py-1.5 rounded' value={tanggal} onChange={e => setTanggal(e.target.value)} required />
                        </div>
                    </div>

                    <div className="col-span-1">
                        <label htmlFor="qty" className='text-md font-semibold'>Qty</label>
                        <div className='mt-2'>
                            <input type="number" name='qty' id='qty' className='w-full ring-1 px-2 py-1.5 rounded' value={qty} onInput={e => {
                                setQty(e.target.value);
                                setTotal(e.target.value * hargajual);
                            }} required />
                        </div>
                    </div>

                    <div className="col-span-1">
                        <label htmlFor="hargajual" className='text-md font-semibold'>Harga Jual</label>
                        <div className='mt-2'>
                            <input type="number" name='hargajual' id='hargajual' className='w-full ring-1 px-2 py-1.5 rounded' value={hargajual} onInput={e => {
                                setHargajual(e.target.value);
                                setTotal(qty * e.target.value);
                            }} required />
                        </div>
                    </div>

                    <div className="col-span-1">
                        <label htmlFor="total" className='text-md font-semibold'>Total</label>
                        <div className='mt-2'>
                            <input type="number" name='total' id='total' className='w-full ring-1 px-2 py-1.5 rounded' value={total} onInput={e => setTotal(e.target.value)} required />
                        </div>
                    </div>

                    <div className="col-span-1">
                        <label htmlFor="dibayar" className='text-md font-semibold'>Dibayar</label>
                        <div className='mt-2'>
                            <input type="number" name='dibayar' id='dibayar' className='w-full ring-1 px-2 py-1.5 rounded' value={dibayar} onInput={e => {
                                setDibayar(e.target.value);
                                setKembali(e.target.value - total);
                            }} required />
                        </div>
                    </div>

                    <div className="col-span-1">
                        <label htmlFor="kembali" className='text-md font-semibold'>Kembali</label>
                        <div className='mt-2'>
                            <input type="number" name='kembali' id='kembali' className='w-full ring-1 px-2 py-1.5 rounded' value={kembali} onInput={e => setKembali(e.target.value)} required />
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
