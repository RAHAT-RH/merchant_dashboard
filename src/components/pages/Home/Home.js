import React, { useEffect, useState } from 'react';

const Home = () => {

    // profile details api fetch

    const [profile, setProfile] = useState('');

    useEffect(() => {
        fetch('https://wehatbazar.thecell.tech/api/merchant-details', {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
            .then(data => setProfile(data))
    }, [])
    

    return (
        <div className='home_section sm:ml-[100px]'>
            <div className="container" style={{ maxWidth: "1100px" }}>
                <h1 className='text-3xl text-center p-3 text-black'>Welcome to Dashboard</h1>
                <div className="grid lg:grid-cols-2 w-full sm:grid-cols-3 gap-5 ">

                    <div className="card lg:w-full sm:w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title ">Merchant Details</h2>
                            <span className='text-left pl-3 font-lg font-normal text-lg'>Merchant Name: <span className="font-[500] text-sm">{profile?.data?.name}</span></span>
                            <span className='text-left pl-3 font-lg font-normal text-lg'>Merchant Phone: <span className="font-[500] text-sm">{profile?.data?.phone}</span></span>
                            <span className='text-left pl-3 font-semibold text-lg'>Status: <span className="badge">{profile?.data?.status}</span>  </span>
                        </div>
                    </div>

                    <div className="card lg:w-full sm:w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title ">Merchant Details</h2>
                            <span className='text-left pl-3 font-lg font-normal text-lg'>Merchant Name: <span className="font-[500] text-sm">{profile?.data?.name}</span></span>
                            <span className='text-left pl-3 font-lg font-normal text-lg'>Merchant Phone: <span className="font-[500] text-sm">{profile?.data?.phone}</span></span>
                            <span className='text-left pl-3 font-semibold text-lg'>Status: <span className="badge">{profile?.data?.status}</span>  </span>
                        </div>
                    </div>
                </div>




            </div>
        </div>
    );
};

export default Home;