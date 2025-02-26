'use client'

import PageLoader from '@/components/PageLoader'
import { removeFromCart } from '@/redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import emptybag from '@/public/images/emptybag.png';
import Image from 'next/image';
import Link from 'next/link';

function ShoppingCart() {

	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const handleRemoveFromCart = (product) => {
		dispatch(removeFromCart(product));
	};

	if (!cart) {
		return <PageLoader />
	}

	return (
		<div className='pt-[120px] tablet:pt-[170px] px-[20px]'>
			<div className='max-w-[1110px] mx-auto card_page'>
			<div className='flex items-center text-base gap-[10px] '>
					<Link href="/">Home /</Link>
					<span className='text-black opacity-50'>Cart</span>
				</div>
				<div className='text-[28px] tablet:text-xl mobile:text-base mt-[20px] uppercase text-black'>
					Shopping Cart
				</div>
				<div className='card_wrapper mt-[40px] mobile:mt-[20px] h-full'>
					{cart?.items.length > 0 ?
						<>
							<div className='grid gap-[40px]  tablet:gap-[20px] tablet:grid-cols-1 grid-cols-2'>
								{cart.items.map((product, index) => ( 
									<div key={index} className="product_block">
										<div className="image_block relative">
											<Image
												src={product.pictures[0]?.path || product.images[0].path}
												unoptimized={true}
												alt="category_Image"
												width={135}
												height={135}
												priority
											/>
										</div>
										<div className="info_block">
											<div className="top_ineer_block">
												<Link href={`product/${product.link}`} className="product_name">{product.name}</Link>
												<div className="product_code">Product code: <span>AL0456</span></div>
											</div>
											<div className="bottom_ineer_block flex items-center w-full">
												<div className="product_price">
													<div className="active_price">{product.price.toLocaleString('en-US')}֏</div>
												</div>
												<button className="remove_btn text-[#B63E2C]" onClick={() => handleRemoveFromCart(product)}>REMOVE</button>
											</div>
										</div>
									</div>
								))}
							</div>
							<Link href='/checkout' className=' mt-[80px]  tablet:mt-[40px] ml-auto site_btn'>Checkout</Link>
						</>
						:
						<div className=' relative flex-col w-full h-full flex items-center justify-center'>
							<Image
								src={emptybag}
								alt="Empty Image"
								priority={true}
							/>
								<Link href='/' className=' mt-[80px] mobile:mt-[30px] site_btn'>Back To Home</Link>
						</div>
					}
				</div>
			</div>

		</div>

	)
}

export default ShoppingCart