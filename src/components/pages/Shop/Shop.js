import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';

const Shop = () => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [bannerImage, setBannerImage] = useState('');
    const [update, setUpdate] = useState('')
    const [action, setAction] = useState('')



    // create action

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const createShop = async (data) => {
        const { name, address, profileImage, bannerImage } = data;
        // console.log(name, address, profileImage[0], bannerImage[0])
        const formData = new FormData();
        formData.append("name", name);
        formData.append("address", address);
        formData.append("profile_image", profileImage[0]);
        formData.append("banner_image", bannerImage[0]);


        await fetch("https://wehatbazar.thecell.tech/api/merchant/shop", {
            method: "POST",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        }).then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    toast.success("Successfully create a shop");
                    setAction(data)
                } else {
                    toast.error(data.message)
                    reset()
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    // update shop


    const updateShop = async () => {

        // console.log(name, address, profileImage, bannerImage)
        const formData = new FormData();
        formData.append("name", name);
        formData.append("address", address);
        formData.append("profile_image", profileImage[0]);
        formData.append("banner_image", bannerImage[0]);


        await fetch("https://wehatbazar.thecell.tech/api/merchant/shop-update", {
            method: "POST",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: formData,
        }).then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    toast.success("Successfully Updated")
                    setUpdate(data)
                } else {
                    toast.error("Something wrong")
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    // Shop list & Shop Details fetch call

    const [list, setList] = useState()
    const [details, setDetails] = useState({})

    // shop list api call and get id

    useEffect(() => {
        fetch('https://wehatbazar.thecell.tech/api/merchant/shop', {
            method: "GET",
            headers: {
                'content-type': "application/json",
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
            .then(data => {
                setList(data)
            })
    }, [action, update])

    // console.log(list)

    const id = list?.data[0]?.id

    useEffect(() => {
        fetch(`https://wehatbazar.thecell.tech/api/merchant/shop/${id}`, {
            method: "GET",
            headers: {
                'content-type': "application/json",
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
            .then(data => {
                setDetails(data)
            })
    }, [action, update, id])
    // console.log(details?.data?.profile?.original_url)
    // console.log(details?.data?.banner[0]?.original_url)
    // console.log(details?.data)



    // shop details api call and get id

    return (
        <div className='ml-[90px] pr-5'>
            <div className="container ">
                <div className='grid lg:grid-cols-2 w-full sm:grid-cols-3 gap-5'>
                {/*Crate shop Form start */}

                <div className="card lg:w-full sm:w-96 bg-base-100 shadow-2xl">
                    <div className="card-body">
                        <h2 className="text-center">Add Shop</h2>

                        {/* add categories form */}

                        <form onSubmit={handleSubmit(createShop)} className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 text-left">Shop Name</label>
                                <input type="text" className="bg-gray-50 border border-gray-300 text-[#0A0A0A] text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5" placeholder="shop name"
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: "Please give your shop name"
                                        },
                                    })}
                                />

                                <p className='text-left text-xs text-red-500'>{errors.name?.message}</p>
                            </div>
                            <div>
                                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 text-left">Shop Address</label>

                                <textarea type='text' placeholder="address here..." className="bg-gray-50 border border-gray-300 text-[#0A0A0A] text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5" required=""
                                    {...register("address", {
                                        required: {
                                            value: true,
                                            message: "shop name must be required"
                                        },
                                        minLength: {
                                            value: 4,
                                            message: "Must be exceed 4 characters"
                                        }
                                    })}
                                />
                                <p className='text-left text-xs text-red-500'>{errors.address?.message}</p>
                            </div>
                            <div>
                                <label htmlFor="Profile" className="block mb-2 text-sm font-medium text-gray-900 text-left">Profile Image</label>

                                <input type='file' className="file-input file-input-bordered rounded-lg file-input-sm w-full " required=""
                                    {...register("profileImage", {
                                        required: {
                                            value: true,
                                            message: "profile must be required"
                                        },
                                    })}
                                />
                                <p className='text-left text-xs text-red-500'>{errors.profileImage?.message}</p>
                            </div>
                            <div>
                                <label htmlFor="banner image" className="block mb-2 text-sm font-medium text-gray-900 text-left">Banner Image</label>

                                <input type='file' className="file-input file-input-bordered rounded-lg file-input-sm w-full " required=""
                                    {...register("bannerImage", {
                                        required: {
                                            value: true,
                                            message: "banner image must be required"
                                        },
                                    })}
                                />
                                <p className='text-left text-xs text-red-500'>{errors.bannerImage?.message}</p>
                            </div>

                            <div className="card-actions justify-center">
                                <button type="submit" className="btn w-full btn-primary">Create Shop</button>
                            </div>

                        </form>
                    </div>
                </div>


                {/* form ee */}
                <div className="card lg:w-full sm:w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title ">Shop List</h2>
                        <span className='text-left pl-3 font-semibold'>Shop Id: {list?.data[0]?.id}</span>
                        <span className='text-left pl-3 font-semibold'>Shop Name: {list?.data[0]?.name}</span>
                        <span className='text-left pl-3 font-semibold'>Shop Address: {list?.data[0]?.address} </span>
                        <div className="card-actions justify-end">

                        </div>
                    </div>
                </div>

                {/* merchant shop details */}


                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure className='relative'><img src={details?.data?.banner[0]?.original_url} alt="banner" />
                        
                    </figure>
                    <div className="avatar absolute bottom-36">
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={details?.data?.profile?.original_url} alt=""/>
                            </div>
                        </div>
                    <div className="card-body">
                    <span className="card-title justify-between">
                        <span>{details?.data?.name}</span>
                        <span  className='text-sm font-light'>Shop Id: {details?.data?.id}</span>
                    </span>
                        <p>Address: {details?.data?.address}</p>
                        <div className="card-actions justify-end">
                        <label htmlFor="edit-shop-details" className="btn btn-sm">Edit</label>
                        </div>
                    </div>
                </div>


                {/* mainDetails end */}



                {/* <div className="card lg:w-full sm:w-96 bg-base-100 shadow-xl">
                     <div className="card-body">
                        <h2 className="card-title ">Shop Details</h2>
                        <span className='text-left pl-3 font-semibold'>Shop Name: {details?.data?.name}</span>
                        <span className='text-left pl-3 font-semibold'>Shop Address: {details?.data?.address}</span>
                        <span className='text-left pl-3 font-semibold'>Shop Id: {details?.data?.id}</span>
                        <img src={details?.data?.banner[0]?.original_url} alt=" photos" />

                        <div className="card-actions justify-end">

                        </div>
                        <label htmlFor="edit-shop-details" className="btn">Edit</label>
                        
                    </div> 
                </div> */}

                {/* Modal section */}

                <input type="checkbox" id="edit-shop-details" className="modal-toggle" />
                <div className="modal mx-auto">
                    <div className="modal-box w-11/12 max-w-5xl">



                        {/* add categories form */}

                        <form onSubmit={e => e.preventDefault()} className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 text-left">Shop Name:</label>
                                <input type="text" onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-[#0A0A0A] text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5" placeholder={details?.data?.name} />
                            </div>
                            <div>
                                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 text-left">Shop Address</label>

                                <textarea type='text' onChange={(e) => setAddress(e.target.value)} placeholder={details?.data?.address} className="bg-gray-50 border border-gray-300 text-[#0A0A0A] text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5" required="" />

                            </div>
                            <div>
                                <label htmlFor="Profile" className="block mb-2 text-sm font-medium text-gray-900 text-left">Profile Image</label>

                                <input type='file' onChange={(e) => setProfileImage(e.target.files)} className="file-input file-input-bordered rounded-lg file-input-sm w-full " required="" />
                            </div>
                            <div>
                                <label htmlFor="banner image" className="block mb-2 text-sm font-medium text-gray-900 text-left">Banner Image</label>

                                <input type='file' onChange={(e) => setBannerImage(e.target.files)} className="file-input file-input-bordered rounded-lg file-input-sm w-full " required="" />
                            </div>

                            <div className="card-actions justify-center">
                                <button onClick={updateShop} className="btn w-full btn-primary">update</button>
                            </div>

                        </form>
                        <div className="modal-action">
                            <label htmlFor="edit-shop-details" className="btn">close</label>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Shop;