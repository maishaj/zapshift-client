import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Payments = () => {

    const {parcelId}=useParams();
    const axiosSecure=useAxiosSecure();

    //fetching data by parcelId
    const {isLoading, data:parcel}=useQuery({
        queryKey:['parcels',parcelId],
        queryFn: async()=>{
           const res=await axiosSecure.get(`/parcels/${parcelId}`);
           return res.data;
        }
    })

    if(isLoading)
    {
        return <div>
          <span className="loading loading-bars loading-xl"></span>
        </div>
    }

    return (
        <div>
            <h2>Parcel: {parcel.parcelName}</h2>
        </div>
    );
};

export default Payments;