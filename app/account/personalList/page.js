// app/account/userInfo.tsx
'use client'; // This makes the component a client component
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Page() {
  const [groups, setGroups] = useState({});

  useEffect(() => {
    const storedGroups = localStorage.getItem('groups');
    if (storedGroups) {
      setGroups(JSON.parse(storedGroups));
    }
  }, []);
  

  return (
    <div>
      <h1>User Info</h1>
      <h2>Product Groups:</h2>
      {Object.keys(groups).map((groupName) => (
        <div key={groupName}>
          <h3>{groupName}</h3>
          <ul>
            {groups[groupName].products.map((productId) => (
              <li key={productId}>{productId}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
