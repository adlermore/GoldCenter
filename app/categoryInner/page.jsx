'use client'

import CategoryGrid from '@/components/CategoryGrid'
import PageLoader from '@/components/PageLoader'
import MainSlider from '@/components/slider/MainSlider'
import ProductSlider from '@/components/slider/ProductSlider'
import { JsonContext } from '@/context/jsonContext'
import { categoryGrid, categorySliderData } from '@/utils/data/homeData'
import request from '@/utils/hooks/request'
import { useContext, useEffect, useState } from 'react'

function CategoryInner({ searchParams }) {

	const { silverMode } = useContext(JsonContext);
	const category = searchParams.category;

	const [productResponse , setProductResponse] = useState(null);

	useEffect(()=>{
	  request(`${process.env.NEXT_PUBLIC_DATA_API}/products/catalog?metal=${silverMode ? 'silver' : 'gold' }&subcategory=${category}&limit=10&offset=0`)
	  .then((data) => {
		setProductResponse(data.catalog);
	  })
	  .catch(error => {
		  console.log(error);
	  })
  
	},[silverMode , category])
  
  
	if(!productResponse){
	  return <PageLoader />
	}

	return (
		<div className="category_page pt-[85px]">
			<MainSlider sliderData={categorySliderData} />
			<div className='py-[100px]  text-center laptopHorizontal:py-[60px] tablet:pt-[30px]'>
				<div className="custom_container">
					<h1 className='text-[32px] uppercase text-black laptopHorizontal:text-[24px] mobile:text-[18px]'>
						{(category === 'men' || category === 'women' || category === 'kids')
							? 'FOR ' + category
							: category
						}
					</h1>
					<div className='mt-50 max-w-[650px] text-base mx-auto'>
						The platform features a wide selection of jewelry from only registered sellers and manufacturers. Here you can find all the jewelry related services you need.
					</div>
				</div>
			</div>
			<CategoryGrid category={categoryGrid} subcategory={category} />
			<ProductSlider sliderContent={productResponse} />
		</div>
	)
}

export default CategoryInner