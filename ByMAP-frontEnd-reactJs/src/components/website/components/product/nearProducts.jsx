"use client";

import ProductListing from "./ProductListing";
import { Link } from "react-router-dom";
import { axiosClient } from "../../../../api/axios";
import { useEffect, useState } from "react";
import axios from "axios";
import { NODE_URL } from "../../../../router";
import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';


const NearProducts = (props) => {
  const { title } = props;
  const [magazin, setMagazin] = useState([]);
  const [images, setImages] = useState('');

 
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`${NODE_URL}/api/searchNearby`);
    setMagazin(response.data.places)
    console.log(response.data.places)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    // showImages(magazin[0]?.id);
  }, []);


  const showImages = async (name) => {
   
    if(name !== "" || name !== undefined || name !== null ) {
      const response = await axios.get(`${NODE_URL}/api/getphotoName/${name}`);
      const data = response.data.photos ;

       console.log(data)


    }
  


  
  }
  // const image = `https://places.googleapis.com/v1/${v.name}/media?maxHeightPx=${v.heightPx}&maxWidthPx=${v.widthPx}&key=AIzaSyDCnCdCAWm-OISbfMyniHMNIy5NBqXF_YU`


// const showImages = async (name) => {
//   try {
//     if (name !== "" && name !== undefined && name !== null) {
//       const response = await axios.get(`${NODE_URL}/api/getphotoName/${name}`);
//       const data = response.data.photos;

//       // Check if there is at least one image in the array
//       if (data.length > 0) {
//         const firstImage = data[0];
        // const image = `https://places.googleapis.com/v1/${firstImage.name}/media?maxHeightPx=${firstImage.heightPx}&maxWidthPx=${firstImage.widthPx}&key=AIzaSyDCnCdC`;
//         setImageURL(image);
//       }
//     }
//   } catch (error) {
//     console.error("Error fetching images:", error);
//   }
// };



  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h1>
          ) : null}
          {/* {subtitle ? (
            <p className='mt-2 text-sm text-muted-foreground'>
              {subtitle}
            </p>
          ) : null} */}
        </div>

        {props.href ? (
          <Link
            to={props.href}
            className='hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block'>
            Shop the collection{' '}
            <span aria-hidden='true'>&rarr;</span>
          </Link>
        ) : null}
      </div>

      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
     {
      magazin.map((magazin, index) => (
     (index < 5) &&   <article key={index} className="flex max-w-xl flex-col items-start justify-between">
        <div className="flex items-center gap-x-4 text-xs">
       
      
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <a>
              <span className="absolute inset-0" />
              {magazin.displayName.text}
            </a>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600"> {magazin.formattedAddress}</p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          <img  alt="" className="h-10 w-10 rounded-full bg-gray-50" />

          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
              <a >
                <span className="absolute inset-0" />
                {/* {post.author.name} */}
              </a>
            </p>
            <p className="text-gray-600"></p>
          </div>
        </div>
      </article>
      ))
     }




          </div>
        </div>
      </div>
    </section>

    // <div>
    // <Swiper
    //   spaceBetween={50}
    //   slidesPerView={3}
    //   onSlideChange={() => console.log('slide change')}
    //   onSwiper={(swiper) => console.log(swiper)}
    // >
    //   <SwiperSlide>Slide 1</SwiperSlide>
    //   <SwiperSlide>Slide 2</SwiperSlide>
    //   <SwiperSlide>Slide 3</SwiperSlide>
    //   <SwiperSlide>Slide 4</SwiperSlide>
    //   <SwiperSlide>Slide 3</SwiperSlide>
    //   <SwiperSlide>Slide 4</SwiperSlide>
    //   ...
    // </Swiper>
    // </div>

  );
};

export default NearProducts;
