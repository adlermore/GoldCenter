// app/account/userInfo.tsx

'use client'; // This makes the component a client component
import Product from '@/components/product/Product';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import emptybag from '@/public/images/emptybag.png';
import IconHeartFill from '@/public/icons/IconHeartFill';
import IconProductHeart from '@/public/icons/IconProductHeart';
import { removeFromCart } from '@/redux/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/redux/wishlistSlice';
import cardInner1 from '@/public/images/cardInner1.png';
import cardInner2 from '@/public/images/cardInner2.png';
import cardInner3 from '@/public/images/cardInner3.png';
import { useState } from 'react';
import IconChack from '@/public/icons/IconChack';
import IconChecked from '@/public/icons/IconChecked';
import IconMap from '@/public/icons/IconMap';
import IconBox from '@/public/icons/IconBox';
import IconTruck from '@/public/icons/IconTruck';
export default function Page() {

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const wishlist = useSelector(state => state.wishlist.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);


  const handleAddToWishlist = (product, callback) => {
    if (callback) {
      dispatch(removeFromWishlist(product));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };


  const [selectedOption, setSelectedOption] = useState('option1');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className='card_wrapper h-full'>
      {cart?.items.length > 0 ?
        <>
          <div className='grid gap-[30px] grid-cols-2'>
            {cart.items.map((product, index) => (

              <div key={index} className="product_block">
                <div className="image_block relative">
                  <Image
                    src={product.pictures[0]?.path || product.images[0].path}
                    unoptimized={true}
                    alt="category_Image"
                    width={160}
                    height={135}
                    priority
                  />
                  <button onClick={() => handleAddToWishlist(product, wishlist.some(item => item.id === product.id))} className="card_heart z-[999] cursor-pointer flex flex-col items-center">
                    {wishlist.some(item => item.id === product.id) ? <IconHeartFill className='!w-[18px] h-auto' /> : <IconProductHeart className='w-[18px]' />}
                  </button>
                </div>
                <div className="info_block">
                  <div className="top_ineer_block">
                    <div className="product_name">{product.name}</div>
                    <div className="product_code">Product code: <span>AL0456</span></div>
                  </div>
                  <div className="bottom_ineer_block flex items-center w-full">
                    <div className="product_price">
                      <div className="active_price">{product.price}֏</div>
                    </div>
                    <button className="remove_btn" onClick={() => handleRemoveFromCart(product)}>REMOVE</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='flex w-full items-center justify-between mt-[60px] text-2xl py-[17px] border-b-2 border-siteCrem'>
            <span>TOTAL</span>
            <span>֏{totalAmount}</span>
          </div>
          <div className='flex w-full items-center justify-between mt-[30px] text-2xl py-[17px] border-b-2 border-siteCrem'>
            <span>{cart?.items.length} ITEMS:</span>
          </div>
          <div className='mt-20 tex-xl'>DELIVERY</div>
          <div className='flex items-end gap-20 mt-[60px] '>
            <Image
              src={cardInner1}
              alt="Empty Image"
              priority={true}
              width={35}
              height={35}
            />
            <span className='text-2xl'>Do you want a box or paper bag for gift?</span>
          </div>
          <div className='delivery-method'>
            <div className="radio-group">
              <input
                type="radio"
                id="option1"
                name="delivery"
                value="option1"
                checked={selectedOption === 'option1'}
                defaultChecked = {true}
                onChange={handleChange}
                style={{ display: 'none' }} // Hide default radio button
              />
              <label htmlFor="option1" className={`custom-radio ${selectedOption === 'option1' ? 'selected' : ''}`}>
                <Image
                  src={cardInner2} // Adjust the path as needed
                  alt="Option 1"
                  width={226}
                  height={184}
                  priority={true} // Optional: Load the image with priority
                />
                <span className='square'><IconChecked/></span>
              </label>
              <input
                type="radio"
                id="option2"
                name="delivery"
                value="option2"
                checked={selectedOption === 'option2'}
                onChange={handleChange}
                style={{ display: 'none' }} // Hide default radio button
              />
              <label htmlFor="option2" className={`custom-radio ${selectedOption === 'option2' ? 'selected' : ''}`}>
                <Image
                  src={cardInner3} // Adjust the path as needed
                  alt="Option 2"
                  width={277}
                  height={184}
                  priority={true} // Optional: Load the image with priority
                />
                <span className='square'><IconChecked/></span>
              </label>
            </div>
          </div>
          <div className='flex gap-20 items-center mt-[50px]'> <IconMap /> Armenia</div>
          <div className='flex gap-20 items-center mt-[23px]'> <IconBox /> Delivery in Yerevan is carried out within 7 working days.</div>
          <div className='flex gap-20 items-center mt-[23px] max-w-[750px]'> <IconTruck />The cost of shipping is 2500 AMD, including warranty inspection and certificate. Contact us for shipping to other countries.</div>
          <button
          type="submit"
          className='mt-[35px] max-w-fit min-w-[160px] px-[30px] relative [&>svg]:opacity-0 submit_btn h-[40px] w-full bg-siteCrem text-base font-semibold text-black duration-300 hover:opacity-70 ml-auto justify-center flex items-center'>
          Checkout
          </button>
        </>
        :
        <div className=' relative w-full h-full flex items-center justify-center'>
          <Image
            src={emptybag}
            alt="Empty Image"
            priority={true}
          />
        </div>
      }
    </div>
  );
}
