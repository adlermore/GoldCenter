'use client'
import React, { useContext, useEffect, useState } from 'react'
import Product from './Product'
import { JsonContext } from '@/context/jsonContext';
import { useSearchParams } from 'next/navigation';
import request from '@/utils/hooks/request';

function ProductList() {


    const { silverMode } = useContext(JsonContext);
    const [listingData, setListingData] = useState(null);

    const searchParams = useSearchParams()

    const subcategory = searchParams.get('subcategory')
    const category = searchParams.get('category')

    useEffect(() => {
        request(`${process.env.NEXT_PUBLIC_DATA_API}/products/catalog?metal=${silverMode ? 'silver' : 'gold'}&type=${category}&subcategory=${subcategory}&limit=10&offset=0`)
            .then((data) => {
                setListingData(data.catalog);
            })
            .catch(error => {
                console.log(error);
            })

    }, [silverMode, subcategory, category])


    return (
        <>
            {listingData && listingData.map((product, index) => (
                <Product key={index} product={product} />
            ))}
        </>
    )
}

export default ProductList