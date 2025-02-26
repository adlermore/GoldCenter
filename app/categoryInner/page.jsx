'use client'

import PageLoader from '@/components/PageLoader'
import MainSlider from '@/components/slider/MainSlider'
import ProductSlider from '@/components/slider/ProductSlider'
import SubCategoryGrid from '@/components/SubCategoryGrid'
import { JsonContext } from '@/context/jsonContext'
import { categoryAccessData, categoryBullionData, categoryInnerData, 
	categoryKidData, categoryMenData, categoryWomenData } 
from '@/utils/data/homeData'
import request from '@/utils/hooks/request'
import { useContext, useEffect, useState } from 'react'

const categoryDataMap = {
	men: {
		sliderData: categoryMenData,
		h1Title: 'FOR MEN',
		gridData: categoryInnerData.men,
		sliderType: 'ring'
	},
	women: {
		sliderData: categoryWomenData,
		h1Title: 'FOR WOMEN',
		gridData: categoryInnerData.women,
		sliderType: 'ring'
	},
	kids: {
		sliderData: categoryKidData,
		h1Title: 'FOR KIDS',
		gridData: categoryInnerData.kids,
		sliderType: ''
	},

	accessories: {
		sliderData: categoryAccessData,
		h1Title: 'Accessories',
		gridData: categoryInnerData.accessories,
		sliderType: ''
	},

	souvenir: {
		sliderData: categoryBullionData,
		h1Title: 'Bullions',
		gridData: categoryInnerData.souvenir,
		sliderType: ''
	}
};

function CategoryInner({ searchParams }) {

	const { silverMode } = useContext(JsonContext);
	const category = searchParams.category;

	const currentCategoryData = categoryDataMap[category] || categoryDataMap.men;

	const [productResponse , setProductResponse] = useState(null);

	useEffect(()=>{
	  request(`${process.env.NEXT_PUBLIC_DATA_API}/products/catalog?metal=${silverMode ? 'silver' : 'gold' }&subcategory=${category}&type=${currentCategoryData.sliderType}&limit=10&offset=0`)
	  .then((data) => {
		setProductResponse(data.catalog);
	  })
  
	},[silverMode , category])
  
	if(!productResponse){
	  return <PageLoader />
	}

	return (
		<div className="category_page pt-[85px]">
		<MainSlider sliderData={currentCategoryData.sliderData} />
			<div className='py-[100px]  text-center laptopHorizontal:py-[60px] tablet:py-[30px] tablet:pt-[30px]'>
				<div className="custom_container">
					<h1 className='text-[32px] section_title uppercase text-black laptopHorizontal:text-[24px] mobile:text-[18px]'>
					{currentCategoryData.h1Title}
					</h1>
					<div className='mt-50 tablet:mt-[30px] max-w-[650px] text-base mx-auto'>
						The platform features a wide selection of jewelry from only registered sellers and manufacturers. Here you can find all the jewelry related services you need.
					</div>
				</div>
			</div>
			<SubCategoryGrid category={currentCategoryData.gridData} subcategory={category} />
			<ProductSlider sliderContent={productResponse} />
		</div>
	)
}

export default CategoryInner