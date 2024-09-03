import CategoryGrid from '@/components/CategoryGrid'
import MainSlider from '@/components/slider/MainSlider'
import ProductSlider from '@/components/slider/ProductSlider'
import { bestProducts, categoryGrid, categorySliderData } from '@/utils/data/homeData'
import React from 'react'

function page() {
	return (
		<div className="category_page pt-[85px]">
			<MainSlider sliderData={categorySliderData} />
			<div className='py-[100px]  text-center laptopHorizontal:py-[60px] tablet:pt-[30px]'>
				<div className="custom_container">
					<h1 className='text-[32px] uppercase text-black laptopHorizontal:text-[24px] mobile:text-[18px]'>FOR WOMEN</h1>
					<div className='mt-50 max-w-[650px] text-base mx-auto'>
						The platform features a wide selection of jewelry from only registered sellers and manufacturers. Here you can find all the jewelry related services you need.
					</div>
				</div>
			</div>
			<CategoryGrid category={categoryGrid} />
			<ProductSlider sliderContent={bestProducts} />
		</div>
	)
}

export default page