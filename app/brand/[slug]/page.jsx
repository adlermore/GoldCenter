'use client'

import PageLoader from '@/components/PageLoader';
import Product from '@/components/product/Product';
import { JsonContext } from '@/context/jsonContext';
import request from '@/utils/hooks/request';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'

function BrandPage({ params }) {

  const { silverMode } = useContext(JsonContext);
  const [brandData, setBrandData] = useState(null)
  const [brandProducts, setBrandProducts] = useState([])
  const [offset, setOffset] = useState(0);
  const [limit] = useState(12);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    request(`${process.env.NEXT_PUBLIC_DATA_API}/user/about_store/${params.slug}`)
      .then((data) => {
        setBrandData(data);
      })
    request(`${process.env.NEXT_PUBLIC_DATA_API}/catalog/seller/${params.slug}?limit=${limit}&offset=${offset}&metal=${silverMode ? 'silver' : 'gold'}`)
      .then((data) => {
        setBrandProducts(prevData => [...prevData, ...data.catalog]);
        setHasMore(data.catalog.length === limit);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [params.slug, silverMode, offset])


  if (!brandData || !brandProducts) {
    return <PageLoader />
  }



  const loadMoreProducts = () => {
    setOffset(prevOffset => prevOffset + limit);
  };


  return (
    <div className='brand_page pt-[160px]'>
      <div className='custom_container'>
        <div className='text-2xl'>{brandData.user_info.company_name}</div>
        <div className='relative w-full max-w-[400px] mx-auto mt-[40px] h-[300px]'>
          <Image
            src={brandData.user_info.logo}
            alt="Ricardo portrait"
            fill
            quality="100"
            priority={true}
            className="h-full w-full object-contain"
          />
        </div>
        <div className='mt-[30px] text-2xl'>{brandData.user_info.firstname}</div>
        <div className='mt-[30px] text-base leading-7 '>{brandData.user_info.description_en}</div>
        <div className='text-xl mt-[40px]'>{brandData.user_info.company_name} PRODUCTS</div>
        <div className='grid grid-cols-4 mt-[50px] gap-[15px]'>
          {brandProducts.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </div>
        {hasMore && (
          <button
            disabled={loading}
            className="loadmore_btn mt-[58px] relative h-[50px] w-full max-w-[276px] mx-auto bg-transparent border-white text-xl flex items-center justify-center border text-white cursor-pointer hover:bg-siteCrem hover:border-siteCrem duration-300"
            onClick={loadMoreProducts}
          >
            {loading && (
              <svg
                aria-hidden="true"
                role="status"
                className="absolute  inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                ></path>
              </svg>
            )}
            {!loading && "Load More"}
          </button>
        )}
        <div className='mt-[50px] pb-[120px]'>
          <div className='text-2xl'>Similar stores</div>
          <div className='mt-[30px] grid grid-cols-3 gap-[30px]'>
            {brandData.similar_stores.map((brand, index) => (
              <Link href={`/brand/${brand?.store_id}`} scroll={true} key={index} className='relative h-[200px]'>
                <Image
                  src={brand.logo}
                  alt="Ricardo portrait"
                  fill
                  quality="100"
                  priority={true}
                  className="h-full w-full object-cover"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandPage