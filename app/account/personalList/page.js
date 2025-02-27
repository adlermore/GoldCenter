'use client'
import { useSelector, useDispatch } from 'react-redux';
import { deleteItemFromGroup, editGroupName } from '@/redux/groupsSlice';
import { addToCart } from '@/redux/cartSlice';
import Image from 'next/image';
import emptybag from '@/public/images/emptybag.png';
import Product from '@/components/product/Product';
import { useState } from 'react';

export default function Page() {
  const groups = useSelector((state) => state.groups);
  const dispatch = useDispatch();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newGroupName, setNewGroupName] = useState('');

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
    setNewGroupName(group.name);
  };

  const handleDeleteItemFromGroup = (groupId, itemId) => {
    dispatch(deleteItemFromGroup({ groupId, itemId }));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleEditGroupName = (groupId) => {
    dispatch(editGroupName({ groupId, newName: newGroupName }));
  };

  return (
    <div>
      <h1>User Info</h1>
      {groups.length > 0 ? (
        <div>
          <h2>Groups:</h2>
          <ul>
            {groups.map((group) => (
              <li key={group.id}>
                <button onClick={() => handleSelectGroup(group)}>{group.name}</button>
              </li>
            ))}
          </ul>
          {selectedGroup && (
            <div>
              <h2>Selected Group: {selectedGroup.name}</h2>
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="New Group Name"
              />
              <button onClick={() => handleEditGroupName(selectedGroup.id)}>Save New Name</button>
              <div className="grid gap-[15px] grid-cols-4 laptopHorizontal:grid-cols-3 tablet:grid-cols-2">
                {selectedGroup.products.map((product, index) => (
                  <div key={index} className="wish_container">
                    <Product product={product} />
                    <div className="mt-2 filter_line">
                      <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                      <button onClick={() => handleDeleteItemFromGroup(selectedGroup.id, product.id)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="relative w-full h-full flex items-center justify-center">
          <Image src={emptybag} alt="Empty Image" priority={true} />
        </div>
      )}
    </div>
  );
}
