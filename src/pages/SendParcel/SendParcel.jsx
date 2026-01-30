import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth'

const SendParcel = () => {

    const {register,
           handleSubmit,
           control,
           //watch,
           //formState:{errors}
           }=useForm();

    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();

    const serviceCenters=useLoaderData();
    const regionsDuplicate=serviceCenters.map(c=>c.region);
    const regions=[...new Set(regionsDuplicate)];

    // const senderRegion=watch('senderRegion');
    const senderRegion=useWatch({control,name:'senderRegion'});
    const receiverRegion=useWatch({control,name:'receiverRegion'});

    const districtsByRegion=(region)=>{
        const regionDistricts=serviceCenters.filter(c=>c.region===region);
        const districts=regionDistricts.map(d=>d.district);
        return districts;
    }

    const handleSendParcel=(data)=>{

        const isDocument=data.parcelType==='document';
        console.log(isDocument);
        const isSameDistrict=data.senderDistrict===data.receiverDistrict;
        const parcelWeight=parseFloat(data.parcelWeight);

        let cost=0;
        if(isDocument)
        {
            cost = isSameDistrict? 60 : 80;
        }
        else
        {
            if(parcelWeight<3)
            {
                cost = isSameDistrict? 110 : 150;
            }
            else
            {
                const minCharge = isSameDistrict? 110 : 150;
                const extraWeight=parcelWeight-3;
                const extraCharge= isSameDistrict? extraWeight*40 : extraWeight*40+40;

                cost=minCharge+extraCharge;
            }
        }

        data.cost=cost;

        Swal.fire({
        title: "Agree with the cost?",
        text: `You have to pay TK ${cost}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
        }).then((result) => {
        if (result.isConfirmed) {
           
            //save the parcel info to database
            axiosSecure.post('/parcels',data)
            .then((res)=>{})

            
            
            // Swal.fire({
            // title: "Deleted!",
            // text: "Your file has been deleted.",
            // icon: "success"
            // });
        }
        });
    }

    return (
        <div className='w-11/12 mx-auto'>
            <h2 className='text-4xl font-bold'>Send a Parcel</h2>
            <form onSubmit={handleSubmit(handleSendParcel)} className='mt-12 p-4 text-black'>
                {/* parcel type */}
                <div>
                    <label className='label mr-4'>
                        <input type="radio" {...register('parcelType')} value="document" className="radio" defaultChecked />
                        Document
                    </label>
                    <label className='label'>
                        <input type="radio" {...register('parcelType')} value="non-document" className="radio"/>
                        Non-Document
                    </label>
                </div>
                {/* parcel info */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" {...register('parcelName')} className="input w-full" placeholder="parcel name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight (kg)</label>
                        <input type="number" {...register('parcelWeight')} className="input w-full" placeholder="parcel weight" />
                    </fieldset>
                </div>
                {/* two column */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'>
                    
                    <div>
                    <h4 className="text-2xl font-semibold">Sender Details</h4>
                    {/* sender name */}
                    <fieldset className="fieldset">
                        <label className="label mt-4">Sender Name</label>
                        <input type="text" {...register('senderName')} className="input w-full" placeholder="sender name" defaultValue={user?.displayName} />
                    </fieldset>

                    {/* sender email */}
                    <fieldset className="fieldset">
                        <label className="label mt-4">Sender Email</label>
                        <input type="text" {...register('senderEmail')} className="input w-full" placeholder="sender email" defaultValue={user?.email} />
                    </fieldset>

                    {/* sender region */}
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">Sender region</legend>
                    <select {...register('senderRegion')} defaultValue="Pick a region" className="select">
                    <option disabled={true}>Pick a region</option>
                        {
                            regions.map((r,i)=><option key={i}>{r}</option>)
                        }
                    </select>
                    </fieldset>

                    {/* sender district */}
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">Sender Districts</legend>
                    <select {...register('senderDistrict')} defaultValue="Pick a district" className="select">
                    <option disabled={true}>Pick a district</option>
                        {
                            districtsByRegion(senderRegion).map((r,i)=><option key={i} value={r}>{r}</option>)
                        }
                    </select>
                    </fieldset>


                    {/* sender address */}
                    <fieldset className="fieldset">
                        <label className="label mt-4">Sender Address</label>
                        <input type="text" {...register('senderAddress')} className="input w-full" placeholder="sender address" />
                    </fieldset>
                    </div>


                    {/* receiver info */}

                    <div>
                    <h4 className="text-2xl font-semibold">Receiver Details</h4>
                    {/* receiver name */}
                    <fieldset className="fieldset">
                        <label className="label mt-4">Receiver Name</label>
                        <input type="text" {...register('receiverName')} className="input w-full" placeholder="receiver name" />
                    </fieldset>

                    {/* receiver email */}
                    <fieldset className="fieldset">
                        <label className="label mt-4">Receiver Email</label>
                        <input type="text" {...register('receiverEmail')} className="input w-full" placeholder="receiver email" />
                    </fieldset>

                    {/* receiver region */}
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">Receiver region</legend>
                    <select {...register('receiverRegion')} defaultValue="Pick a region" className="select">
                    <option disabled={true}>Pick a region</option>
                        {
                            regions.map((r,i)=><option key={i}>{r}</option>)
                        }
                    </select>
                    </fieldset>

                    {/* receiver district */}
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">Receiver Districts</legend>
                    <select {...register('receiverDistrict')} defaultValue="Pick a district" className="select">
                    <option disabled={true}>Pick a district</option>
                        {
                            districtsByRegion(receiverRegion).map((r,i)=><option key={i} value={r}>{r}</option>)
                        }
                    </select>
                    </fieldset>

                    {/* receiver address */}
                    <fieldset className="fieldset">
                        <label className="label mt-4">Receiver Address</label>
                        <input type="text" {...register('receiverAddress')} className="input w-full" placeholder="receiver address" />
                    </fieldset>
                    </div>

                </div>
                <input type="submit" className='btn btn-primary text-black mt-8' value="Send Parcel" />
            </form>
        </div>
    );
};

export default SendParcel;