'use client'

import IconChecked from '@/public/icons/IconChecked'
import { filterColors, filterFineness, filterOrigin, filterSubCategory, filterType } from '@/utils/data/productList'
import { Suspense, useEffect, useState } from 'react';
import PageLoader from '@/components/PageLoader';
import ProductList from '@/components/product/ProductList';
import { useSearchParams } from 'next/navigation';
import IconClose from '@/public/icons/IconClose';

export default function ProductListing() {
	const searchParams = useSearchParams();

	const [activeFilter, setActiveFilter] = useState(false);

	const initialSubcategory = searchParams.get('subcategory') || '';
	const initialType = searchParams.get('type') || '';

	const [filters, setFilters] = useState({
		subcategory: initialSubcategory,
		type: initialType,
		origin: [],
		fineness: [],
		colors: [],
		stoneLine: []
	});

	useEffect(() => {
		if (initialSubcategory || initialType) {
			setFilters(prevFilters => ({
				...prevFilters,
				subcategory: initialSubcategory,
				type: initialType,
			}));
		}
	}, [initialSubcategory, initialType]);

	const handleFilterChange = (filterType, value) => {
		setFilters(prevFilters => {
			if (filterType === 'origin' || filterType === 'fineness' || filterType === 'colors' || filterType === 'stoneLine') {
				const currentValues = prevFilters[filterType];
				if (currentValues.includes(value)) {
					return { ...prevFilters, [filterType]: currentValues.filter(item => item !== value) };
				} else {
					return { ...prevFilters, [filterType]: [...currentValues, value] };
				}
			} else {
				return { ...prevFilters, [filterType]: value };
			}
		});
	};

	const clearAllFilters = () => {
		setFilters({
			subcategory: '',
			type: '',
			origin: [],
			fineness: [],
			colors: [],
			stoneLine: []
		});
		setActiveFilter(false)
	};

	const handleFilterToggle = () => {
		setActiveFilter(!activeFilter)
	}

	const handleCloseFilter = () =>{
		setActiveFilter(false)
	}

	return (
		<div className='product_page pb-[50px] laptopHorizontal:pb-[30px]'>
			<div className='cover_container !mt-[150px] tablet:!mt-[140px] tablet:text-[18px] laptopHorizontal:!mt-[120px] text-[24px] laptopHorizontal:text-[22px] laptop:!pl-[30px] laptopHorizontal:!pl-[280px] uppercase !pl-[335px]'>
				PRODUCTS
			</div>
			<button className='filter_toggle' onClick={handleFilterToggle}>Filter</button>
			<div className='cover_container laptop:flex-col-reverse relative flex gap-[25px] !mt-[70px] laptopHorizontal:!mt-[40px]'>
				<div className={`filter_block border border-1 border-[#F8F6F5] p-[25px] max-w-[290px] h-fit w-full ${activeFilter ? 'filter_opened' : ''}`}>
					<div className='mb-[30px]' >
						<div className='text-xl  inline_categoryy text-[#333333] mb-20'>Category <span className='icon_closee' onClick={handleCloseFilter}><IconClose /></span></div>
						{filterSubCategory.map((filter, index) => (
							<div key={index} className="mb-[10px] filter_line radio_line">
								<label htmlFor={`filter1${filter}`}>
									<input type="radio" name='filterSubCategory'
										checked={filters.subcategory === filter}
										onChange={() => handleFilterChange('subcategory', filter)}
										id={`filter1${filter}`} />
									<span className="square_block">
										<span className='opacity-0 duration-300'><IconChecked /></span>
									</span>
									<span className="check_label ">{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
								</label>
							</div>
						))}
					</div>
					<div className='mb-[30px]' >
						<div className='text-xl  text-[#333333] mb-20'>Type</div>
						{filterType.map((filter, index) => (
							<div key={index} className="mb-[10px] filter_line radio_line">
								<label htmlFor={`filter2${filter}`}>
									<input type="radio" name='filterSubCategoryType'
										checked={filters.type === filter}
										onChange={() => handleFilterChange('type', filter)}
										id={`filter2${filter}`} />
									<span className="square_block">
										<span className='opacity-0 duration-300'><IconChecked /></span>
									</span>
									<span className="check_label ">{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
								</label>
							</div>
						))}
					</div>
					<div className='mb-[30px]' >
						<div className='text-xl  text-[#333333] mb-20'>Origin</div>
						{filterOrigin.map((filter, index) => (
							<div key={index} className="mb-[10px] filter_line">
								<label htmlFor={`filter1${index}`}>
									<input type="checkbox"
										checked={filters.origin.includes(filter)}
										onChange={() => handleFilterChange('origin', filter)}
										id={`filter1${index}`} />
									<span className="square_block">
										<span className='opacity-0 duration-300'><IconChecked /></span>
									</span>
									<span className="check_label ">{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
								</label>
							</div>
						))}
					</div>
					<div className='mb-[30px]' >
						<div className='text-xl  text-[#333333] mb-20'>Fineness</div>
						{filterFineness.map((filter, index) => (
							<div key={index} className="mb-[10px] filter_line">
								<label htmlFor={`filterFienness${index}`}>
									<input type="checkbox"
										checked={filters.fineness.includes(filter)}
										onChange={() => handleFilterChange('fineness', filter)}
										id={`filterFienness${index}`} />
									<span className="square_block">
										<span className='opacity-0 duration-300'><IconChecked /></span>
									</span>
									<span className="check_label ">{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
								</label>
							</div>
						))}
					</div>
					<div className='mb-[30px]' >
						<div className='text-xl text-[#333333] mb-[25px]'>Color</div>
						<div className='filter_color_line'>
							{filterColors.map((filter, index) => (
								<div key={index} className="mb-[10px] ">
									<label htmlFor={`filterColor${index}`}>
										<input type="checkbox"
											checked={filters.colors.includes(filter)}
											onChange={() => handleFilterChange('colors', filter)}
											id={`filterColor${index}`} />
										<span className={`square_block ${filter}`}>
											<span className=' duration-300'></span>
										</span>
									</label>
								</div>
							))}
						</div>
					</div>
					<div className='mb-[30px]' >
						<div className='text-xl  text-[#333333] mb-20'>Gold Style</div>
						<div className="mb-[15px] filter_stone_line">
							<label htmlFor='filterStone1'>
								<input type="checkbox" id='filterStone1' />
								<span className="square_block">
									<span className='duration-300'>
										<svg height="50" width="30" fill="none" viewBox="0 0 27 46" xmlns="http://www.w3.org/2000/svg">
											<path d="M26.2814 23.0021C26.2814 35.1555 13.6407 45.0043 13.6407 45.0043C13.6407 45.0043 1 35.1526 1 23.0021C1 10.8517 13.6407 1 13.6407 1C13.6407 1 26.2814 10.8517 26.2814 23.0021Z" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M26.2696 23.0019C22.9048 27.787 18.7539 32.0326 13.6407 35.6244C8.47468 32.0502 4.18583 27.8955 1.01172 23.0019C4.37651 17.6304 8.6507 13.5138 13.6407 10.3794C18.7803 13.8158 22.943 18.0614 26.2696 23.0019Z" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M13.6407 1.47217V10.3797L20.3057 7.9872L19.2467 14.7221L24.4127 14.8306L23.7204 19.4398" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M13.6407 1.2168V10.3795L7.07537 8.0221L7.87329 14.6573L3.00653 14.7189L3.42603 19.4395" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M13.6407 1.47217V10.3797L20.3057 7.9872L19.2467 14.7221L24.4127 14.8306L23.7204 19.4398" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M13.6407 1.65674V10.3796L7.07537 8.02223L7.87329 14.6575L3.00653 14.7191L3.42603 19.4397" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M13.6407 44.4534V35.6426L20.3057 38.038L19.2467 31.3031L24.4127 31.1917L23.7204 26.5854" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M13.6407 44.4534V35.6426L7.07537 37.9999L7.87329 31.3647L3.00653 31.306L3.42603 26.5854" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M1.29639 23.0024L5.59406 23.0112" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M5.87261 16.918L5.59393 23.0108V28.5436" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M13.6407 35.642L5.59393 23.0107L13.6407 10.3794" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M1.29639 23.0024L5.59406 23.0112" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M5.87261 16.918L5.59393 23.0108V28.7986" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M13.6407 35.642L5.59393 23.0107L13.6407 10.3794" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M25.9821 23.0049L21.6874 23.0137" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M21.4204 17.147L21.6874 23.014L21.6845 28.5468" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M13.6378 35.642L21.6875 23.0136L13.6437 10.3794" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
										</svg>
									</span>
								</span>
								<span className="check_label ">Marquise</span>
							</label>
						</div>
						<div className="mb-[15px] filter_stone_line">
							<label htmlFor='filterStone2'>
								<input type="checkbox" id='filterStone2' />
								<span className="square_block">
									<span className='duration-300'>
										<svg height="50" width="34" fill="none" viewBox="0 0 30 44" xmlns="http://www.w3.org/2000/svg">
											<path d="M14.8933 43.3447C22.5664 43.3447 28.7866 33.8655 28.7866 22.1724C28.7866 10.4792 22.5664 1 14.8933 1C7.22025 1 1 10.4792 1 22.1724C1 33.8655 7.22025 43.3447 14.8933 43.3447Z" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M28.7843 22.1708L14.8924 8.28613L1.00058 22.1709L14.8924 36.0556L28.7843 22.1708Z" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M25.1022 7.82324H4.68164V36.5251H25.1022V7.82324Z" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M8.34558 3.49561L12.036 7.82332" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M17.7477 7.82332L21.4381 3.49561" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M4.68164 7.82289L9.53963 13.2706L14.8934 1L19.8804 13.2706L25.1022 7.82289" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M4.68164 36.5249L9.53963 31.0742L14.8934 43.3449L19.8804 31.0742L25.1022 36.5249" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M24.3305 24.444C25.5779 19.2427 22.3705 14.0154 17.1666 12.7686C11.9626 11.5218 6.73269 14.7276 5.48525 19.9289C4.23781 25.1302 7.44522 30.3574 12.6492 31.6042C17.8531 32.851 23.083 29.6453 24.3305 24.444Z" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
										</svg>
									</span>
								</span>
								<span className="check_label ">Oval</span>
							</label>
						</div>
						<div className="mb-[15px] filter_stone_line">
							<label htmlFor='filterStone3'>
								<input type="checkbox" id='filterStone3' />
								<span className="square_block">
									<span className='duration-300'>
										<svg height="50" width="36" fill="none" viewBox="0 0 33 41" xmlns="http://www.w3.org/2000/svg">
											<path d="M26.6364 40.7587H7.09007C4.71095 38.3808 3.37911 37.0496 1 34.6717V7.08695C3.37911 4.70905 4.71095 3.3779 7.09007 1H26.6364C29.0155 3.3779 30.3473 4.70905 32.7264 7.08695V34.6717C30.3473 37.0496 29.0155 38.3808 26.6364 40.7587Z" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M24.7677 36.9591H8.95878C7.03437 35.0356 5.95774 33.9596 4.03333 32.0361V9.7232C5.95774 7.79978 7.03437 6.72372 8.95878 4.80029H24.7677L29.6931 9.7232V32.0361C27.7687 33.9596 26.6921 35.0356 24.7677 36.9591Z" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M21.9866 31.2966H11.7426L8.5509 28.1065V13.6486L11.7426 10.4585H21.9866L25.1783 13.6486V28.1065L21.9866 31.2966Z" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M7.09003 1L11.7397 10.4617" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M26.6363 40.7591L21.9866 31.2974L16.8646 40.7591L11.7397 31.2974L7.09003 40.7591" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M21.9866 31.2969L32.7264 34.6717L25.1783 28.1068L32.7264 20.8793L25.1783 13.6518L32.7264 7.08695L21.9866 10.4617L26.6363 1" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
											<path d="M11.7397 31.2969L1 34.6717L8.55097 28.1068L1 20.8793L8.55097 13.6518L1 7.08695L11.7397 10.4617L16.8647 1L21.9867 10.4617" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
										</svg>
									</span>
								</span>
								<span className="check_label ">Rasiant</span>
							</label>
						</div>
					</div>
					<div className='flex w-full btn_line'>
						<button className='clear_btn ' onClick={clearAllFilters}>Clear</button>
					</div>
				</div>
				<div className='w-full'>
					<Suspense fallback={<PageLoader />}>
						<ProductList filters={filters} />
					</Suspense>
				</div>
			</div>
		</div>
	)
}