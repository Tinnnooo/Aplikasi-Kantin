import React from 'react'

export default function Home() {
    return (
        <main className='max-w-4xl mx-auto'>
            <div className='grid grid-cols-2 p-5 gap-5'>
                <div className='col-span-1 flex items-center justify-center fade-in-down ' style={{ animationDelay: "0.2s" }}>
                    <img src="../assets/sate.jpg" className='rounded' />
                </div>

                <div className='col-span-1 flex flex-wrap fade-in-down' style={{ animationDelay: "0.4s" }}>
                    <div className='flex'>
                        <p className='text-sm font-medium text-gray-500'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, adipisci architecto expedita aperiam culpa autem nihil porro molestiae id veniam nulla exercitationem iusto cumque beatae? Fugiat harum quibusdam rem temporibus.
                        </p>
                    </div>
                </div>

                <div className='col-span-1 flex items-center justify-center fade-in-down' style={{ animationDelay: "0.4s" }}>
                    <img src="../assets/mi-goreng.jpg" className='rounded' />
                </div>

                <div className='col-span-1 flex flex-wrap fade-in-down ' style={{ animationDelay: "0.6s" }}>
                    <div className='flex'>
                        <p className='text-sm font-medium text-gray-500 text-left'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, adipisci architecto expedita aperiam culpa autem nihil porro molestiae id veniam nulla exercitationem iusto cumque beatae? Fugiat harum quibusdam rem temporibus.
                        </p>
                    </div>
                </div>

                <div className='col-span-2 flex items-center justify-center fade-in-down' style={{ animationDelay: "0.7s" }}>
                    <img src="../assets/sate.jpg" className='rounded' />
                </div>

                <div className='col-span-1 flex flex-wrap fade-in-down' style={{ animationDelay: "0.8s" }}>
                    <div className='flex'>
                        <p className='text-sm font-medium text-gray-500 text-right'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, adipisci architecto expedita aperiam culpa autem nihil porro molestiae id veniam nulla exercitationem iusto cumque beatae? Fugiat harum quibusdam rem temporibus.
                        </p>
                    </div>
                </div>
                <div className='col-span-1 flex items-center justify-center fade-in-down ' style={{ animationDelay: "0.10s" }}>
                    <img src="../assets/udang-goreng.jpg" className='rounded' />
                </div>


            </div>
        </main>
    )
}
