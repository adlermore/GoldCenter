import PageLoader from '@/components/PageLoader';
import { JsonContext } from '@/context/jsonContext';
import request from '@/utils/hooks/request';
import React, { useContext, useEffect } from 'react'

function BrandPage({ params }) {
  
  const { silverMode } = useContext(JsonContext);


  // useEffect(()=>{
  //   request(`${process.env.NEXT_PUBLIC_DATA_API}/catalog/top/${silverMode ? 'silver' : 'gold' }`)
  //   .then((data) => {
  //     setProductResponse(data);
  //   })
  //   request(`${process.env.NEXT_PUBLIC_DATA_API}/brands`)
  //   .then((data) => {
  //     setBrandsData(data.brands);
  //   })
  //   .catch(error => {
  //       console.log(error);
  //   })

  // },[silverMode])


  // if(!productResponse || !setBrandsData){
  //   return <PageLoader />
  // }



  console.log(params.slug);

  
  return (
    <div>BrandPage</div>
  )
}

export default BrandPage