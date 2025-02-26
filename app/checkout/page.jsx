'use client'

import PageLoader from '@/components/PageLoader'
import { removeFromCart } from '@/redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import methodCard from '@/public/images/methodCard.png';
import methodTl from '@/public/images/methodTl.png';
import methodID from '@/public/images/methodID.png';
import Image from 'next/image';
import Link from 'next/link';
import { userScheme } from '@/validation/userScheme';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ReactInputMask from 'react-input-mask';
import { useState } from 'react';

function ShoppingCart() {

	const user = useSelector((state) => state.auth.user);
	const [loading, setLoading] = useState(false);

	//validation init
	const { register: userInfo, handleSubmit: handleSubmitForm, formState: { errors: errorUser } } = useForm({
		resolver: zodResolver(userScheme)
	});
	const dispatch = useDispatch();

	//sumbition Data
	const userInfoSubmit = async (dataForm) => {
		console.log('dataForm', dataForm);
	};

	const cart = useSelector((state) => state.cart);

	return (
		<div className='pt-[120px] tablet:pt-[150px] px-[20px]'>
			<div className='max-w-[1110px] mx-auto card_page'>
				<div className='flex items-center text-base gap-[10px] '>
					<Link href="/">Home /</Link>
					<Link href="/shoppingCart">Cart /</Link>
					<span className='text-black opacity-50'>Pay</span>
				</div>
				<div className='text-[28px] tablet:text-xl mt-[20px] uppercase text-black'>
					Shipping details
				</div>
				<div className='mt-[5px] text-base'>
					In the case of online sales, the inspection and warranty certificate is free.
				</div>
				<div className='mt-[20px] text-xl'>Contact information *</div>
				<form onSubmit={handleSubmitForm(userInfoSubmit)} className="w-full">
					<div className='grid grid-cols-1  max-w-[447px] gap-[10px] userInfoForm'>
						<div className={errorUser?.namefirst ? "form_block has_error" : "form_block"}>
							<div className="userInfo_label text-base font-light mb-[10px]">
								Name
							</div>
							<input
								placeholder="Enter name"
								autoComplete="on"
								defaultValue={user?.firstname || ''}
								className="form-control"
								name="name"
								{...userInfo("namefirst", { required: true, minLength: 5 })}
							/>
							<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
								{errorUser?.namefirst?.message}
							</p>
						</div>
						<div className={errorUser?.email ? "form_block has_error" : "form_block"}  >
							<div className="userInfo_label text-base font-light mb-[10px]">
								Email
							</div>
							<input
								placeholder="Enter your email address"
								autoComplete="on"
								className="form-control"
								defaultValue={user?.email}
								name="email"
								{...userInfo("email", {
									required: true,
									pattern: /^\S+@\S+$/i,
								})}
							/>
							<p className="form_error form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
								{errorUser?.email?.message}
							</p>
						</div>
						<div
							className={errorUser.phone ? "form_block has_error" : "form_block"}
						>
							<div className="userInfo_label text-base font-light mb-[10px]">
								Phone
							</div>
							<ReactInputMask
								{...userInfo("phone", { required: true })}
								placeholder="Enter your password"
								type="tel"
								autoComplete="on"
								className="form-control"
								value={user?.phone}
								mask="(999)-999-9999"

							/>
							<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
								{errorUser?.phone?.message}
							</p>
						</div>
						<div className={errorUser?.address ? "form_block has_error" : "form_block"}>
							<div className="userInfo_label text-base font-light mb-[10px]">
								Address
							</div>
							<input
								placeholder="Enter address"
								autoComplete="on"
								className="form-control"
								name="name"
								{...userInfo("address", { required: true, minLength: 5 })}
							/>
							<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
								{errorUser?.address?.message}
							</p>
						</div>
					</div>

					<div className='checkout_botto tablet:grid-cols-1 my-[40px] grid grid-cols-2 gap-[60px] tablet:gap-[30px] mobile:my-[20px]'>
						<div className='payment_method pt-[40px]'>
							<div className='title text-2xl'>
								Payment method *
							</div>
							<div className='method_btns flex items-center mt-[23px] gap-[10px]'>
								<button>
									<Image
										src={methodCard}
										width={218}
										height={48}
										priority
										alt='Method Img'
									/>
								</button>
								<button>
									<Image
										src={methodTl}
										width={102}
										height={48}
										priority
										alt='Method Img'
									/>
								</button>
								<button>
									<Image
										src={methodID}
										width={102}
										height={48}
										priority
										alt='Method Img'
									/>
								</button>
							</div>
						</div>
						<div className='summery_block'>
							<div className='sub_line'>
								<div className='item'>{cart?.items.length || 0} ITEMS:</div>
								<div className='item'>${cart?.totalAmount.toLocaleString('en-US') || 0}</div>
							</div>
							<div className='sub_line'>
								<div className='item'>DELIVERY:</div>
								<div className='item'>$10</div>
							</div>
							<div className='total'>
								<div className='item'>TOTAL</div>
								<div className='item'>${(cart?.totalAmount+ 10).toLocaleString('en-US') || 0}</div>
							</div>
						</div>
					</div>
					<button
						type="submit"
						className='site_btn ml-auto'
					>
						{loading ? " " : "Pay"}
					</button>
				</form>
			</div>
		</div>
	)
}

export default ShoppingCart