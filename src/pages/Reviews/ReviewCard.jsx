import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({review}) => {

    const {username,review:testimonial, user_photoURL}=review;

    return (
        <div className='m-10 p-3'>
            <div className="max-w-xl rounded-3xl bg-white p-8 relative">
            
                {/* Quote icon */}
                <FaQuoteLeft className="text-4xl text-gray-400 mb-4" />

                {/* Testimonial text */}
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {testimonial}
                </p>

                {/* Dashed divider */}
                <div className="border-t border-dashed border-gray-400 mb-6"></div>

                {/* Author section */}
                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-teal-900">
                        <img src={user_photoURL}
                        alt={username}
                        className="w-12 h-12 rounded-full object-cover" />
                    </div>

                    {/* Name & role */}
                    <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                        {username}
                    </h4>
                    <p className="text-sm text-gray-600">
                        Senior Product Designer
                    </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;