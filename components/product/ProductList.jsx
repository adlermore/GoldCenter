'use client'
import React, { useContext, useEffect, useState } from 'react'
import Product from './Product'
import { JsonContext } from '@/context/jsonContext';
import { useSearchParams } from 'next/navigation';
import request from '@/utils/hooks/request';

function ProductList({ filters }) {

    const { silverMode } = useContext(JsonContext);
    const [listingData, setListingData] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit] = useState(12); 
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);

    const searchParams = useSearchParams();

    let subcategory = searchParams.get('subcategory') || '';
    let filter = searchParams.get('filter') || '';
    let category = searchParams.get('type') || '';
    let origin;
    let fineness;
    let colors;

    const getOriginString = () => {
        return filters?.origin.length > 0 ? `&origin=${filters?.origin.join(',')}` : '';
    };
    
    const getFinenessString = () => {
        return filters?.fineness.length > 0 ? `&fineness=${filters?.fineness.join(',')}` : '';
    };
    
    const getColorsString = () => {
        return filters?.colors.length > 0 ? `&colors=${filters?.colors.join(',')}` : '';
    };

    useEffect(() => {
        setOffset(0);
        setListingData([]);
        if (filters.type) {
            category = filters.type
        }
        if (filters.subcategory) {
            subcategory = filters.subcategory
        }

        origin = getOriginString();
        fineness = getFinenessString();
        colors = getColorsString();

    }, [silverMode, subcategory, category, filters]);


    useEffect(() => {
        // Fetch products based on current offset and limit
        setLoading(true); // Set loading to true when fetching starts
        request(`
            ${process.env.NEXT_PUBLIC_DATA_API}/products/catalog?metal=${silverMode ? 'silver' : 'gold'}&filter=${filter || ''}&type=${category || ''}&subcategory=${subcategory || ''}${origin}${fineness}${colors}&limit=${limit}&offset=${offset}`)
            .then((data) => {
                setListingData(prevData => [...prevData, ...data.catalog]);
                setHasMore(data.catalog.length === limit);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [silverMode, searchParams, subcategory, category, offset, filters, limit]);

    const loadMoreProducts = () => {
        setOffset(prevOffset => prevOffset + limit);
    };

    return (
        <>
            <div className='grid grid-cols-4 gap-[15px] product_grid_block'>
                {listingData.length > 0 ?
                    listingData.map((product, index) => (
                        <Product key={index} product={product} />
                    ))
                    :
                    <div>No Result</div>
                }
            </div>
            {hasMore && (
                <button
                    disabled={loading}
                    className="loadmore_btn mt-[58px] relative h-[50px] w-full max-w-[276px] mx-auto bg-transparent border-white text-xl flex items-center justify-center border text-white cursor-pointer hover:bg-siteCrem borderSilver hover:border-siteCrem duration-300"
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
        </>
    )
}

export default ProductList