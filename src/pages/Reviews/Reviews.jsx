import React, { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from './ReviewCard';


const Reviews = ({reviewsPromise}) => {

    const reviews=use(reviewsPromise);
    console.log(reviews);

    return (
        <div className='m-20'>
            <div className='text-center'>
               <h3 className='text-3xl text-center font-bold'>Review</h3>
               <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae laboriosam nisi quo vel? Eum natus unde ratione quia consequuntur blanditiis vel quis odio quos, distinctio veniam, debitis cumque quaerat sapiente? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, debitis quis. Facilis impedit in porro vitae consequatur, rem quos, repellendus recusandae, asperiores earum et! Debitis dolor repellat qui laborum iure!</p>
            </div>
            <Swiper
                loop={true}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                coverflowEffect={{
                rotate: 30,
                stretch: '50%',
                depth: 200,
                modifier: 1,
                scale:0.75,
                slideShadows: true,
                }}
                autoplay={{
                delay:1000,
                disableOnInteraction:false
                }}
                pagination={true}
                modules={[Autoplay, EffectCoverflow, Pagination]}
                className="mySwiper"
            >
               {
                reviews.map(review=>
                <SwiperSlide>
                   <ReviewCard key={review.id} review={review}></ReviewCard>
                </SwiperSlide>
                 )
               }
            </Swiper>
        </div>
    );
};

export default Reviews;