import React, { useEffect, useState } from 'react'
import TambahDataComponent from '../components/TambahDataComponent'
import axiosClient from '../axios';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate, useParams } from 'react-router-dom';

export default function StokView() {
    const [nama, setNama] = useState('');
    const [hargabeli, setHargabeli] = useState('');
    const [hargajual, setHargajual] = useState('');
    const [stok, setStok] = useState('');
    const [kategori, setKategori] = useState('');
    const { showToast } = useStateContext();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axiosClient.get(`/v1/stok/${id}`)
                .then(({ data }) => {
                    setNama(data.nama);
                    setHargabeli(data.hargabeli);
                    setHargajual(data.hargajual);
                    setStok(data.stok);
                    setKategori(data.kategori);
                }).catch((err) => {
                    console.log(err);
                })
        }
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        if (id) {
            axiosClient.post(`/v1/stok/${id}`, {
                nama,
                hargabeli,
                hargajual,
                stok,
                kategori,
            }).then(({ data }) => {
                showToast(data.message);
                navigate('/');
            }).catch((err) => {
                showToast(err.response.data.message, 'red');
            })
        } else {
            axiosClient.post('/v1/stok', {
                nama,
                hargabeli,
                hargajual,
                stok,
                kategori
            }).then(({ data }) => {
                showToast(data.message)
                navigate('/')
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    return (
        <TambahDataComponent title={id ? "Update Data Stok" : "Tambah Data Stok"}>
            <form method='post' onSubmit={onSubmit}>
                <div className='w-full grid grid-cols-2 gap-5'>
                    <div className="col-span-2">
                        <label htmlFor="nama">Nama Stok</label>
                        <div className='mt-2'>
                            <input type="text" name='nama' id='nama' placeholder='Nama Stok' className='w-full ring-1 px-2 py-1.5 rounded' value={nama} onInput={e => setNama(e.target.value)} />
                        </div>
                    </div>

                    <div className="col-span-1">
                        <label htmlFor="hargabeli">Harga Beli</label>
                        <div className='mt-2'>
                            <input type="number" name='hargabeli' id='hargabeli' className='w-full ring-1 px-2 py-1.5 rounded' value={hargabeli} onInput={e => setHargabeli(e.target.value)} />
                        </div>
                    </div>

                    <div className="col-span-1">
                        <label htmlFor="hargajual">Harga Jual</label>
                        <div className='mt-2'>
                            <input type="number" name='hargajual' id='hargajual' className='w-full ring-1 px-2 py-1.5 rounded' value={hargajual} onInput={e => setHargajual(e.target.value)} />
                        </div>
                    </div>

                    <div className="col-span-1">
                        <label htmlFor="stok">Stok</label>
                        <div className='mt-2'>
                            <input type="number" name='stok' id='stok' className='w-full ring-1 px-2 py-1.5 rounded' value={stok} onInput={e => setStok(e.target.value)} />
                        </div>
                    </div>

                    <div className="col-span-1">
                        <label htmlFor="kategori">Kategori</label>
                        <div className='mt-2'>
                            <input type="text" name='kategori' id='kategori' className='w-full ring-1 px-2 py-1.5 rounded' value={kategori} onInput={e => setKategori(e.target.value)} />
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
