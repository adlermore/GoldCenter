'use client';
import Image from 'next/image';
import emptybag from '@/public/images/emptybag.png';
import { useSelector } from 'react-redux';
import Product from '@/components/product/Product';
import { useState } from 'react';

export default function Page() {
  const wishList = useSelector((state) => state.wishlist);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [groups, setGroups] = useState({}); // Store groups here
  const [groupName, setGroupName] = useState(''); // Input for group name

  const handleCheckboxChange = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  // Handle button click to save selected product IDs into a group
  const handleSaveSelectedProducts = () => {
    if (groupName && selectedProducts.length > 0) {
      const newGroup = { name: groupName, products: selectedProducts };
      setGroups((prevGroups) => ({ ...prevGroups, [groupName]: newGroup }));
      setSelectedProducts([]);
      setGroupName('');
      // Save groups to local storage or Redux state
      localStorage.setItem('groups', JSON.stringify({ ...groups, [groupName]: newGroup }));
    }
  };

  return (
    <div className='favorite_wrapper h-full'>
      {wishList?.items.length > 0 ?
        <div className='grid gap-[15px] grid-cols-4 laptopHorizontal:grid-cols-3 tablet:grid-cols-2'>
          {wishList.items.map((item, index) => (
            <div key={index}>
              <Product product={item} />
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
          <div className='mt-4'>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter Group Name"
            />
            <button
              onClick={handleSaveSelectedProducts}
              className='ml-2 px-4 py-2 bg-blue-500 text-white rounded'
            >
              Save Selected Products
            </button>
          </div>
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
