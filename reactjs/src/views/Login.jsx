import React, { useState } from 'react'
import axiosClient from '../axios';
import { useStateContext } from '../contexts/ContextProvider';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setToken, showToast } = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.post('/v1/auth/login', {
            username,
            password,
        }).then(({ data }) => {
            setToken(data.token);
            showToast('Login success.')
        }).catch((err) => {
            showToast(err.response.data.message, 'red')
        })
    }
    return (
        <div className="h-full">
            <div className='flex flex-col items-center justify-center p-3'>
                <h2 className='text-4xl font-medium text-gray-700'>Login</h2>
                <h2 className='text-sm py-2 font-semibold text-gray-700'>With your account</h2>
            </div>
            <div className="p-2">
                <form method='post' className='grid grid-cols-3 grid-rows-3' onSubmit={onSubmit}>
                    <div className='col-span-3'>
                        <label htmlFor="username" className='text-sm font-medium text-gray-800'>Username</label>
                        <div className='mt-2'>
                            <input type="text" id='username' name='username' placeholder='Username' className='w-full ring-1 ring-gray-400 px-2 py-1.5 rounded focus:ring-indigo-500 focus:border-none' value={username} onInput={e => setUsername(e.target.value)} />
                        </div>
                    </div>

                    <div className='col-span-3'>
                        <label htmlFor="password" className='text-sm font-medium text-gray-800'>Password</label>
                        <div className='mt-2'>
                            <input type="password" id='password' name='password' placeholder='Password' className='w-full ring-1 ring-gray-400 px-2 py-1.5 rounded focus:ring-indigo-500 focus:border-none' value={password} onInput={e => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <div className="mt-2 flex items-center col-span-3">
                        <button className='px-3 py-2 bg-indigo-700 text-sm font-semibold text-white w-full rounded'>Log in</button>
                    </div>
                </form>
            </div>
        </div >
    )
}
