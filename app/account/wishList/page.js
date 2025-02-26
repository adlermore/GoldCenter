'use client';
import Image from 'next/image';
import emptybag from '@/public/images/emptybag.png';
import { useSelector } from 'react-redux';
import Product from '@/components/product/Product';
import { useState } from 'react';

export default function Page() {
  const wishList = useSelector((state) => state.wishlist);

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleCheckboxChange = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  // Handle button click to save selected product IDs
  const handleSaveSelectedProducts = () => {
    console.log('Selected Product IDs:', selectedProducts);
  };

  return (
    <div className='favorite_wrapper h-full'>
      {wishList?.items.length > 0 ?
        <div className='grid gap-[15px] grid-cols-4 laptopHorizontal:grid-cols-3 tablet:grid-cols-2'>
          {wishList.items.map((item, index) => (
            <div key={index}>
              <Product product={item} />
              {/* Checkbox to select product */}
              <div className='mt-2'>
                <label>
                  <input
                    type='checkbox'
                    checked={selectedProducts.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                  Select
                </label>
              </div>
            </div>

          ))}
          <button
            onClick={handleSaveSelectedProducts}
            className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
          >
            Save Selected Products
          </button>
        </div>
        :
        <div className='relative w-full h-full flex items-center justify-center'>
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
