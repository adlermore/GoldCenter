import Product from '@/components/product/Product'
import IconChecked from '@/public/icons/IconChecked'
import { filterCategory, filterStyle, productListing } from '@/utils/data/productList'
import React from 'react'

function page() {
	return (
		<div className='product_page pb-[50px]'>
			<div className='cover_container !mt-[150px] text-[24px] uppercase !pl-[335px]'>
				Rings
			</div>
			<div className='cover_container flex gap-[25px] !mt-[70px]'>
				<div className='filter_block border border-1 border-[#F8F6F5] p-[25px] max-w-[290px] h-fit w-full'>
					<div className='mb-[30px]' >
						<div className='text-xl uppercase text-[#333333] mb-20'>Category</div>
						{filterCategory.map((filter, index) => (
							<div className="mb-[10px] filter_line">
								<label htmlFor={`filter1${index}`}>
									<input type="checkbox" id={`filter1${index}`} />
									<span className="square_block">
										<span className='opacity-0 duration-300'><IconChecked /></span>
									</span>
									<span className="check_label ">{filter}</span>
								</label>
							</div>
						))}
					</div>
					<div className='mb-[30px]' >
						<div className='text-xl uppercase text-[#333333] mb-20'>Gold Style</div>
						{filterStyle.map((filter, index) => (
							<div className="mb-[10px] filter_line">
								<label htmlFor={`filter1${index}`}>
									<input type="checkbox" id={`filter1${index}`} />
									<span className="square_block">
										<span className='opacity-0 duration-300'><IconChecked /></span>
									</span>
									<span className="check_label ">{filter}</span>
								</label>
							</div>
						))}
					</div>
				</div>
				<div className='grid grid-cols-4 gap-[15px]'>
					{productListing.map((product, index) => (
						<Product key={index} product={product} />
					))}
				</div>
			</div>
		</div>
	)
}

export default page