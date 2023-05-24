import React from 'react'
import StokBarangItem from '../components/StokBarangItem'
import PenjualanItem from '../components/PenjualanItem'
import { useStateContext } from '../contexts/ContextProvider'
import TenantItem from '../components/TenantItem';
import PendapatanTenantItem from '../components/PendapatanTenantItem';

export default function Dashboard() {
    const { currentUser } = useStateContext();

    return (
        <div className="grid grid-cols-2">
            <div className="w-full shadow-lg p-5 border border-gray-400 rounded col-span-2 mb-5">
                <StokBarangItem user={currentUser} />
            </div>

            <div className="w-full shadow-lg p-5 border border-gray-400 rounded col-span-2 mb-5">
                <PenjualanItem user={currentUser} />
            </div>

            <div className="w-full shadow-lg p-5 border border-gray-400 rounded col-span-2 mb-5">
                <TenantItem user={currentUser} />
            </div>

            <div className="w-full shadow-lg p-5 border border-gray-400 rounded col-span-2 mb-5">
                <PendapatanTenantItem user={currentUser} />
            </div>
        </div>
    )
}
